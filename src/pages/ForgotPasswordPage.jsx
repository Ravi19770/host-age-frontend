import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

// ✅ SAFE FALLBACK (prevents undefined crash)
const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5200";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // ✅ validation
      if (!email.trim()) {
        setError("Email is required");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        { email: email.trim().toLowerCase() }
      );

      // optional backend check
      if (response?.data?.success) {
        setSuccess(true);
      } else {
        setError(response?.data?.message || "Request failed");
      }

    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);

      setError(
        err?.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS SCREEN
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-[#F8FAFC]">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-2xl border shadow-sm text-center">

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Check Your Email
            </h2>

            <p className="text-slate-600 mb-6">
              If an account exists with <b>{email}</b>, we’ve sent a reset link.
            </p>

            <Button
              onClick={() => navigate('/login')}
              className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            >
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ❌ MAIN FORM
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#F8FAFC]">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Forgot Password?
          </h1>
          <p className="text-slate-600">
            Enter your email to receive a reset link
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ERROR */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <Label className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                Email Address
              </Label>

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 rounded-lg border-slate-200"
                placeholder="you@example.com"
              />
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {/* LOGIN LINK */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-[#2563EB] hover:text-[#1D4ED8] font-medium"
            >
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;