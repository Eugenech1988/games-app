import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '@/components/Login';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

jest.mock('@react-oauth/google', () => ({
  useGoogleLogin: jest.fn(),
}));

describe('Login Component', () => {
  const mockStore = configureStore();
  const initialState = { login: { id: '' } };
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);

    (axios.get as jest.Mock).mockImplementation((url) => {
      if (url === 'https://mock-auth-url.com') {
        return Promise.resolve({
          data: { id: 'mock-user-id', name: 'Mock User' },
        });
      }
      if (url === 'https://www.googleapis.com/oauth2/v1/userinfo') {
        return Promise.resolve({
          data: { id: 'mock-user-id', name: 'Mock User' },
        });
      }
      throw new Error('Unexpected URL');
    });

    (useGoogleLogin as jest.Mock).mockImplementation(({ onSuccess }) => {
      return jest.fn(() => onSuccess({ access_token: 'mock-token' }));
    });
  });

  it('calls Google login on button click when logged out', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    fireEvent.click(getByText('Sign in with google'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
          Authorization: 'Bearer mock-token',
        },
      });
    });
  });
});
