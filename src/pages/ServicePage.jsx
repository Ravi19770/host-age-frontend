import React, { useState } from "react";

import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Check, Mail, Shield, Zap, ArrowUpRight, Menu, X } from 'lucide-react';
import AnimatedTicker from "../components/AnimatedTicker";
import { Label } from "@radix-ui/react-label";
import ChatBot from "../components/ChatBot";
import ThemeToggle from "../components/ThemeToggle";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import FAQ from "../pages/FAQ";


export const plans = [
  {
    id: "free",
    title: "FREE HOST-AGE",
    price: 0,
    billing: "Forever",
    displayPrice: "FREE",
    featured: false,
    maxWebsites: 1,
    maxEmails: 1,
    maxPages: 1,
    features: [
      "1 Website",
      "1 Domain",
      "1 Email Account",
      "No cPanel Access",
      "Free SSL",
      "24×7 Support",
    ],
  },

  {
    id: "pro",
    title: "PRO HOST-AGE",
    price: 142,
    billing: "Monthly",
    displayPrice: "₹142/mo",
    featured: true,
    maxWebsites: 1,
    maxEmails: 6,
    maxPages: 6,
    features: [
      "1 Website",
      "6 Email Accounts",
      "6 Pages",
      "Free SSL",
      "No cPanel Access",
      "Daily Backup",
      "Priority Support",
    ],
  },

  {
    id: "premium",
    title: "PREMIUM HOST-AGE",
    price: 179,
    billing: "Monthly",
    displayPrice: "₹179/mo",
    featured: false,
    maxWebsites: 1,
    maxEmails: 15,
    maxPages: 12,
    features: [
      "1 Website",
      "15 Email Accounts",
      "12 Pages",
      "Free SSL",
      "No cPanel Access",
      "Premium Support",
    ],
  },
];



//

const ServicePage = () => {
  const navigate = useNavigate();


  const [selectedPlan, setSelectedPlan] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalTermsChecked, setModalTermsChecked] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setModalTermsChecked(false);
    setIsModalOpen(true);
  };

  // ===========================
  // 👇 ADD IT HERE
  // ===========================
  const handleContinue = () => {
    if (!modalTermsChecked) {
      alert("Please accept the Terms & Conditions.");
      return;
    }

    setIsModalOpen(false);

    // Free Plan → Skip Payment
    if (selectedPlan?.price === 0) {
      navigate("/register", {
        state: {
          selectedPlan,
          skipPayment: true,
        },
      });
      return;
    }

    // Paid Plan → Add Domain Page
    navigate("/add-domain", {
      state: {
        plan: selectedPlan,
        skipPayment: false,
      },
    });
  };

  // Rest of your component...

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-bold font-heading shrink-0"
          >
            <img
              src="/assets/Host-age3.png"
              alt="Host-Age"
              className="w-[140px] h-[140px] object-contain"
            />
            {/*</Link>span className="text-[#2563EB]">Host-</span>
          </nav>  <span className="text-slate-900 dark:text-white transition-colors duration-300">
              Age
            </span>*/}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-5">

            <Link
              to="/"
              className="font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/#pricing"
              className="font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              Services
            </Link>

         {/*}   <Link
              to="/pricing"
              className="font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
            >
              Pricing
            </Link>*/}

            <Button
              variant="ghost"
              onClick={() => navigate("/login")}
              className="rounded-full text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Login
            </Button>

            <Button
              onClick={() => navigate("/register")}
              className="rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
            >
              Get Started
            </Button>

            <ThemeToggle />

          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">

            <ThemeToggle />

            <Button
              type="button"
              variant="ghost"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="h-10 w-10 p-0 rounded-lg text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl">

            <div className="px-4 py-5 space-y-2">

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Home
              </Link>

              <Link
                to="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Services
              </Link>

              <Link
                to="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full px-4 py-3 rounded-xl font-medium text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Pricing
              </Link>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">

                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/login");
                  }}
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"
                >
                  Login
                </Button>

                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/register");
                  }}
                  className="w-full rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                >
                  Get Started
                </Button>

              </div>
            </div>
          </div>
        )}
      </nav>
      <AnimatedTicker />

      <section className=" w-full min-h-screen bg-cover bg-center bg-no-repeat" style=
        {{
          backgroundImage: "url('/assets/bg12.png')",
        }}>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight px-5 mt-10 mb-6">
              Professional Email Hosting for Your Domain
            </h1>
            <p className="text-lg text-white px-5 mb-8 leading-relaxed">
              Upload your domain and create up to 6 custom email addresses. Simple, secure, and scalable email hosting solution for businesses.
            </p>
            <Button
              data-testid="hero-cta-btn"
              onClick={() => navigate('/register')}
              className="rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white m-8 px-8 py-6 text-lg font-semibold"
            >
              Start Free Trial
            </Button>
          </div>
          <div className="flex justify-center transition-transform duration-500 hover:-translate-y-3">
            <img


              className="w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-slate-50  max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl sm:text-4xl font-bold font-heading text-slate-900 text-center mb-12">
          Why Choose Host-Age?
        </h2>

        <div className="bg-[#074476] rounded-2xl grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-r via-indigo-600 to-cyan-500 text-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8">
              <Zap className="w-6 h-6 text-[#2563EB]" />
            </div >
            <h3 className="text-xl font-medium font-heading text-white mb-3">Fast Setup</h3>
            <p className="text-white">
              Get your custom email addresses up and running in minutes with our simple 5-step process.
            </p>
          </div>
          <div className=" bg-gradient-to-br from-[#081B3A] via-[#0A2D5E] to-[#103E7A] p-8 rounded-2xl border border-blue-500/30 shadow-[0_10px_35px_rgba(0,80,255,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.45)]
                hover:border-blue-400 hover:-translate-y-1 hover:scale-[1.02] transition-all  duration-300"

          >
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#0E2C5D] border border-blue-300 dark:border-blue-400/40 flex items-center justify-center mb-5 shadow-lg dark:shadow-[0_0_20px_rgba(59,130,246,0.35)]"
            >
              <Shield className="w-6 h-6 text-[#2563EB]" />
            </div>
            <h3 className="text-xl font-medium font-heading text-white mb-3">Secure & Reliable</h3>
            <p className="text-white">
              Bank-level security with email and phone verification to keep your data safe.
            </p>
          </div>
          <div className="from-[#312E81] via-[#4F46E5] to-[#06B6D4] shadow-[0_25px_80px_rgba(79,70,229,0.35)] rounded-2xl p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">


            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-8">
              <Mail className="w-6 h-6 text-[#2563EB]" />
            </div>
            <h3 className="text-xl font-medium font-heading text-white mb-3">6 Email Addresses</h3>
            <p className="text-white">
              Create up to 6 custom email addresses for your team with our standard plan.
            </p>
          </div>
        </div>
      </section>
      <h2 className="text-slate-900 text-center text-5xl font-extrabold leading-tight">
        <span className="text-slate-900">Lunch, grow and succeed with</span>{" "}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 bg-clip-text text-transparent">Host-Age</span>
      </h2>
      <section id="pricing" className="bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-500 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            {plans.map((plan, index) => (
              <div
                key={index}

                className={`relative rounded-[32px] cursor-pointer transition-all duration-500
  
                 ${plan.featured
                    ? "bg-gradient-to-br from-[#000917] via-[#01132B] to-[#032750] text-white shadow-[0_25px_80px_rgba(0,0,0,0.55)] border border-cyan-400/30"
                    : "bg-[#01132B]/70 backdrop-blur-xl text-slate-100 border border-white/10 hover:border-cyan-400/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
                  }`}
              >

                {/* Card Content */}
                <div className="p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center mb-6
                  ${plan.featured
                        ? "bg-white/20"
                        : "bg-violet-100 text-violet-700"
                      }`}
                  >
                    ✦
                  </div>

                  {/* Badge */}
                  <div
                    className={`inline-flex px-5 py-2 rounded-full text-xs tracking-widest font-semibold mb-6
                  ${plan.featured
                        ? "bg-white text-violet-700"
                        : "bg-violet-100 text-violet-700"
                      }`}
                  >
                    {plan.title}
                  </div>

                  {/* Price */}
                  <h2

                    className="text-5xl font-bold mb-6">{plan.displayPrice}</h2>

                  {/* Description */}
                  <p
                    className={`leading-relaxed mb-10 ${plan.featured
                      ? "text-violet-100"
                      : "text-white"
                      }`}
                  >
                    I design the logo that reflects the identity of your brand in
                    a professional and unique way.
                  </p>

                  {/* Features */}
                  <ul className="space-y-5 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <span
                          className={`w-7 h-7 rounded-full flex items-center justify-center
                        ${plan.featured
                              ? "bg-white text-violet-700"
                              : "bg-violet-600 text-white"
                            }`}
                        >
                          <Check size={14} />
                        </span>

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>





                  {/* Button */}




                  <button
                    onClick={() => handlePlanSelect(plan)}



                    className={`w-full py-4 rounded-full font-medium flex items-center justify-between px-6 transition
                    ${plan.featured
                        ? "bg-gradient-to-r from-violet-500 to-indigo-400 text-white hover:shadow-2xl hover:-translate-y-2"
                        : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                      }`}
                  >
                    Click here to get started!
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#081B3A] via-[#123E8A]
            to-[#06B6D4] p-12 shadow-[0_40px_100px_rgba(0,0,0,.45)] border border-white/10 transition-all duration-500
            hover:-translate-y-2 hover:shadow-[0_45px_120px_rgba(37,99,235,.55)]"

        >
          <h2 className="text-white text-2xl sm:text-3xl font-semibold font-heading text-slate-900 text-center mb-8">
            Simple Pricing
          </h2>
          <div className="text-center mb-8 rounded-2xl">
            <div className="text-5xl font-bold text-white mb-2">₹2999<span className="text-white">/Year</span></div>
            <p className="text-white">Everything you need to get started</p>
          </div>
          <ul className="space-y-4 mb-8 text-white">
            {[
              'Custom domain hosting',
              '6 email addresses included',
              'Email & phone verification',
              "No cPannel Access",
              'Secure payment gateway',
              '24/7 customer support'
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#10B981]" />
                <span className="text-white">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            data-testid="pricing-cta-btn"
            onClick={() => navigate('/register')}
            className="w-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400 text-white hover:bg-[white] "
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />


      <footer className="bg-[#074476] ">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* Brand */}
            <div>
              <h3 className="text-white text-xl font-bold text-slate-900">
                Host-Age
              </h3>
              <p className="mt-3 text-white">
                Professional email page and Host-Age domain management
                platform for businesses and creators.
              </p>
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300"
                >
                  <FaLinkedinIn className="h-5 w-5 text-white" />
                </a>

                <a
                  href="https://www.instagram.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-pink-600 transition-all duration-300"
                >
                  <FaInstagram className="h-5 w-5 text-white" />
                </a>
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
                >
                  <FaFacebookF className="text-white text-lg" />
                </a>
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="text-white text-xl font-bold text-slate-900 mb-4">
                Service
              </h4>
              <ul className="space-y-2 text-white">
                <li>
                  <a href="/about" className="hover:text-lime-400">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/features" className="hover:text-lime-400">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-lime-400">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Plans */}
            <div>
              <h4 className="text-white text-xl font-bold text-slate-900 mb-4">
                Plans
              </h4>
              <ul className="space-y-2 text-white">
                <li>
                  <a href="/pricing" className="hover:text-lime-400">
                    Basic Plan
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-lime-400">
                    Pro Plan
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="hover:text-lime-400">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-xl text-white font-bold text-slate-900 mb-4">
                Location
              </h4>
              <p className="text-white">
                Mumbai, Maharashtra
              </p>
              <p className="text-white">
                India
              </p>
              <p className="text-white mt-2">
                support@Host-Age.com
              </p>
            </div>

          </div>

          {/* Bottom Footer */}
          <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <p className="text-center md:text-left">
              © 2026 Host-Age. All rights reserved.
            </p>

            <Link
              to="/privacy-policy"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-and-conditions"
              className="hover:text-blue-400 transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
          {/*
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition-all hover:scale-110"
          >
            HA
          </button>
          */}

          {isOpen && (
            <ChatBot
              onClose={() => setIsOpen(false)}
            />
          )}
        </div>

      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Terms & Conditions
            </h2>

            <div className="h-56 overflow-y-auto border rounded-lg p-4 text-gray-700 text-sm">

              <p className="mb-3">
                By continuing, you agree to Host-Age's Terms &
                Conditions.
              </p>

              <p className="mb-3">
                • Payments are non-refundable once the domain has been registered.
              </p>

              <p className="mb-3">
                • Hosting services begin after successful payment.
              </p>

              <p className="mb-3">
                • Renewal charges apply after the subscription period.
              </p>

              <p className="mb-3">
                • Users must provide accurate registration details.
              </p>

              <p className="mb-3">
                • By proceeding you accept our Privacy Policy and Terms of Service.
              </p>

            </div>

            <label className="flex items-center mt-6 gap-3">
              <input
                type="checkbox"
                checked={modalTermsChecked}
                onChange={(e) =>
                  setModalTermsChecked(e.target.checked)
                }
              />

              <span>
                I accept the Terms & Conditions
              </span>
            </label>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-lg bg-gray-200"
              >
                Cancel
              </button>

              <button
                disabled={!modalTermsChecked}
                onClick={handleContinue}
                className={`px-6 py-2 rounded-lg text-white ${modalTermsChecked
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-gray-400 cursor-not-allowed"
                  }`}
              >
                Continue
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};
function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="w-5 h-5 text-green-500" />

      <span className="text-slate-700">
        {text}
      </span>
    </div>
  );
}

export default ServicePage;