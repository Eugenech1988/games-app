import React from 'react';
import ReactDOM from 'react-dom';

interface IModalProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const GameModal: React.FC<IModalProps> = ({children, onClose}) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default GameModal;
