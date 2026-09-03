import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../context/AuthContext";
import StepIndicator from "../components/StepIndicator";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

import { AlertCircle, Trash2 } from "lucide-react";

const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5200";

const RegistrationWizard = () => {
  const navigate = useNavigate();

  const { register: registerUser } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [domain, setDomain] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [emailPages, setEmailPages] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [newPageName, setNewPageName] = useState("");
  const location = useLocation();

  const selectedPlan = location.state?.selectedPlan;

  const sendEmailOtp = async () => {
    try {
      setError("");

      if (!formData.email) {
        setError("Please enter email first");
        return;
      }

      const res = await axios.post(
        `${API_URL}/api/send-email-otp`,
        {
          email: formData.email.trim().toLowerCase(),
        }
      );

      if (res.data.success) {
        setEmailOtpSent(true);
        alert("OTP sent to your email");
      }
    } catch (err) {
      console.error("SEND OTP ERROR:", err);

      setError(
        err.response?.data?.message ||
        "Failed to send OTP"
      );
    }
  };

  const verifyEmailOtp = async () => {
    try {
      setError("");

      const response = await axios.post(
        `${API_URL}/api/verify-email-otp`,
        {
          email: formData.email.trim().toLowerCase(),
          otp: emailOtp.trim(),
        }
      );

      if (response.data.success) {
        setEmailVerified(true);
        alert("Email Verified Successfully");
      }
    } catch (err) {
      console.error("VERIFY OTP ERROR:", err);

      setEmailVerified(false);

      setError(
        err.response?.data?.message ||
        "Invalid OTP"
      );
    }
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        setError("Full name is required");
        setLoading(false);
        return;
      }

      if (!formData.email.trim()) {
        setError("Email is required");
        setLoading(false);
        return;
      }

      if (!formData.password) {
        setError("Password is required");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (!formData.acceptTerms) {
        setError("You must accept terms and conditions");
        setLoading(false);
        return;
      }

      if (!emailVerified) {
        setError("Please verify your email");
        setLoading(false);
        return;
      }

      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone?.trim() || null,
        password: formData.password,
      };

      console.log("REGISTER PAYLOAD:", payload);

      const response = await registerUser(payload);
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      console.log("REGISTER RESPONSE:", response);


      // ✅ SAVE TOKEN
      if (response?.token) {
        localStorage.setItem("token", response.token);
      }

      if (response?.success) {
        // ✅ OPTION 1 (BEST FOR MULTI-STEP FLOW)
        setCurrentStep(2);

      }

    } catch (err) {
      console.error(
        "REGISTER ERROR:",
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };


  // STEP 2 - Upload Domain
  const handleStep2Submit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const cleanDomain = domain?.trim()?.toLowerCase();

      if (!cleanDomain) {
        setError("Domain is required");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/domains/upload`,
        { domain: cleanDomain },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response || !response.data) {
        throw new Error("No response received from server.");
      }

      const data = response.data;

      if (data.success) {
        localStorage.setItem(
          "domain",
          data?.domain?.domain || cleanDomain
        );

        setCurrentStep(3);
      } else {
        setError(data.message || "Failed to upload domain");
      }
    } catch (err) {
      {/*
        console.log("STATUS:", err.response?.status);
      console.log("RESPONSE:", err.response?.data);
      console.log("REQUEST:", err.config?.data);
      */}
      

      setError(
        err.response?.data?.message || "Failed to upload domain"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleAddEmailPage = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/email`,
        {
          email: newEmail,
          page_name: newPageName,
        },
        { withCredentials: true }
      );

      if (data?.success) {
        const newPage = data.page;

        setEmailPages((prev) => [...prev, newPage]);

        setNewEmail("");
        setNewPageName("");
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteEmailPage = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/email/${id}`, {
        withCredentials: true,
      });

      setEmailPages((prev) => prev.filter((page) => page._id !== id));

      console.log("Email page deleted:", id);
    } catch (err) {
      console.error("Delete error:", err);
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to delete email page"
      );
    }
  };
  const handleStep3Submit = (e) => {
    e.preventDefault();
    setError('');

    if (!emailPages || emailPages.length === 0) {
      setError('Please add at least one email page');
      return;
    }

    setCurrentStep(4);
  };

  const handlePayment = async (provider) => {
    setError('');
    setLoading(true);

    try {
      if (!selectedPlan) {
        setError("Please select a hosting plan.");
        return;
      }

      // ✅ FREE PLAN
      if (selectedPlan.price === 0) {
        const response = await axios.post(
          `${API_URL}/api/register/free-plan`,
          {
            plan: selectedPlan,
          },
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          navigate("/welcome");
        }

        return;
      }


      const origin = window.location.origin;

      const response = await axios.post(
        `${API_URL}/api/payments/create-checkout`,
        {
          amount: selectedPlan.price,
          currency: 'inr',
          success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/register`,
          metadata: {
            plan: '6_email_pages',
            provider,
          },
        },
        { withCredentials: true }
      );

      if (response?.data?.url) {
        window.location.href = response.data.url;
      } else {
        setError('Payment URL not received from server');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        'Failed to initiate payment'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-600">Complete the setup in 5 simple steps</p>
        </div>

        <StepIndicator currentStep={currentStep} />

        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          {currentStep === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-6">
              <h2 className="text-xl font-semibold font-heading text-slate-900 mb-4">
                Step 1: Basic Information
              </h2>

              {error && (
                <div data-testid="step1-error" className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>

                <Input
                  id="email"
                  data-testid="register-email-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  required
                  className="mt-2"
                />

                <Button
                  type="button"
                  onClick={sendEmailOtp}
                  className="mt-2"
                >
                  Send Email OTP
                </Button> {emailOtpSent && (
                  <div className="mt-3 space-y-2">
                    <Input
                      placeholder="Enter Email OTP"
                      value={emailOtp}
                      onChange={(e) =>
                        setEmailOtp(e.target.value)
                      }
                    />

                    <Button
                      type="button"
                      onClick={verifyEmailOtp}
                    >
                      Verify Email OTP
                    </Button>
                  </div>
                )}

                {emailVerified && (
                  <p className="text-green-600 mt-2">
                    ✓ Email Verified
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  data-testid="register-phone-input"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, ""); // only digits
                    setFormData({
                      ...formData,
                      phone: value.slice(0, 10), // max 10 digits
                    });
                  }}
                  required
                  placeholder="9876543210"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  data-testid="register-password-input"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  data-testid="register-confirm-password-input"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="mt-2"
                />
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  data-testid="register-terms-checkbox"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked })}
                />
                <label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                  I accept the terms and conditions and privacy policy
                </label>
              </div>

              <Button
                type="submit"
                data-testid="step1-submit-btn"
                disabled={loading}
                className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6"
              >
                {loading ? 'Creating Account...' : 'Continue'}
              </Button>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">
              <h2 className="text-xl font-semibold font-heading text-slate-900 mb-4">
                Step 2: Upload Domain
              </h2>

              {error && (
                <div data-testid="step2-error" className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div>



                <Label htmlFor="domain">Your Domain Name</Label>
                <Input
                  id="domain"
                  data-testid="domain-input"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                  placeholder="example.com"
                  className="mt-2"
                />
                <p className="text-sm text-slate-500 mt-2">
                  Enter your custom domain without http:// or https://
                </p>
              </div>

              <Button
                type="submit"
                data-testid="step2-submit-btn"
                disabled={loading}
                className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6"
              >
                {loading ? 'Adding Domain...' : 'Continue'}
              </Button>
            </form>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleStep3Submit} className="space-y-6">
              <h2 className="text-xl font-semibold font-heading text-slate-900 mb-4">
                Step 3: Configure Email Pages ({emailPages.length}/6)
              </h2>

              {error && (
                <div data-testid="step3-error" className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="newEmail">Email Address</Label>
                  <Input
                    id="newEmail"
                    data-testid="new-email-input"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="info@example.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="pageName">Number of pages</Label>
                  <Input
                    id="pageName"
                    type="number"
                    min="1"
                    max="1"
                    value={newPageName}
                    onChange={(e) => {
                      const value = Math.min(1, Number(e.target.value));
                      setNewPageName(value.toString());
                    }}
                    className="mt-2"
                  />

                </div>
                <Button
                  type="button"
                  data-testid="add-email-page-btn"
                  onClick={handleAddEmailPage}
                  disabled={emailPages.length >= 6}
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Add Email Page
                </Button>
              </div>


              {emailPages.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-medium text-slate-700">Added Email Pages:</h3>
                  {emailPages.map((page) => (
                    <div
                      key={page.email}
                      data-testid={`email-page-${page.email}`}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{page.email}</div>
                        <div className="text-sm text-slate-500">{page.page_name}</div>
                      </div>
                      <Button
                        type="button"
                        data-testid={`delete-email-${page?.id}`}
                        onClick={() => handleDeleteEmailPage(page?.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                type="submit"
                data-testid="step3-submit-btn"
                disabled={emailPages.length === 0}
                className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6"
              >
                Continue to Payment
              </Button>
            </form>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold font-heading text-slate-900 mb-4">
                Step 4: Choose Payment Method
              </h2>

              {error && (
                <div data-testid="step4-error" className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-[#2563EB]">₹999/month</div>
                  <p className="text-slate-600 mt-1">6 Email Pages Plan</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  data-testid="pay-stripe-btn"
                  onClick={() => handlePayment('stripe')}
                  disabled={loading}
                  className="w-full rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-6"
                >
                  Pay with Stripe
                </Button>

                <Button
                  data-testid="pay-razorpay-btn"
                  onClick={() => handlePayment('razorpay')}
                  disabled={loading}
                  variant="outline"
                  className="w-full rounded-full py-6"
                >
                  Pay with Razorpay
                </Button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};



export default RegistrationWizard;