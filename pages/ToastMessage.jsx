import React, { useEffect, useState } from 'react';

const ToastMessage = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true); // Start the animation for appearance

      const timer = setTimeout(() => {
        setIsVisible(false); // Disappear after 3 seconds
        setTimeout(() => {
          onClose(); // Close after disappearing
        }, 700); // Delay before closing
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timeout
    }
  }, [message, onClose]);

  if (!message) return null;

  const messageStyles = type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg 
        ${messageStyles} 
        transition-all duration-500 ease-in-out 
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
      style={{
        zIndex: 999,
      }}
    >
      {message}
    </div>
  );
};

export default ToastMessage;
