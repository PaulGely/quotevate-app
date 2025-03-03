'use client';

import { User } from '@/lib/types/auth';

interface AdminStatsProps {
  users: User[];
}

export function AdminStats({ users }: AdminStatsProps) {
  const stats = [
    {
      name: 'Faster Quote Generation',
      value: '85%',
      description: 'Improvement in quote generation speed'
    },
    {
      name: 'Accuracy Rate',
      value: '99.9%',
      description: 'Quote accuracy compared to manual process'
    },
    {
      name: 'Active Users',
      value: users.filter(user => user.isActive).length,
      description: 'Currently active platform users'
    },
    {
      name: 'Total Quotes',
      value: '1,234',
      description: 'Quotes generated this month'
    }
  ];

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900">Platform Performance</h2>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 rounded-lg shadow overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3 w-12 h-12 flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <p className="font-medium text-gray-500">{stat.description}</p>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
} 