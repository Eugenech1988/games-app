'use client';
import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setLogin, unLogin } from '@/lib/slices/loginSlice';

const loginUrl: any = process.env.NEXT_PUBLIC_AUTH_URL;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const login = useAppSelector(state => state.login.id);

  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: { access_token: any; }) => {
      try {
        const {data} = await axios.get(loginUrl, {
          headers: {Authorization: `Bearer ${tokenResponse.access_token}`}
        });
        dispatch(setLogin(data));
      } catch (error) {
        throw new Error((error as { message: string }).message);
      }
    },
    onError: () => console.error('Login Failed')
  });

  const handleUnLogin = () => {
    dispatch(unLogin());
  };

  return (
    <div
      className={`login-container ${(login === '') ? 'absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]' : ''}`}>
      {(login === '') &&
        <h2 className="text-gray-500 font-light text-4xl text-center md:mb-3">Sign in</h2>
      }
      <button
        className={'flex mb-3 flex-center mx-auto items-center bg-gray-700 text-gray-200 leading-[40px] px-[12px] rounded-full text-sm cursor-pointer hover:bg-gray-500 hover:text-white transition duration-300'}
        onClick={(login === '') ? () => handleLogin() : handleUnLogin}
      >
        <img className="w-[20px] h-full mr-[10px]" src="/google-icon.svg" alt="google"/>
        <span className="h-10 block">
      {(login === '') ?
        'Sign in with google'
        : 'Log Out'
      }
    </span>
      </button>
    </div>
  );
};

export default Login;
