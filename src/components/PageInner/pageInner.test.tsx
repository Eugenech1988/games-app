import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PageInner from '@/components/PageInner';
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '@/lib/slices/loginSlice';

describe('PageInner Component', () => {
  let store: any;
  const clientId = '56576647735-7lq28k8konq2kud16es3bd3q7mhfpk4m.apps.googleusercontent.com';
  const queryClient = new QueryClient();

  const renderWithState = (state: any) => {
    store = configureStore({
      reducer: {
        login: loginReducer
      },
      preloadedState: state
    });

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <GoogleOAuthProvider clientId={clientId}>
            <PageInner />
          </GoogleOAuthProvider>
        </Provider>
      </QueryClientProvider>
    );
  };

  it('should render Login component when not logged in', () => {
    renderWithState({ login: { id: '' } });

    // Check if Login is rendered
    expect(screen.getByText('Sign in with google')).toBeInTheDocument();
    // Check if other elements (Payment, Tabs) are not rendered
    expect(screen.queryByText('Games list')).toBeNull();
    expect(screen.queryByText('Stores list')).toBeNull();
    expect(screen.queryByText('Creators list')).toBeNull();
  });

  it('should render Payment and Tabs when logged in', () => {
    renderWithState({ login: { id: 'mock-user-id' } });

    // Check if Payment component is rendered
    expect(screen.getByText('Set your payment')).toBeInTheDocument();
    // Check if Tabs are rendered
    expect(screen.getByText('Games list')).toBeInTheDocument();
    expect(screen.getByText('Stores list')).toBeInTheDocument();
    expect(screen.getByText('Creators list')).toBeInTheDocument();
  });

  it('should switch tabs when clicked', async () => {
    renderWithState({ login: { id: 'mock-user-id' } });

    // Check initial active tab
    expect(screen.getByText('Games list')).toHaveClass('border-b-white');

    // Click on "Stores list" tab
    fireEvent.click(screen.getByText('Stores list'));
    expect(screen.getByText('Stores list')).toHaveClass('border-b-white');
    expect(screen.queryByText('Games list')).not.toHaveClass('border-b-white');

    // Click on "Creators list" tab
    fireEvent.click(screen.getByText('Creators list'));
    expect(screen.getByText('Creators list')).toHaveClass('border-b-white');
    expect(screen.queryByText('Stores list')).not.toHaveClass('border-b-white');
  });

  // it('should render correct content based on active tab', async () => {
  //   renderWithState({ login: { id: 'mock-user-id' } });
  //
  //   // Verify that the "Games list" tab's content is initially rendered
  //   await waitFor(() => {
  //     // Check if the Games list content is visible by checking the aria-controls attribute
  //     expect(screen.getByRole('tabpanel', {  // Checking for the Games list panel by aria-controls
  //       name: /panel:r1:0/i
  //     })).toBeInTheDocument();
  //     expect(screen.getByAltText(/Grand Theft Auto V/i)).toBeInTheDocument(); // Check if an image is rendered for a game
  //     expect(screen.getByText(/Released: 2013-09-17/i)).toBeInTheDocument(); // Check for a game's release date
  //
  //     // Ensure other panels are empty (no content rendered)
  //     expect(screen.queryByRole('tabpanel', { name: /panel:r1:1/i })).not.toHaveTextContent();
  //     expect(screen.queryByRole('tabpanel', { name: /panel:r1:2/i })).not.toHaveTextContent();
  //   });
  //
  //   // Click on the "Stores list" tab
  //   fireEvent.click(screen.getByText('Stores list'));
  //
  //   // Verify that "Stores list" content is rendered and other tab content is not
  //   await waitFor(() => {
  //     // Check if the "Stores list" tab content is visible by checking the aria-controls attribute
  //     expect(screen.getByRole('tabpanel', { name: /panel:r1:1/i })).toBeInTheDocument();
  //     // Ensure no content is rendered in the "Games list" or "Creators list" panels
  //     expect(screen.queryByRole('tabpanel', { name: /panel:r1:0/i })).not.toHaveTextContent();
  //     expect(screen.queryByRole('tabpanel', { name: /panel:r1:2/i })).not.toHaveTextContent();
  //   });
  //
  //   // Click on the "Creators list" tab
  //   fireEvent.click(screen.getByText('Creators list'));
  //
  //   // Verify that "Creators list" content is rendered and other tab content is not
  //   await waitFor(() => {
  //     // Check if "Creators list" content is visible by checking the aria-controls attribute
  //     expect(screen.getByRole('tabpanel', { name: /panel:r1:2/i })).toBeInTheDocument();
  //     // Ensure no content is rendered in the other panels
  //     expect(screen.queryByRole('tabpanel', { name: /panel:r1:0/i })).not.toHaveTextContent();
  //     expect(screen.queryByRole('tabpanel', { name: /panel:r1:1/i })).not.toHaveTextContent();
  //   });
  // });
  it('should render correct content based on active tab', async () => {
    renderWithState({ login: { id: 'mock-user-id' } });

    // Find the active tab panel by its role and name
    const activeTabPanel = await screen.findByRole('tabpanel', {
      name: /games list/i,
    });

    // Ensure the active tab panel is in the document
    expect(activeTabPanel).toBeInTheDocument();

    // Wait for the loading text to be replaced by the actual content
    await waitFor(() => {
      const loadingText = activeTabPanel.querySelector('span');
      expect(loadingText).not.toBeInTheDocument(); // Ensure "Loading..." is gone
    });

    const list = await waitFor(() => activeTabPanel.querySelector('ul'));

    expect(list).toBeInTheDocument();
  });
});
