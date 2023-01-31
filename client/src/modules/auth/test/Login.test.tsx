import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Login from '../components/login/Login';
import { AuthProvider } from '@contexts/auth/AuthProvider';
import { SocketProvider } from '@contexts/socket/SocketProvider';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import authService from '../services/auth.service';
import { act } from 'react-dom/test-utils';

jest.mock('../services/auth.service', () => {
  return {
    authenticate: jest.fn().mockResolvedValue({
      success: true, response: {
        username: 'manager01',
        email: 'manager01'
      }
    }),
  };
});

const Contexts = () => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <SocketProvider>
          <Routes>
          <Route path="/" element={<Login/>} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Login component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should authenticate user', async () => {
    const { getByLabelText, getByText } = render(<Contexts />);

    const emailOrUsername = getByLabelText('emailOrUsername');
    const password = getByLabelText('password');
    const loginButton = getByText('btns.login');

    act(() => {
      fireEvent.change(emailOrUsername, { target: { value: 'manager01' } });
      fireEvent.change(password, { target: { value: 'manager01' } });
    });

    await act(async () => {
      fireEvent.click(loginButton);
      await waitFor(() => expect(authService.authenticate).toHaveBeenCalledWith({
        username: 'manager01',
        password: 'manager01'
      }));
    });
  });
});