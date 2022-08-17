import React, { Fragment } from 'react';
import Input from '../fields/Input';
import Password from '../fields/Password';
import ConfirmPassword from '../fields/ConfirmPassword';
import validateEmail from '../validateEmail';
import Form from '../Form';

const CreateAccountForm: React.FC = () => (
  <Form>
    <Input
      label="First Name"
      path="firstName"
      required
    />
    <Input
      label="Last Name"
      path="lastName"
      required
    />
    <Input
      label="Email Address"
      path="email"
      validate={validateEmail}
      required
    />
    <Password
      label="Password"
      path="password"
      required
    />
    <ConfirmPassword
      label="Confirm Password"
    />
  </Form>
);

export default CreateAccountForm;
