import React, { useState } from 'react';
import { X, Lock, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { DGLogo } from '../DGLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      setError(false);
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-md w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <DGLogo size={36} />
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight">
                De-Graft Admin Portal
              </h2>
              <p className="text-[11px] text-slate-400">
                Authorized Executive Access Only
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Password / Access Key
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-3 rounded-xl bg-slate-950 border text-white text-sm focus:outline-none transition-colors ${
                  error
                    ? 'border-rose-500 ring-1 ring-rose-500'
                    : 'border-slate-700 focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
            </div>
            {error && (
              <p className="text-xs text-rose-400 mt-1.5">
                Invalid password. Please check your credentials and try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Authenticate & Enter Admin Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
