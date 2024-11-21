import React from 'react';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import CreatorsList from '@/components/CreatorsList';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}));

describe('CreatorsList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state while fetching data', async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
      error: null
    });
    render(<CreatorsList/>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders list of creators when API call is successful', async () => {
    const mockCreators = {
      data: {
        results: [
          {id: 1, name: 'John Doe', image: '/john-doe.jpg', games_count: 5},
          {id: 2, name: 'Jane Smith', image: '/jane-smith.jpg', games_count: 10}
        ]
      }
    };

    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockCreators,
      error: null
    });

    render(<CreatorsList/>);

    // await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    // });

    expect(screen.getByText('Games count: 5')).toBeInTheDocument();
    expect(screen.getByText('Games count: 10')).toBeInTheDocument();
  });

  it('renders error message when API call fails', async () => {
    const error = new Error('API Error');
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: true,
      data: null,
      error
    });

    render(<CreatorsList/>);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Error: API Error');
  });
});
