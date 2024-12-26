import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userSignup } from '../Services/authService';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
const SignUp = () => {

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async(values) => {
    console.log('Form Data:', values);
    try {
      const response = await userSignup(values);
      console.log(response.data.message,'message')
      if(response.status == 201) {
        toast.success('User registered Successfully')
        navigate('/login')
      } else if (response.status === 400 && response.data.message === 'Email already exists') {
        toast.error('Email already exists');
      } 
      else {
        toast.error('Failed to register user')
      }
    } catch (error) {
      toast.error('Failed to register user')
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="relative w-full bg-white rounded-lg shadow-md p-6 space-y-6 sm:max-w-md dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
            className="w-8 h-8 mr-2"
          />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            Flowbite
          </span>
        </div>
        {/* Form Header */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Register Here
        </h1>
        {/* Form with Formik */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Alex"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Your Email
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full px-3 py-2 mt-1 border rounded-lg text-gray-900 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700"
              >
                Sign Up 
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default SignUp;
