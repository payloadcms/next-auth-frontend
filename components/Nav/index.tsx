import Link from 'next/link';
import React from 'react';
import { useAuth } from '../Auth';

export const Nav: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav>
      {user && (
        <Link href="/account">
          <a>
            Account
          </a>
        </Link>
      )}
      {!user && (
        <Link href="/login">
          <a>
            Login
          </a>
        </Link>
      )}
    </nav>
  )
}