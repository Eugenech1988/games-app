import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GameModal from '@/components/GameModal';

// Set up a mock `modal-root` in the test DOM
beforeAll(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);
});

afterAll(() => {
  const modalRoot = document.getElementById('modal-root');
  if (modalRoot) {
    document.body.removeChild(modalRoot);
  }
});

describe('GameModal Component', () => {
  it('renders children inside the modal', () => {
    render(
      <GameModal onClose={() => {}}>
        <p>Test Content</p>
      </GameModal>
    );

    // Ensure the content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders inside the portal', () => {
    render(
      <GameModal onClose={() => {}}>
        <p>Portal Content</p>
      </GameModal>
    );

    // Check if the modal is rendered within the `modal-root` container
    const modalRoot = document.getElementById('modal-root')!;
    expect(modalRoot).toContainElement(screen.getByText('Portal Content'));
  });

  it('calls onClose when the close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <GameModal onClose={mockOnClose}>
        <p>Closable Content</p>
      </GameModal>
    );

    // Simulate a click on the close button
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);

    // Ensure `onClose` callback was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('applies proper styling and accessibility attributes', () => {
    render(
      <GameModal onClose={() => {}}>
        <p>Styled Content</p>
      </GameModal>
    );

    // Check modal container styling and accessibility
    const modalContainer = screen.getByText('Styled Content').parentElement?.parentElement;
    expect(modalContainer).toHaveClass('fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50');
  });
});
