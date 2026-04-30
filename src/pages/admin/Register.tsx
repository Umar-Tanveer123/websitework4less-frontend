import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AnimatedSection } from '../../hooks/useAnimations';
import { API_BASE_URL } from '../../config';

export default function RegisterAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [registrationToken, setRegistrationToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const navigate = useNavigate();

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register-otp`, { email });
      setRegistrationToken(res.data.registrationToken);
      setSuccessMsg('Verification code sent to your email!');
      setStep('otp');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register-verify`, {
        email,
        password,
        name,
        otp,
        registrationToken
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || 'Invalid OTP or registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-24">
      <div className="max-w-md w-full">
        <AnimatedSection className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-10 md:p-12 border border-gray-100">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Admin Registration</h1>
            <p className="text-gray-500 mt-3 font-medium">Join the management team</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 text-green-600 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2">
              {successMsg}
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Create Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-900 focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none transition-all placeholder:text-gray-400 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-900 text-white rounded-2xl py-4 font-bold text-lg hover:bg-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-gray-200"
              >
                {loading ? 'Sending OTP...' : 'Send Verification Code'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyAndRegister} className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500">We've sent a 6-digit code to <br /><span className="text-gray-900 font-bold">{email}</span></p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1 text-center block">Enter OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  placeholder="000000"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-5 text-gray-900 text-center text-3xl font-bold tracking-[0.5em] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 focus:outline-none transition-all placeholder:text-gray-200"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white rounded-2xl py-4 font-bold text-lg hover:bg-accent-hover transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-xl shadow-accent/20"
              >
                {loading ? 'Verifying...' : 'Complete Registration'}
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Back to details
              </button>
            </form>
          )}

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already have an account?{' '}
              <Link to="/admin/login" className="text-accent font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
