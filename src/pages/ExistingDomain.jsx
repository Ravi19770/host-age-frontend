import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const ExistingDomain = () => {
  const navigate = useNavigate();

  const [domain, setDomain] = useState("");
  const [error, setError] = useState("");

  const validateDomain = (value) => {
    const regex =
      /^(?!:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

    return regex.test(value);
  };

  const handleContinue = () => {
    setError("");

    const cleanDomain = domain
      .trim()
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/$/, "");

    if (!validateDomain(cleanDomain)) {
      setError("Please enter a valid domain name.");
      return;
    }

    // Backend API later

    navigate("/dns-setup", {
      state: {
        domain: cleanDomain,
      },
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 flex items-center justify-center px-6">

      {/* Background */}

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-violet-400/20 blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-5xl w-full">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white shadow px-4 py-2 mb-6">

              <Globe className="text-blue-600 w-5 h-5" />

              <span className="text-sm font-semibold">
                Connect Existing Domain
              </span>

            </div>

            <h1 className="text-5xl font-black leading-tight text-slate-900">

              Connect your domain

            </h1>

            <p className="mt-5 text-lg text-slate-600 leading-8">

              Enter your existing domain.

              We'll verify your DNS configuration and
              connect it to your hosting automatically.

            </p>

            <div className="mt-10 space-y-4">

              <div className="flex gap-3">

                <ShieldCheck className="text-green-600" />

                <span>Free SSL Certificate</span>

              </div>

              <div className="flex gap-3">

                <Lock className="text-blue-600" />

                <span>Secure DNS Verification</span>

              </div>

              <div className="flex gap-3">

                <CheckCircle className="text-emerald-600" />

                <span>No Website Downtime</span>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-8">

            <h2 className="text-2xl font-bold mb-6">

              Your Domain

            </h2>

            <Label>

              Domain Name

            </Label>

            <Input
              placeholder="example.com"
              className="mt-2 h-12"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />

            {error && (

              <p className="text-red-600 text-sm mt-3">

                {error}

              </p>

            )}

            <Button
              onClick={handleContinue}
              className="w-full mt-8 h-12 rounded-xl bg-blue-600 hover:bg-blue-700"
            >

              Continue

              <ArrowRight className="ml-2 w-4 h-4" />

            </Button>

            <p className="text-center text-slate-500 text-sm mt-6">

              Supported registrars:
              GoDaddy • Namecheap • Cloudflare • Google Domains • Bluehost

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ExistingDomain;