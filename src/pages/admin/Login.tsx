import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AnimatedSection } from '../../hooks/useAnimations';
import { API_BASE_URL } from '../../config';
import Logo from '../../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [view, setView] = useState<'login' | 'forgot' | 'otp'>('login');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
      setSuccessMsg('OTP sent! Please check your email.');
      setView('otp');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetWithOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await axios.post(`${API_BASE_URL}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });
      setSuccessMsg('Password reset successfully! Please login.');
      setView('login');
      setPassword('');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" />

      <AnimatedSection className="w-full max-w-md z-10 px-4" delay={100}>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/80 backdrop-blur-xl p-10 shadow-2xl">
          <div className="text-center mb-10 flex flex-col items-center">
            <div className="mb-6">
              <Logo className="h-16" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {view === 'login' ? 'Admin Secure Login' : view === 'forgot' ? 'Forgot Password' : 'Enter OTP'}
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              {view === 'login' ? 'Access the dashboard' : view === 'forgot' ? 'Enter your email to receive an OTP' : 'Check your email for the 6-digit code'}
            </p>
          </div>

          <form onSubmit={view === 'login' ? handleLogin : view === 'forgot' ? handleForgotPassword : handleResetWithOtp} className="space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
                {successMsg}
              </div>
            )}
            
            {(view === 'login' || view === 'forgot') && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            
            {view === 'login' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <button type="button" onClick={() => { setView('forgot'); setErrorMsg(''); setSuccessMsg(''); }} className="text-xs text-accent hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  className="w-full rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            {view === 'otp' && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">6-Digit OTP</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    className="w-full rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-3 text-white text-center text-2xl tracking-[10px] focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">New Password</label>
                  <input
                    type="password"
                    required
                    className="w-full rounded-xl border border-gray-700 bg-gray-950/50 px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent-hover hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center mt-8"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                view === 'login' ? 'Sign In securely' : view === 'forgot' ? 'Send OTP' : 'Reset Password'
              )}
            </button>

            <div className="mt-10 pt-8 border-t border-gray-800 text-center">
              <button
                type="button"
                onClick={() => setView(view === 'login' ? 'forgot' : 'login')}
                className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                {view === 'login' ? 'Forgot password?' : '← Back to login'}
              </button>
            </div>
          </form>
        </div>
      </AnimatedSection>
    </div>
  );
}
