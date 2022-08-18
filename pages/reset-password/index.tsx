import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import classes from './index.module.css';
import { Input } from '../../components/Input';
import { useRouter } from 'next/router';
import { useAuth } from '../../components/Auth';

type FormData = {
  password: string
  token: string
}

const ResetPassword: React.FC = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const token = typeof router.query.token === 'string' ? router.query.token : undefined;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/reset-password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const json = await response.json();

      // Automatically log the user in after they successfully reset password
      await login({ email: json.user.email, password: data.password })

      // Redirect them to /account with success message in URL
      router.push('/account?success=Password reset successfully.');
    } else {
      setError('There was a problem while resetting your password. Please try again later.');
    }
  }, [router]);

  // when NextJS populates token within router,
  // reset form with new token value
  useEffect(() => {
    reset({ token })
  }, [reset, token]);

  return (
    <React.Fragment>
      <h1>Reset Password</h1>
      <p>Please enter a new password below.</p>
      {error && (
        <div className={classes.error}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="password" type="password" label="New Password" required register={register} error={errors.password} />
        <input type="hidden" {...register('token')} />
        <button type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  )
}

export default ResetPassword;