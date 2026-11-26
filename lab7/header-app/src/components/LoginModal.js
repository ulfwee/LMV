import { useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function LoginModal({ onClose }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Login form submitted: ${login}`);

    onClose();
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="login-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          <FiX />
        </button>

        <h2 id="login-title">Sign in</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="login">Login</label>

          <input
            id="login"
            type="text"
            placeholder="Enter your login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="login-button"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}