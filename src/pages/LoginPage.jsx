import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { AlertCircle } from "lucide-react";

const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5200";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    // ==========================================
    // LOGIN
    // ==========================================
    const loginResponse = await login(
      formData.email.trim(),
      formData.password
    );

    console.log(
      "✅ LOGIN RESPONSE:",
      loginResponse
    );

    // ==========================================
    // GET JWT TOKEN
    // ==========================================
    const token =
      loginResponse?.token ||
      localStorage.getItem("token");

    if (!token) {
      throw new Error(
        "Login successful, but authentication token was not received."
      );
    }

    console.log(
      "✅ AUTH TOKEN AVAILABLE"
    );

    // ==========================================
    // SAVE TOKEN
    // ==========================================
    localStorage.setItem(
      "token",
      token
    );

    // ==========================================
    // SAVE USER
    // ==========================================
    if (loginResponse?.user) {
      localStorage.setItem(
        "user",
        JSON.stringify(loginResponse.user)
      );
    }

    // ==========================================
    // CHECK USER DOMAINS
    // ==========================================
    const { data } = await axios.get(
      `${API_URL}/api/domains`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "✅ DOMAINS RESPONSE:",
      data
    );

    // ==========================================
    // NAVIGATION
    // ==========================================
    const userDomains = Array.isArray(data?.data) ? data.data : [];

    if (userDomains.length === 0) {
      navigate("/add-domain");
    } else {
      navigate("/dashboard");
    }

  } catch (err) {
    console.error(
      "❌ LOGIN ERROR:",
      err.response?.data || err.message
    );

    const detail =
      err.response?.data?.detail;

    if (typeof detail === "string") {
      setError(detail);
    } else if (Array.isArray(detail)) {
      setError(
        detail
          .map((e) => e.msg)
          .join(", ")
      );
    } else if (err.response?.data?.message) {
      setError(
        err.response.data.message
      );
    } else {
      setError(
        err.message ||
        "Login failed. Please check your credentials."
      );
    }

  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img
          src="https://static.prod-images.emergentagent.com/jobs/1fa8b1fe-dd9b-4779-83e4-cd3ae2cbea65/images/94ac05760ba1b9b930ea9b4b9a6e3c06416aa88b41ddc3442b8aec474b7af6e8.png"
          alt="Abstract background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Welcome Back</h1>
            <p className="text-slate-600">Login to your DomainHub account</p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div data-testid="login-error" className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                  Email
                </Label>
                <Input
                  id="email"
                  data-testid="login-email-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-2 rounded-lg border-slate-200"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 uppercase tracking-wide">
                  Password
                </Label>
                <Input
                  id="password"
                  data-testid="login-password-input"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="mt-2 rounded-lg border-slate-200"
                  placeholder="••••••••"
                />
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  data-testid="forgot-password-link"
                  className="text-sm text-[#2563EB] hover:text-[#1D4ED8] font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                data-testid="login-submit-btn"
                disabled={loading}
                className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6 text-base font-semibold"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  data-testid="register-link"
                  className="text-[#2563EB] hover:text-[#1D4ED8] font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;