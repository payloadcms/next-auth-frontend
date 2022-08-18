import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../components/Auth';
import classes from './index.module.css';
import { Input } from '../../components/Input';
import { useRouter } from 'next/router';

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
};

const Account: React.FC = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = useCallback(async (data: FormData) => {
    if (user) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/${user.id}`, {
        // Make sure to include cookies with fetch
        credentials: 'include',
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const json = await response.json();

        // Update the user in auth state with new values
        setUser(json.doc);

        // Set success message for user
        setSuccess('Successfully updated account.');

        // Clear any existing errors
        setError('')
      } else {
        setError('There was a problem updating your account.');
      }
    }
  }, [user]);

  useEffect(() => {
    if (user === null) {
      router.push(`/login?unauthorized=account`);
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    }
  }, [user, router]);

  return (
    <React.Fragment>
      <h1>Account</h1>
      {error && <div className={classes.error}>{error}</div>}
      {success && <div className={classes.success}>{success}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <Input name="email" label="Email Address" required register={register} error={errors.email} />
        <Input name="firstName" label="First Name" required register={register} error={errors.firstName} />
        <Input name="lastName" label="Last Name" required register={register} error={errors.lastName} />
        <button type="submit">Update account</button>
      </form>
      <Link href="/logout">
        <a>Log out</a>
      </Link>
    </React.Fragment>
  );
};

export default Account;
