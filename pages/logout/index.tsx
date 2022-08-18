import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "../../components/Auth";

const Logout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <React.Fragment>
      <h1>Logged out successfully</h1>
      <Link
        href="/login"
      >
        <a>
          Login
        </a>
      </Link>
    </React.Fragment>
  )
}

export default Logout;