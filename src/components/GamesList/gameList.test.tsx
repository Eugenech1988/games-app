import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GamesList from '@/components/GamesList';
import { useQuery } from '@tanstack/react-query';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn()
}));

jest.mock('@/components/GameModal', () => ({
  __esModule: true,
  default: jest.fn(({onClose, children}) => (
    <div data-testid="game-modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  ))
}));

describe('GamesList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isPending: true,
      isError: false,
      data: null,
      error: null
    });
    render(<GamesList/>);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('renders error message when API call fails', async () => {
    const error = (new Error('API Error'));
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: true,
      data: null,
      error
    });

    render(<GamesList/>);

    expect(screen.getByText(/error: API Error/i)).toBeInTheDocument();
  });

  it('renders games list on successful API call', async () => {
    const mockGames = {
      data: {
        results: [
          {
            id: 1,
            name: 'Game 1',
            released: '2024-01-01',
            background_image: 'image1.jpg',
            platforms: [{platform: {name: 'PC'}}],
            genres: [{name: 'Action'}],
            tags: [{name: 'Tag1'}],
            stores: [{store: {name: 'Steam'}}]
          },
          {
            id: 2,
            name: 'Game 2',
            released: '2023-12-15',
            background_image: 'image2.jpg',
            platforms: [{platform: {name: 'Xbox', id: 1}}],
            genres: [{name: 'Adventure', id: 1}],
            tags: [{name: 'Tag2', id: 1}],
            stores: [{store: {name: 'Epic Games', id: 1, domain: 'epicgames.com'}}]
          }
        ]
      }
    };
    (useQuery as jest.Mock).mockReturnValueOnce({
      isPending: false,
      isError: false,
      data: mockGames,
      error: null
    });

    render(<GamesList/>);

    expect(screen.getByText((content) => content.includes('Game 1'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Game 2'))).toBeInTheDocument();
  });


  it('opens and closes modal on game click', async () => {
    // Mock API success
    const mockGames = {
      data: {
        results: [
          {
            id: 1,
            name: 'Game 1',
            released: '2024-01-01',
            background_image: 'image1.jpg',
            platforms: [{platform: {name: 'PC'}}],
            genres: [{name: 'Action'}],
            tags: [{name: 'Tag1'}],
            stores: [{store: {name: 'Steam'}}]
          }
        ]
      }
    };
    (useQuery as jest.Mock).mockReturnValue({
      isPending: false,
      isError: false,
      data: mockGames,
      error: null
    });

    render(<GamesList/>);

    fireEvent.click(screen.getByText((content) => content.includes('Game 1')));

    expect(screen.getByTestId('game-modal')).toBeInTheDocument();
    expect(screen.getByText(/platforms:/i)).toBeInTheDocument();
    expect(screen.getByText(/pc/i)).toBeInTheDocument();

    // Close the modal
    fireEvent.click(screen.getByText(/close/i));

    // Modal should be removed
    await waitFor(() => {
      expect(screen.queryByTestId('game-modal')).not.toBeInTheDocument();
    });
  });
});
