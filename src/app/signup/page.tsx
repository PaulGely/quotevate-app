'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { SignUpData } from '@/lib/types/auth';
import Link from 'next/link';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { FormInput } from '@/components/auth/FormInput';
import { ErrorMessage } from '@/components/auth/ErrorMessage';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const initialFormData: SignUpData & { confirmPassword: string } = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

export default function SignUp() {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      setError(t('signup.error.passwordMismatch'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(formData);
      if (success) {
        router.push('/');
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError(t('signup.error.emailExists'));
      } else {
        setError(t('signup.error.general'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a47b67]/10 via-white to-[#a47b67]/10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          href="/" 
          className="flex justify-center text-3xl font-bold text-gray-900 hover:text-[#a47b67] transition-colors"
        >
          Quote<span className="text-[#a47b67]">vate</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {t('signup.welcome')}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {t('signup.description')}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                label={t('signup.firstName')}
                placeholder={t('signup.firstNamePlaceholder')}
              />

              <FormInput
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                label={t('signup.lastName')}
                placeholder={t('signup.lastNamePlaceholder')}
              />
            </div>

            <FormInput
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              label={t('signup.email')}
              placeholder={t('signup.emailPlaceholder')}
            />

            <PasswordInput
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              label={t('signup.password')}
              placeholder={t('signup.passwordPlaceholder')}
            />

            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              label={t('signup.confirmPassword')}
              placeholder={t('signup.confirmPasswordPlaceholder')}
            />

            {error && <ErrorMessage message={error} />}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-[#a47b67] hover:bg-[#8f6a58] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a47b67] transition-colors ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading && <LoadingSpinner />}
              {isLoading ? t('signup.signingUp') : t('signup.signUp')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 