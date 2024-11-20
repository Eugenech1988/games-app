import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import StoresList from '@/components/StoresList';

// Mock the useQuery hook
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('StoresList', () => {
  it('renders loading state when data is being fetched', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
      error: null,
    });

    render(<StoresList />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    const error = new Error('Network Error');
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: true,
      data: null,
      error,
    });

    render(<StoresList />);
    expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
  });

  it('renders store list when data is successfully fetched', () => {
    const mockData = {
      data: {
        results: [
          {
            id: 1,
            name: 'Steam',
            domain: 'store.steampowered.com',
            image_background: 'https://via.placeholder.com/200',
          },
        ],
      },
    };

    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockData,
      error: null,
    });

    render(<StoresList />);

    const storeHeading = screen.getByRole('heading', { name: /Steam/i });
    expect(storeHeading).toBeInTheDocument();

    const storeParagraph = screen.getByText(/store.steampowered.com/i);
    expect(storeParagraph).toBeInTheDocument();
  });

  it('opens the store domain when a store is clicked', () => {
    const mockData = {
      data: {
        results: [
          {
            id: 1,
            name: 'Steam',
            domain: 'store.steampowered.com',
            image_background: 'https://via.placeholder.com/200',
          },
        ],
      },
    };

    global.open = jest.fn(); // Mock `window.open`

    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockData,
      error: null,
    });

    render(<StoresList />);

    // Narrow down the query to the list item containing the text "Steam"
    const storeItem = screen.getByRole('listitem', { name: /Steam/i });

    fireEvent.click(storeItem);

    expect(global.open).toHaveBeenCalledWith('http://store.steampowered.com/');
  });
});
