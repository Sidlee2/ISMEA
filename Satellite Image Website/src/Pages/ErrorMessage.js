import React, { useState, useEffect } from 'react';
import './styles/ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000); // Hide the error message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  return show ? (
    <div className="error-message-container">
      <div className="error-message-box">
        <span className="error-message-text">{message}</span>
      </div>
    </div>
  ) : null;
};

export default ErrorMessage;