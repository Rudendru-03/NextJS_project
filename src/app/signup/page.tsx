'use client'
import React, { useState, ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import Link from 'next/link';
import { signUp } from '../../utils/api';

type Props = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const Signup = (props: Props) => {
  const [form, setForm] = useState({
    name: props.name,
    email: props.email,
    password: props.password,
    phoneNumber: props.phoneNumber,
    gender: '', // Add gender
    date: '', // Add date
    agreeTerms: false, // Add agreeTerms
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    date: '',
    agreeTerms: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: type === 'checkbox' ? checked : value
    }));

    // Validate inputs on change
    validateField(id, type === 'checkbox' ? checked : value);
  };

  const validateField = (id: string, value: string | boolean) => {
    let error = '';

    switch (id) {
      case 'name':
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(value as string) || (value as string).trim() === '') {
          error = 'Name must contain only alphabetic characters and spaces.';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string)) {
          error = 'Email must be a valid email address.';
        }
        break;
      case 'password':
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value as string)) {
          error = 'Password must be at least 8 characters long, include letters, numbers, and special characters.';
        }
        break;
      case 'phoneNumber':
        const phoneRegex = /^\d{0,10}$/;
        if (!phoneRegex.test(value as string)) {
          error = 'Phone number must be numeric and up to 10 digits.';
        }
        break;
      case 'date':
        if (!value) {
          error = 'Date is required.';
        }
        break;
      case 'agreeTerms':
        if (!value) {
          error = 'You must agree to the terms and conditions.';
        }
        break;
      default:
        break;
    }

    setErrors(prevErrors => ({ ...prevErrors, [id]: error }));
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    console.log(form);
    setError(null);
    setSuccess(null);
    // Check for errors before submitting
    if (Object.values(errors).every(error => error === '') && Object.values(form).every(field => field !== '' && (typeof field !== 'boolean' || field))) {
      try {
        const response = await signUp(form);
        setSuccess(response.message);
      } catch (err) {
        setError(err.message);
      }
      console.log('Form submitted', form);
    } else {
      console.log('Form contains errors');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mt-4 w-full">
        <h1 className='font-bold text-2xl text-[#D5D5D5] ml-4'>SignUp</h1>
        <div className="flex items-center space-x-2 mb-4">
          <p className='font-semibold text-base text-[#D5D5D5]'>Already have an account?</p>
          <Link href="/signin">
            <div className="text-[#8F3A7E] text-center py-1 px-1 ml-1 rounded-full transition duration-200 cursor-pointer">
              Sign In
            </div>
          </Link>
        </div>
      </div>
      <div className='min-h-screen w-full flex flex-col items-start justify-start p-4 bg-[#252525] rounded-xl'>
        <form onSubmit={handleSignUp} className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='my-4'>
              <label htmlFor="name" className='block text-left text-[#D5D5D5]'>Full Name:</label>
              <input
                className='w-full p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="text"
                placeholder='Enter name'
                id='name'
                maxLength={50}
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
            </div>
            <div className='my-4'>
              <label htmlFor="phoneNumber" className='block text-left text-[#D5D5D5]'>Phone Number:</label>
              <input
                className='w-full p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="text"
                placeholder='Your phone number'
                id='phoneNumber'
                maxLength={10}
                value={form.phoneNumber}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              {errors.phoneNumber && <p className='text-red-500 text-sm'>{errors.phoneNumber}</p>}
            </div>
            <div className='my-4'>
              <label htmlFor="email" className='block text-left text-[#D5D5D5]'>Email:</label>
              <input
                className='w-full p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="email"
                placeholder='Your email address'
                id='email'
                maxLength={50}
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
            </div>
            <div className='my-4'>
              <label htmlFor="password" className='block text-left text-[#D5D5D5]'>Password:</label>
              <input
                className='w-full p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="password"
                placeholder='Password'
                id='password'
                maxLength={50}
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
            </div>
            <div className='my-4'>
              <label htmlFor="date" className='block text-left text-[#D5D5D5]'>Date:</label>
              <input
                className='w-full p-2 rounded-md text-[#B0B0B0] bg-transparent border-2 border-[#5F5F5F]'
                type="date"
                id='date'
                value={form.date}
                onChange={handleChange}
              />
              {errors.date && <p className='text-red-500 text-sm'>{errors.date}</p>}
            </div>
            <div className='my-4'>
              <label className='block text-left mb-2 text-[#D5D5D5]'>Gender:</label>
              <div className='flex flex-wrap justify-between'>
                <label className='flex items-center space-x-2 text-[#D5D5D5]'>
                  <input
                    type="radio"
                    name="gender"
                    id='male'
                    value='Male'
                    checked={form.gender === 'Male'}
                    onChange={(e) => setForm(prevForm => ({ ...prevForm, gender: e.target.value }))}
                    className='mr-2'
                  />
                  <span>Male</span>
                </label>
                <label className='flex items-center space-x-2 text-[#D5D5D5]'>
                  <input
                    type="radio"
                    name="gender"
                    id='female'
                    value='Female'
                    checked={form.gender === 'Female'}
                    onChange={(e) => setForm(prevForm => ({ ...prevForm, gender: e.target.value }))}
                    className='mr-2'
                  />
                  <span>Female</span>
                </label>
                <label className='flex items-center space-x-2 text-[#D5D5D5]'>
                  <input
                    type="radio"
                    name="gender"
                    id='other'
                    value='Other'
                    checked={form.gender === 'Other'}
                    onChange={(e) => setForm(prevForm => ({ ...prevForm, gender: e.target.value }))}
                    className='mr-2'
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && <p className='text-red-500 text-sm'>{errors.gender}</p>}
            </div>
            <div className='my-4 col-span-2 md:col-span-1'>
              <label className='flex items-center space-x-2 text-[#D5D5D5]'>
                <input
                  type="checkbox"
                  id='agreeTerms'
                  checked={form.agreeTerms}
                  onChange={handleChange}
                  className='mr-2'
                />
                <span>I agree to the terms and conditions</span>
              </label>
              {errors.agreeTerms && <p className='text-red-500 text-sm'>{errors.agreeTerms}</p>}
            </div>
          </div>
          <div className='text-right flex justify-end'>
            <button
              className='bg-[#8F3A7E] text-[#D5D5D5] p-2 rounded-full px-6'
              type='submit'
            >
              SignUp Here!
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
