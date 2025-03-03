import { auth, db, storage } from "./firebase";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile as updateFirebaseProfile,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { User, SignUpData, UserRole } from '@/lib/types/auth';
import bcrypt from 'bcryptjs';

// Auth functions
export const logoutUser = () => signOut(auth);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

// Firestore functions
export const addDocument = (collectionName: string, data: any) =>
  addDoc(collection(db, collectionName), data);

export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateDocument = (collectionName: string, id: string, data: any) =>
  updateDoc(doc(db, collectionName, id), data);

export const deleteDocument = (collectionName: string, id: string) =>
  deleteDoc(doc(db, collectionName, id));

// Storage functions
export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

const USERS_COLLECTION = 'users';
const SALT_ROUNDS = 10;

export async function createUser(data: SignUpData): Promise<User> {
  try {
    // Check if user exists
    const userRef = doc(db, USERS_COLLECTION, data.email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      throw new Error('User already exists');
    }

    // Create Firebase Auth user
    const authUser = await createUserWithEmailAndPassword(auth, data.email, data.password);

    // Hash password for additional security
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const now = new Date().toISOString();
    const userData: User = {
      username: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: 'user',
      createdAt: now,
      lastLoginAt: now,
      isActive: true
    };

    // Store additional user data in Firestore
    await setDoc(userRef, {
      ...userData,
      hashedPassword,
      uid: authUser.user.uid
    });

    return userData;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    // First, get the user from Firestore to check if they're active
    const userDoc = await getUserByEmail(email);
    if (!userDoc || !userDoc.isActive) {
      throw new Error('User not found or inactive');
    }

    // Sign in with Firebase Auth
    await signInWithEmailAndPassword(auth, email, password);

    // Update last login timestamp
    const userRef = doc(db, USERS_COLLECTION, email);
    await updateDoc(userRef, {
      lastLoginAt: new Date().toISOString()
    });

    return userDoc;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function updateUserProfile(email: string, data: Partial<User>): Promise<boolean> {
  try {
    const userRef = doc(db, USERS_COLLECTION, email);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString()
    });

    // If updating profile image, also update in Firebase Auth
    if (data.profileImageUrl && auth.currentUser) {
      await updateFirebaseProfile(auth.currentUser, {
        photoURL: data.profileImageUrl
      });
    }

    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where('username', '==', username), where('isActive', '==', true));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const userData = querySnapshot.docs[0].data() as User;
  return userData;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const userRef = doc(db, USERS_COLLECTION, email);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return null;
  }

  const userData = userDoc.data() as User;
  return userData.isActive ? userData : null;
}

export async function deactivateUser(email: string): Promise<boolean> {
  try {
    const userRef = doc(db, USERS_COLLECTION, email);
    await updateDoc(userRef, {
      isActive: false,
      deactivatedAt: new Date().toISOString()
    });
    return true;
  } catch (error) {
    console.error('Error deactivating user:', error);
    return false;
  }
}

export async function getAllUsers(): Promise<User[]> {
  const usersRef = collection(db, USERS_COLLECTION);
  const querySnapshot = await getDocs(usersRef);
  return querySnapshot.docs
    .map(doc => doc.data() as User)
    .filter(user => user.isActive);
}

// Profile image upload
export async function uploadProfileImage(file: File, email: string): Promise<string> {
  const path = `profile-images/${email}/${file.name}`;
  const imageUrl = await uploadFile(file, path);
  
  // Update user profile with new image URL
  await updateUserProfile(email, { profileImageUrl: imageUrl });
  
  return imageUrl;
}
