'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { HelpCircle, LogOut } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Don't show navbar on auth pages
  if (pathname?.includes('/login') || pathname?.includes('/register')) {
    return null;
  }

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/internships', label: 'Internships' },
    { href: '/recommendations', label: 'Recommendations' },
    { href: '/applications', label: 'Applications' },
    { href: '/ai-assistant', label: 'AI Assistant' },
    { href: '/guidance-hub', label: 'Guidance' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-lg text-blue-600">
            InternHub
          </Link>
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/guidance-hub">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-blue-600"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
