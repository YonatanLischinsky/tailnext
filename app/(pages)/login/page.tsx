'use client';

import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { LanguageContext } from '~/context/LanguageContext';
import { getTranslation } from '~/utils/i18n';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    setIsFormValid(email !== '' && password !== '');
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // Handle login logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-slate-800">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">{getTranslation(language, 'login.title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className={`mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'he' ? 'text-right' : ''}`}>
              {getTranslation(language, 'login.emailLabel')}
            </label>
            <input
              type="email"
              id="email"
              className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-white ${
                language === 'he' ? 'text-right' : ''
              }`}
              placeholder={getTranslation(language, 'login.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="password"
              className={`mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300 ${language === 'he' ? 'text-right' : ''}`}
            >
              {getTranslation(language, 'login.passwordLabel')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className={`w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-slate-700 dark:text-white ${
                  language === 'he' ? 'text-right' : ''
                }`}
                placeholder={getTranslation(language, 'login.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={`absolute inset-y-0 flex items-center px-3 text-gray-500 ${language === 'he' ? 'left-0' : 'right-0'}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </div>
          <div className="mb-6 flex items-center justify-center">
            <div className={`flex items-center ${language === 'he' ? 'flex-row-reverse' : ''}`}>
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me" className={`block text-sm text-gray-900 dark:text-gray-300 ${language === 'he' ? 'mr-2' : 'ml-2'}`}>
                {getTranslation(language, 'login.rememberMe')}
              </label>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isFormValid
                ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                : 'cursor-not-allowed bg-gray-400'
            }`}
            disabled={!isFormValid}
          >
            {getTranslation(language, 'login.loginButton')}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {getTranslation(language, 'login.noAccount')}{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            {getTranslation(language, 'login.signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
