import { useState } from "react";
import axios from "axios";

import { useAuth } from "../../../context/AuthContext";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";

import { AlertCircle, CheckCircle2 } from "lucide-react";

const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5200";

const Step1Account = ({ data, setData, nextStep }) => {
  const { register: registerUser } = useAuth();

  // -----------------------------
  // Loading States
  // -----------------------------
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  // -----------------------------
  // Messages
  // -----------------------------
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -----------------------------
  // OTP States
  // -----------------------------
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // -----------------------------
  // Form Data
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // -----------------------------
  // Handle Input Change
  // -----------------------------
  const handleInputChange = (field, value) => {
    setError("");
    setSuccess("");

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // -----------------------------
  // Validation
  // -----------------------------
  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Full name is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      return "Please enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      return "Please enter a valid 10-digit mobile number.";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      return "Password must contain uppercase, lowercase, number and special character.";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match.";
    }

    if (!formData.acceptTerms) {
      return "Please accept Terms & Conditions.";
    }

    if (!emailVerified) {
      return "Please verify your email.";
    }

    return null;
  };
  // -----------------------------
  // Send Email OTP
  // -----------------------------
  const sendEmailOtp = async () => {
    if (otpLoading || emailVerified) return;

    setError("");
    setSuccess("");

    const email = formData.email.trim().toLowerCase();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setOtpLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/send-email-otp`,
        { email }
      );

      if (data.success) {
        setEmailOtpSent(true);
        setSuccess("OTP has been sent to your email.");
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      console.error("SEND OTP ERROR:", err);

      setError(
        err.response?.data?.message ||
        "Unable to send OTP. Please try again."
      );
    } finally {
      setOtpLoading(false);
    }
  };

  // -----------------------------
  // Verify Email OTP
  // -----------------------------
  const verifyEmailOtp = async () => {
    if (otpLoading || emailVerified) return;

    setError("");
    setSuccess("");

    const otp = emailOtp.trim();

    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setOtpLoading(true);

    try {
      const { data } = await axios.post(
        `${API_URL}/api/verify-email-otp`,
        {
          email: formData.email.trim().toLowerCase(),
          otp,
        }
      );

      if (data.success) {
        setEmailVerified(true);
        setSuccess("Email verified successfully.");
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      console.error("VERIFY OTP ERROR:", err);

      setEmailVerified(false);

      setError(
        err.response?.data?.message ||
        "OTP verification failed."
      );
    } finally {
      setOtpLoading(false);
    }
  };
  // -----------------------------
  // Register User
  // -----------------------------
  const handleStep1Submit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setSuccess("");

    // Validate Form
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      };

      console.log("REGISTER PAYLOAD:", payload);

      const response = await registerUser(payload);

      console.log("REGISTER RESPONSE:", response);

      if (!response?.success) {
        throw new Error(
          response?.message || "Registration failed."
        );
      }

      // Save Token
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Save Registration Data
      setData((prev) => ({
        ...prev,
        user: response.user,
        token: response.token,
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
      }));

      setSuccess("Account created successfully.");

      // Move to Step 2
      nextStep();

    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300">
        <img src="/assets/host-age2.png"
          alt="Host-Age"
          className="w-[140px] h-[140px] object-contain"
        />
      </nav>
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">


        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Create Your Account
          </h2>

          <p className="text-slate-500 mt-2">
            Complete the first step to start your hosting journey.
          </p>
        </div>

        <form
          onSubmit={handleStep1Submit}
          className="space-y-6"
        >

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">

              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />

              <p className="text-sm text-red-700">
                {error}
              </p>

            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">

              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />

              <p className="text-sm text-green-700">
                {success}
              </p>

            </div>
          )}

          {/* Full Name */}
          <div>
            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) =>
                handleInputChange("name", e.target.value)
              }
              className="mt-2"
            />
          </div>

          {/* Email */}
          <div>

            <Label htmlFor="email">
              Email Address
            </Label>

            <div className="flex gap-3 mt-2">

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                disabled={emailVerified}
                value={formData.email}
                onChange={(e) =>
                  handleInputChange("email", e.target.value)
                }
              />

              <Button
                type="button"
                onClick={sendEmailOtp}
                disabled={otpLoading || emailVerified}
              >
                {otpLoading
                  ? "Sending..."
                  : emailVerified
                    ? "Verified"
                    : "Send OTP"}
              </Button>

            </div>

            {emailOtpSent && !emailVerified && (

              <div className="flex gap-3 mt-4">

                <Input
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={emailOtp}
                  onChange={(e) => {
                    setError("");
                    setSuccess("");
                    setEmailOtp(e.target.value);
                  }}
                />

                <Button
                  type="button"
                  onClick={verifyEmailOtp}
                  disabled={
                    otpLoading ||
                    emailOtp.length !== 6
                  }
                >
                  {otpLoading
                    ? "Verifying..."
                    : "Verify"}
                </Button>

              </div>

            )}

            {emailVerified && (
              <p className="text-green-600 text-sm mt-3 font-medium">
                ✓ Email verified successfully
              </p>
            )}

          </div>

          {/* Phone */}
          <div>

            <Label htmlFor="phone">
              Phone Number
            </Label>

            <Input
              id="phone"
              type="tel"
              placeholder="9876543210"
              value={formData.phone}
              className="mt-2"
              onChange={(e) =>
                handleInputChange(
                  "phone",
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10)
                )
              }
            />

          </div>

          {/* Password */}
          <div>

            <Label htmlFor="password">
              Password
            </Label>

            <Input
              id="password"
              type="password"
              className="mt-2"
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                handleInputChange(
                  "password",
                  e.target.value
                )
              }
            />

          </div>

          {/* Confirm Password */}
          <div>

            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <Input
              id="confirmPassword"
              type="password"
              className="mt-2"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange(
                  "confirmPassword",
                  e.target.value
                )
              }
            />

          </div>

          {/* Terms */}
          <div className="flex items-start gap-3">

            <Checkbox
              checked={formData.acceptTerms}
              onCheckedChange={(checked) =>
                handleInputChange(
                  "acceptTerms",
                  checked
                )
              }
            />

            <p className="text-sm text-slate-600 leading-6">
              I agree to the
              <span className="font-semibold text-blue-600">
                {" "}Terms & Conditions
              </span>
              {" "}and{" "}
              <span className="font-semibold text-blue-600">
                Privacy Policy
              </span>
            </p>

          </div>

          {/* Continue Button */}
          <Button
            type="submit"
            disabled={loading || !emailVerified}
            className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            {loading
              ? "Creating Account..."
              : "Continue"}
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Step1Account;