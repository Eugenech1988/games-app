import React from 'react';
import axios from 'axios';
import googleIcon from '@/assets/google-icon.svg';
import { useGoogleLogin } from '@react-oauth/google';

interface ILoginButtonProps {
  onAuthUpdate: () => void;
}

const loginUrl: any = process.env.VITE_AUTH_URL;

const LoginButton: React.FC<ILoginButtonProps> = ({onAuthUpdate}) => {
  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const {data} = await axios.get(loginUrl, {
          headers: {Authorization: `Bearer ${tokenResponse.access_token}`}
        });
        localStorage.setItem('loginData', JSON.stringify(data));
        onAuthUpdate();
      } catch (error) {
        throw new Error((error as { message: string }).message);
      }
    },
    onError: () => console.error('Login Failed')
  });
  return (<button
    className={'flex flex-center items-center bg-gray-500 text-gray-200 leading-[40px] px-[12px] rounded-full text-sm cursor-pointer hover:bg-gray-400 hover:text-white transition duration-300'}
    onClick={() => handleLogin()}
  >
    <img className={'w-[20px] h-full mr-[10px]'} src={googleIcon} alt="google"/>
    <span className="tmr-2">
      Sign in with google
    </span>
  </button>);
};

export default LoginButton;
