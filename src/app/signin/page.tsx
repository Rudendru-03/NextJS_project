'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

type Props = {
  email: string;
  password: string;
};

const SignIn = (props: Props) => {
  const [form, setForm] = useState({
    email: props.email,
    password: props.password,
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: value
    }));

    // Validate inputs on change
    validateField(id, value);
  };

  const validateField = (id: string, value: string) => {
    let error = '';

    switch (id) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = 'Email must be a valid email address.';
        }
        break;
      case 'password':
        if (value.length < 8) {
          error = 'Password must be at least 8 characters long.';
        }
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [id]: error }));
  };

  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    // Check for errors before submitting
    if (Object.values(errors).every(error => error === '') && Object.values(form).every(field => field !== '')) {
      console.log('Form submitted', form);
    } else {
      console.log('Form contains errors');
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-4 mb-4 w-full">
        <h1 className='font-bold text-2xl text-[#D5D5D5] ml-4'>SignIn</h1>
        <div className="flex justify-between items-center mb-4">
          <p className='font-semibold text-base text-[#D5D5D5]'>Not have an account?</p>
          <Link href="/signup">
            <div className="text-[#8F3A7E] text-center py-1 px-2 rounded-full transition duration-200 cursor-pointer">
              Sign Up
            </div>
          </Link>
        </div>
      </div>
      <div className='min-h-screen w-full flex flex-col items-start justify-start p-4 bg-[#252525] rounded-xl'>
        <form onSubmit={handleSignIn} className='mx-8 space-x-4'>
          <div className='flex justify-between space-x-4'>
            <div className='my-2 w-1/2'>
              <label htmlFor="email" className='block text-left text-[#D5D5D5]'>Email:</label>
              <input
                className=' p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="email"
                placeholder='Your email address'
                id='email'
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>
            <div className='my-2 w-1/2'>
              <label htmlFor="password" className='block text-left text-[#D5D5D5]'>Password:</label>
              <input
                className='p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="password"
                placeholder='Your password'
                id='password'
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
            </div>
          </div>
          <div className='flex justify-end mt-4'>
            <button
              className='bg-[#8F3A7E] text-[#D5D5D5] p-2 rounded-full px-6'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
