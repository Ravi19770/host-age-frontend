import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Download,
  Home,
  ArrowRight,
  AlertTriangle,
  Receipt,
  Clock3,
  Mail,
  Globe,
  Sparkles,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { PAYMENT_API } from "../config/api";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();



  const { paymentId } = useParams();
  const { width, height } = useWindowSize();

  // ==========================
  // STATES
  // ==========================

  const [status, setStatus] = useState("checking");

  const [attempts, setAttempts] = useState(0);

  const [countdown, setCountdown] = useState(5);

  const [paymentData, setPaymentData] = useState({
    plan: localStorage.getItem("plan") || "Professional Hosting",
    domain: localStorage.getItem("domain") || "example.com",
    amount: "₹999",
    transaction:
      paymentId?.substring(0, 18).toUpperCase() || "TXN-XXXXXXXX",
    email:
      localStorage.getItem("email") ||
      "support@host-age.com",
  });

  // ==========================
  // PAYMENT STATUS POLLING
  // ==========================

  useEffect(() => {
    if (!paymentId) {
      setStatus("error");
      return;
    }

    let interval;

    const verifyPayment = async () => {
      try {
        const { data } = await axios.get(
          `${PAYMENT_API}/api/payment/status/${paymentId}`,
          {
            withCredentials: true,
          }
        );

        console.log("PAYMENT STATUS:", data);

        if (
          data.payment_status === "paid" ||
          data.status === "paid" ||
          data.payment?.status === "paid"
        ) {
          setStatus("success");

          setPaymentData((prev) => ({
            ...prev,
            ...(data.payment || {}),
          }));

          clearInterval(interval);
          return;
        }

        if (data.status === "expired") {
          setStatus("expired");
          clearInterval(interval);
          return;
        }

        setAttempts((prev) => prev + 1);

      } catch (err) {
        console.error("Verify Payment Error:", err);
        setAttempts((prev) => prev + 1);
      }
    };
    verifyPayment();

    interval = setInterval(() => {

      verifyPayment();

    }, 3000);

    return () => clearInterval(interval);

  }, [paymentId]);

  // ==========================
  // Timeout after 5 attempts
  // ==========================

  useEffect(() => {

    if (attempts >= 5 && status === "checking") {

      setStatus("timeout");

    }

  }, [attempts, status]);

  // ==========================
  // Auto Redirect
  // ==========================

 useEffect(() => {
    if (status !== "success") return;

    const timer = setInterval(() => {
        setCountdown((prev) => {
            if (prev <= 1) {
                clearInterval(timer);

                navigate("/register?step=4");

                return 0;
            }

            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(timer);

}, [status, navigate]);
  // ==========================
  // LOADING SCREEN
  // ==========================




  if (status === "checking") {



    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900">

        {/* Background Glow */}
        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[180px]" />

        <div className="flex items-center justify-center min-h-screen px-6">

          <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-12 shadow-[0_25px_80px_rgba(0,0,0,.45)]">

            <Loader2 className="mx-auto h-16 w-16 animate-spin text-cyan-400" />

            <h1 className="mt-8 text-center text-4xl font-black text-white">

              Verifying Payment

            </h1>

            <p className="mt-5 text-center text-slate-300 leading-8">

              Please wait while we securely verify your payment.
              This usually takes only a few seconds.

            </p>

            <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">

              <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

            </div>

            <p className="mt-6 text-center text-slate-500 text-sm">

              Attempt {attempts + 1} / 5

            </p>

          </div>

        </div>

      </div>
    );
  }







  // ==========================
  // SUCCESS PAGE
  // ==========================


  const handleDownloadInvoice = () => {
  if (!paymentId) {
    alert("Invoice not available.");
    return;
  }

  window.open(
    `${PAYMENT_API}/api/invoices/${paymentId}/download`,
    "_blank"
  );
};

  if (status === "success") {

    return (

      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-900">

        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={350}
        />

        {/* Background Glow */}

        <div className="absolute -top-40 -left-40 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[180px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-[180px]" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">

          <div className="w-full max-w-4xl rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-[0_25px_80px_rgba(0,0,0,.45)]">

            {/* Success Icon */}

            <div className="flex justify-center">

              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">

                <CheckCircle2 className="h-14 w-14 text-green-400" />

              </div>

            </div>

            <h1 className="mt-8 text-center text-5xl font-black text-white">

              Payment Successful 🎉

            </h1>

            <p className="mt-5 text-center text-slate-300">

              Thank you for your purchase.
              Your hosting account has been activated successfully.

            </p>

            {/* Order Summary */}

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">

              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">

                <Receipt className="text-cyan-400" />

                Order Summary

              </h3>

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <p className="text-sm text-slate-400">

                    Hosting Plan

                  </p>

                  <h4 className="mt-2 text-lg font-semibold text-white">

                    {paymentData.plan}

                  </h4>

                </div>

                <div>

                  <p className="text-sm text-slate-400">

                    Amount Paid

                  </p>

                  <h4 className="mt-2 text-lg font-bold text-green-400">

                    {paymentData.amount}

                  </h4>

                </div>

                <div>

                  <p className="text-sm text-slate-400">

                    Domain

                  </p>

                  <h4 className="mt-2 text-lg font-semibold text-white">

                    {paymentData.domain}

                  </h4>

                </div>

                <div>

                  <p className="text-sm text-slate-400">

                    Status

                  </p>

                  <h4 className="mt-2 text-lg font-semibold text-green-400">

                    Active

                  </h4>

                </div>

              </div>

            </div>

            {/* Next Section continues in Part-3 */}
            {/* What's Next */}

            <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

              <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-white">

                <Sparkles className="text-cyan-400" />

                What's Next?

              </h3>

              <div className="space-y-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">

                    <ShieldCheck className="h-5 w-5 text-green-400" />

                  </div>

                  <div>

                    <p className="font-medium text-white">

                      Hosting Activated

                    </p>

                    <p className="text-sm text-slate-400">

                      Your hosting account is now live.

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">

                    <Globe className="h-5 w-5 text-blue-400" />

                  </div>

                  <div>

                    <p className="font-medium text-white">

                      Domain Connected

                    </p>

                    <p className="text-sm text-slate-400">

                      Your custom domain is configured.

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-500/20">

                    <Mail className="h-5 w-5 text-violet-400" />

                  </div>

                  <div>

                    <p className="font-medium text-white">

                      Business Emails Ready

                    </p>

                    <p className="text-sm text-slate-400">

                      Configure your inbox anytime.

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Transaction */}

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">

              <h3 className="mb-5 text-xl font-bold text-white">

                Transaction Details

              </h3>

              <div className="space-y-4">

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Transaction ID

                  </span>

                  <span className="font-medium text-white">

                    {paymentData.transaction}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-400">

                    Customer Email

                  </span>

                  <span className="font-medium text-white">

                    {paymentData.email}

                  </span>

                </div>

              </div>

            </div>

            {/* Countdown */}

            <div className="mt-10 text-center">

              <p className="text-slate-400">

                Redirecting to Dashboard in

              </p>

              <h2 className="mt-3 text-5xl font-black text-cyan-400">

                {countdown}

              </h2>

              <p className="mt-2 text-slate-500">

                seconds

              </p>

            </div>

            {/* Buttons */}

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              <Button
                onClick={() => navigate("/dashboard")}
                className="rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 py-6 text-white transition-all hover:scale-[1.02]"
              >

                Dashboard

                <ArrowRight className="ml-2 h-5 w-5" />

              </Button>

              <Button
                variant="outline"
                onClick={handleDownloadInvoice}
                className="rounded-xl border-white/20 bg-white/5 py-6 text-white hover:bg-white/10"
              >

                <Download className="mr-2 h-5 w-5" />

                Download Invoice

              </Button>

            </div>

            {/* Support */}

            <div className="mt-10 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

              <div className="flex gap-4">

                <Sparkles className="mt-1 h-8 w-8 text-cyan-400" />

                <div>

                  <h3 className="font-semibold text-white">

                    Need Help?

                  </h3>

                  <p className="mt-2 text-slate-300">

                    Our support team is available 24×7.

                  </p>

                  <p className="mt-2 font-medium text-cyan-400">

                    support@host-age.com

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    );
  }

  // Error / Timeout screen continues in Part-4
  // ==========================================
  // PAYMENT FAILED / TIMEOUT / EXPIRED
  // ==========================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-red-950 to-slate-900">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-red-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-[180px]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-20">

        <div className="w-full max-w-2xl rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-10 shadow-[0_25px_80px_rgba(0,0,0,.5)]">

          {/* Icon */}

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">

            <AlertTriangle className="h-14 w-14 text-red-400" />

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-center text-5xl font-black text-white">

            {status === "timeout"
              ? "Verification Timeout"
              : status === "expired"
                ? "Session Expired"
                : "Payment Failed"}

          </h1>

          {/* Description */}

          <p className="mt-5 text-center text-lg leading-8 text-slate-300">

            {status === "timeout" &&
              "We are still waiting for confirmation from the payment gateway. If money has been deducted, don't worry. It will update automatically shortly."}

            {status === "expired" &&
              "Your payment session has expired. Please create a new payment session and try again."}

            {status === "error" &&
              "Something went wrong while verifying your payment. Please try again."}

          </p>

          {/* Card */}

          <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">

            <div className="flex items-center gap-4">

              <Clock3 className="h-8 w-8 text-red-400" />

              <div>

                <h3 className="font-semibold text-white">

                  Payment Status

                </h3>

                <p className="mt-1 text-slate-400">

                  Current Status :
                  <span className="ml-2 font-semibold text-red-400 uppercase">

                    {status}

                  </span>

                </p>

              </div>

            </div>

          </div>

          {/* Actions */}

          <div className="mt-10 grid gap-5 md:grid-cols-2">

            <Button
              onClick={() => navigate("/billing")}
              className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 py-6 text-white hover:scale-[1.02]"
            >
              Try Again
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="rounded-xl border-white/20 bg-white/5 py-6 text-white hover:bg-white/10"
            >
              <Home className="mr-2 h-5 w-5" />

              Back Home

            </Button>

          </div>

          {/* Support */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">

            <h3 className="text-xl font-bold text-white">

              Need Assistance?

            </h3>

            <p className="mt-3 text-slate-300">

              If your payment was deducted but this page still appears,
              please contact our support team.

            </p>

            <p className="mt-4 font-semibold text-cyan-400">

              support@host-age.com

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PaymentSuccessPage;