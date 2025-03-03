'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { User } from '@/lib/types/auth';
import { getAllUsers, deactivateUser } from '@/lib/firebase/firebaseUtils';
import { UsersList } from '@/components/admin/UsersList';
import { AdminStats } from '@/components/admin/AdminStats';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAdmin, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/');
      return;
    }

    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, router]);

  const handleDeactivateUser = async (email: string) => {
    try {
      await deactivateUser(email);
      setUsers(users.filter(user => user.email !== email));
    } catch (err) {
      setError('Failed to deactivate user');
      console.error('Error deactivating user:', err);
    }
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="text-sm text-gray-500">
            Logged in as <span className="font-medium text-[#a47b67]">{user?.email}</span>
          </div>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <AdminStats users={users} />
        </div>

        <div className="mt-8">
          <UsersList 
            users={users} 
            isLoading={isLoading} 
            onDeactivate={handleDeactivateUser} 
          />
        </div>
      </div>
    </div>
  );
} 