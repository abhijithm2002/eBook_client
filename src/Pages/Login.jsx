import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../Services/authService';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../ReduxStore/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values) => {
    try {
      const response = await userLogin(values);
      console.log('response from login', response)
      if (response.status === 200) {
        toast.success('Logged in successfully');
        const {data} = response;
        dispatch(setCredentials({user: data.user, accessToken: data.accessToken}))
        navigate('/')
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Failed to log in');
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow-md p-6 space-y-6 sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            className="w-8 h-8 mr-2"
          />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">Flowbite</span>
        </div>
        {/* Form Header */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Sign in to your account
        </h1>

        {/* Form with Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign in
              </button>

              {/* Sign Up Link */}
              <p className="text-sm text-gray-500 text-center dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link to={'/register'} className="text-blue-500">
                  Sign up
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Login;
