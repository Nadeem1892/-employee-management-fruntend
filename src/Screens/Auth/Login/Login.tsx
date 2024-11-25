import React, { useState } from 'react';

import { BiSolidHide, BiSolidShow } from "react-icons/bi";

type LoginProps = {
  formikProps: {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
      email: string;
      password: string;
    };
    errors: {
      email?: string;
      password?: string;
      api?: string;
    };
    touched: {
      email?: boolean; // Allowing for undefined
      password?: boolean; // Allowing for undefined
    };
    setFieldValue: (field: string, value: any) => void;
    isSubmitting: boolean; // If you want to handle submitting state
  };
};
const Login: React.FC<LoginProps> = ({ formikProps }) => {
  
  const { values, setFieldValue, errors, isSubmitting, touched} = formikProps;

  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setFieldValue("email", e.target?.value)}
              value={values.email}
              className={`mt-1 block w-full p-3 outline-none border rounded-md transition-all duration-300 
                ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}
                focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}

              placeholder="you@example.com"
            />
            {touched.email && errors.email ? (
              <div className="absolute text-sm text-red-600">
                {errors.email}
              </div>
            ) : null}

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                onChange={(e) => setFieldValue("password", e.target.value)}
                value={values.password}

                className={`mt-1 block w-full p-3 outline-none border rounded-md transition-all duration-300 
                  ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}
                  focus:ring-2 focus:ring-sky-500 focus:border-sky-500`}
  
                placeholder="********"
                
              />
               {touched.password && errors.password ? (
              <div className="absolute text-sm text-red-600">
                {errors.password}
              </div>
            ) : null}

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 transform -translate-y-1/2 right-2 top-1/2"
              >
                {showPassword ? <BiSolidHide className='text-[20px]'/> : <BiSolidShow className='text-[20px]'/>}
              </button>
            </div>
          </div>
          
          <div>
            

            <button
              type="submit"
              disabled={isSubmitting}
              className={`relative flex items-center w-full justify-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting && (
                <span className="absolute left-2 animate-spin">
                  <svg
                    className="w-5 h-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" />
                    <path className="opacity-75" d="M4 12h16" />
                  </svg>
                </span>
              )}
              {isSubmitting ? 'Login...' : "Login"}
            </button>
          </div>
        </div>
        <p className="text-sm text-center text-gray-600">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
