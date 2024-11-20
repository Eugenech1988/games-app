import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Payment from '@/components/Payment';
import { addPayment } from '@/lib/slices/loginSlice';

jest.mock('@/lib/hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockUseAppSelector = jest.requireMock('@/lib/hooks').useAppSelector;
const mockUseAppDispatch = jest.requireMock('@/lib/hooks').useAppDispatch;

describe('Payment Component', () => {
  const initialState = { login: { payment: 0 } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);

  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector: any) => selector(store.getState()));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial payment', () => {
    render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );

    expect(screen.getByText(/Set your payment/i)).toBeInTheDocument();
    expect(screen.getByText(/Current amount: 0/i)).toBeInTheDocument();
  });

  it('increments payment by 10 when button is clicked', () => {
    render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /purchase 10 diamonds/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(addPayment(10));
  });

  it('shows updated payment amount from the store', () => {
    mockUseAppSelector.mockImplementation((selector: any) =>
      selector({ login: { payment: 20 } })
    );

    render(
      <Provider store={store}>
        <Payment />
      </Provider>
    );

    expect(screen.getByText(/Current amount: 20/i)).toBeInTheDocument();
  });
});
