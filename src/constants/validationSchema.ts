import * as yup from 'yup';
const allowedEmailDomains = [
  'gmail.com',
  'hotmail.com',
  'softup.co',
  'icloud.com',
  'outlook.com',
  'mail.com',
  'proton.me',
  'yahoo.com',
];

export const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address!')
    .test('allowed-domains', 'Email domain not allowed', (value) =>
      value ? allowedEmailDomains.includes(value.split('@')[1]) : true,
    )
    .required('Email is required!'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required('First name is required!'),
  lastName: yup.string().required('Last name is required!'),
  gender: yup.string().required('Gender is required!'),
  email: yup
    .string()
    .email('Invalid email address!')
    .test('allowed-domains', 'Email domain not allowed', (value) =>
      value ? allowedEmailDomains.includes(value.split('@')[1]) : true,
    )
    .required('Email is required!'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Please retype your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const emailVerificationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address!')
    .test('allowed-domains', 'Email domain not allowed', (value) =>
      value ? allowedEmailDomains.includes(value.split('@')[1]) : true,
    )
    .required('Email is required!'),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup
    .string()
    .required('Please retype your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

export const createSourceSchema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  description: yup.string().required('Description is required!'),
  frequency: yup.number().min(1).max(10),
});

export const createSentenceSchema = yup.object().shape({
  sentence: yup.string().required('Sentence is required!'),
  sourceId: yup.string().required('Source is required!'),
  frequency: yup.number().min(1).max(10),
});
