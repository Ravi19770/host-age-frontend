import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

const VerificationDialog = ({
  open,
  onClose,
  type,
  identifier,
}) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleVerify = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/api/verify-email-otp`,
        {
          email: identifier,
          otp: otp.trim(),
        }
      );

      if (response.data.success) {
        onClose(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "OTP Verification Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "24px",
          borderRadius: "12px",
          width: "400px",
          maxWidth: "90%",
        }}
      >
        <h2>Verify {type}</h2>

        <p>
          Verification code sent to:
          <br />
          <strong>{identifier}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        />

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "10px",
            }}
          >
            {error}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationDialog;