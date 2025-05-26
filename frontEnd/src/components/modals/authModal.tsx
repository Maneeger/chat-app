// src/components/Modal.tsx
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error'; // To differentiate styling for success/error
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type }) => {
  if (!isOpen) return null;

  // Define colors based on type
  const headerBgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';
  const headerTextColor = 'text-white';
  const bodyTextColor = 'text-gray-800'; // Or adjust to your cream/teal palette

  return (
    // Overlay
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4 p-0 overflow-hidden">
        {/* Modal Header */}
        <div className={`${headerBgColor} ${headerTextColor} p-4 flex justify-between items-center`}>
          <h2 className="text-xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <p className={`${bodyTextColor} text-lg mb-4`}>{message}</p>
          <div className="text-right">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-md font-semibold
                          ${type === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;