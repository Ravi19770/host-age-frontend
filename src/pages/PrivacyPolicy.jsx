import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

import {
  ShieldCheck,
  Database,
  Globe,
  FileText,
  Lock,
  Cookie,
  CreditCard,
  Server,
  UserCheck,
  Mail,

  Scale,
  ChevronRight,
  ArrowUp,
} from "lucide-react";




export default function PrivacyPolicy() {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600 py-24">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-400 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">

          <div className="max-w-4xl">

            <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-200 border border-cyan-400/30">

              <ShieldCheck className="w-4 h-4 mr-2" />

              Privacy & Data Protection

            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">

              Privacy Policy

            </h1>

            <p className="mt-6 text-xl leading-9 text-slate-200">

              Host-Age is committed to protecting your personal
              information and maintaining your trust. This Privacy
              Policy explains how we collect, use, store, protect,
              and disclose information when you use our hosting,
              domain registration, business email, cloud, and
              related online services.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 border border-white/20">

                <p className="text-sm text-slate-300">

                  Effective Date

                </p>

                <p className="text-white font-semibold">

                  August 4, 2026

                </p>

              </div>

              <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 border border-white/20">

                <p className="text-sm text-slate-300">

                  Last Updated

                </p>

                <p className="text-white font-semibold">

                  August 4, 2026

                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CONTENT ================= */}

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid lg:grid-cols-4 gap-10">

          {/* ================= SIDEBAR ================= */}

          <aside className="hidden lg:block">

            <div className="sticky top-24 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8">

              <h3 className="text-xl font-bold text-black dark:text-white">

                Table of Contents

              </h3>

              <ul className="mt-8 space-y-4 text-black text-sm">

                <li><a href="#overview" className="flex items-center gap-2 hover:text-cyan-600 text-black transition"><ChevronRight size={16} /> Overview</a></li>

                <li><a href="#scope" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Scope & Roles</a></li>

                <li><a href="#collect" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Information We Collect</a></li>

                <li><a href="#legal" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Legal Basis</a></li>

                <li><a href="#usage" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Use of Information</a></li>

                <li><a href="#cookies" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Cookies</a></li>

                <li><a href="#security" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Security</a></li>

                <li><a href="#retention" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Data Retention</a></li>

                <li><a href="#rights" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Your Rights</a></li>

                <li><a href="#contact" className="flex items-center gap-2 hover:text-cyan-600 transition"><ChevronRight size={16} /> Contact Us</a></li>

              </ul>

            </div>

          </aside>

          {/* ================= MAIN CONTENT ================= */}

          <main className="lg:col-span-3">

            {/* ================= OVERVIEW ================= */}

            <section
              id="overview"
              className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
            >

              <div className="flex items-center gap-4 mb-8">

                <div className="rounded-2xl bg-cyan-100 dark:bg-cyan-900 p-4">

                  <ShieldCheck className="text-cyan-600" size={30} />

                </div>

                <div>

                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

                    1. Overview

                  </h2>

                  <p className="text-slate-500 dark:text-slate-400 mt-1">

                    Introduction to Host-Age Privacy Practices

                  </p>

                </div>

              </div>

              <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-8">

                <p>

                  Welcome to <strong>Host-Age</strong>. We value your
                  trust and are committed to protecting your privacy.
                  This Privacy Policy explains how we collect,
                  process, store, and safeguard your personal
                  information whenever you use our website,
                  applications, hosting services, domain registration,
                  cloud infrastructure, business email solutions, or
                  customer support services.

                </p>

                <p>

                  This Policy applies to every visitor, registered
                  customer, reseller, business partner, and anyone
                  interacting with Host-Age through our website or
                  services. By accessing or using our services, you
                  acknowledge that you have read and understood this
                  Privacy Policy.

                </p>

                <div className="rounded-2xl border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-950 p-6">

                  <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">

                    Our Commitment

                  </h4>

                  <p className="text-slate-600 dark:text-slate-300">

                    We collect only the information necessary to
                    deliver secure, reliable, and high-quality
                    services. We never sell your personal data and
                    implement reasonable technical and organizational
                    measures to protect your information.

                  </p>

                </div>

              </div>

            </section>

            {/* NEXT SECTION STARTS HERE */}

            {/* Section 2 - Scope & Roles */}

          </main>

        </div>

      </div>
      {/* ====================================================== */}
      {/* SECTION 2 - SCOPE & ROLES */}
      {/* ====================================================== */}

      <section
        id="scope"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-blue-100 dark:bg-blue-900 p-4">
            <FileText className="text-blue-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              2. Scope & Roles
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              When this Privacy Policy applies
            </p>

          </div>

        </div>

        <div className="space-y-8">

          <div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              2.1 Scope
            </h3>

            <p className="leading-8 text-slate-600 dark:text-slate-300">

              This Privacy Policy applies to all Host-Age products,
              services, websites, applications, APIs, customer portals,
              hosting infrastructure, business email services,
              domain registration services, and customer support
              interactions.

            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              2.2 Our Role
            </h3>

            <p className="leading-8 text-slate-600 dark:text-slate-300">

              Host-Age acts as the controller of personal information
              collected directly from customers during account creation,
              purchases, support requests, and website usage.
              For customer-hosted content, such as websites,
              email accounts, databases, and uploaded files,
              Host-Age generally processes data on behalf of
              the customer to provide the requested services.

            </p>

          </div>

          <div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
              2.3 Services Covered
            </h3>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="rounded-xl border dark:border-slate-700 p-5">

                <h4 className="font-semibold dark:text-white mb-3">
                  Hosting Services
                </h4>

                <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">

                  <li>Website Hosting</li>
                  <li>Cloud Hosting</li>
                  <li>Business Hosting</li>
                  <li>Managed Hosting</li>

                </ul>

              </div>

              <div className="rounded-xl border dark:border-slate-700 p-5">

                <h4 className="font-semibold dark:text-white mb-3">
                  Additional Services
                </h4>

                <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">

                  <li>Domain Registration</li>
                  <li>Business Email Hosting</li>
                  <li>SSL Certificates</li>
                  <li>Technical Support</li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* SECTION 3 - INFORMATION WE COLLECT */}
      {/* ====================================================== */}

      <section
        id="collect"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-cyan-100 dark:bg-cyan-900 p-4">
            <Database className="text-cyan-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              3. Information We Collect
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Categories of information collected by Host-Age
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">

          We collect information necessary to provide secure,
          reliable, and efficient hosting services. The information
          collected depends on the services you use and how you
          interact with Host-Age.

        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-5">
              Account Information
            </h3>

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">

              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Company Name</li>
              <li>Billing Address</li>

            </ul>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-5">
              Billing Information
            </h3>

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">

              <li>Invoices</li>
              <li>Payment Status</li>
              <li>Transaction History</li>
              <li>Tax Details (where applicable)</li>

            </ul>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-5">
              Service Information
            </h3>

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">

              <li>Registered Domains</li>
              <li>Hosting Plans</li>
              <li>Business Email Accounts</li>
              <li>DNS Records</li>
              <li>SSL Certificates</li>

            </ul>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-5">
              Technical Information
            </h3>

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">

              <li>IP Address</li>
              <li>Browser Type</li>
              <li>Operating System</li>
              <li>Device Information</li>
              <li>Access Logs</li>

            </ul>

          </div>

        </div>

        <div className="mt-10 rounded-2xl bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 p-6">

          <h3 className="font-bold text-xl dark:text-white mb-4">
            Automatically Collected Information
          </h3>

          <p className="leading-8 text-slate-600 dark:text-slate-300">

            When you visit our website or use our services,
            Host-Age may automatically collect technical
            information such as IP address, browser type,
            device identifiers, operating system, pages
            visited, session duration, server logs,
            security events, and diagnostic information.
            This information helps improve service reliability,
            prevent fraud, maintain security, and enhance
            the overall user experience.

          </p>

        </div>

      </section>



      {/* SECTION 4 - LEGAL BASIS FOR PROCESSING */}


      <section
        id="legal"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-emerald-100 dark:bg-emerald-900 p-4">
            <Scale className="text-emerald-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              4. Legal Basis for Processing
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Why Host-Age is permitted to process your information
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">

          Host-Age processes personal information only when a valid legal
          basis exists. Depending on your location and the services you use,
          one or more of the following legal bases may apply.

        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-4">
              Contract Performance
            </h3>

            <p className="leading-7 text-slate-600 dark:text-slate-300">

              We process your information to create accounts,
              activate hosting, register domains,
              provide business email services,
              issue invoices,
              process renewals,
              and deliver customer support.

            </p>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-4">
              Legal Obligations
            </h3>

            <p className="leading-7 text-slate-600 dark:text-slate-300">

              We may retain invoices, payment records,
              tax information, fraud logs,
              abuse reports,
              and legal documentation where
              required by applicable law.

            </p>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-4">
              Legitimate Interests
            </h3>

            <p className="leading-7 text-slate-600 dark:text-slate-300">

              We process information to improve
              website performance,
              prevent fraud,
              detect abuse,
              monitor server health,
              protect our infrastructure,
              and improve customer experience.

            </p>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-xl dark:text-white mb-4">
              Your Consent
            </h3>

            <p className="leading-7 text-slate-600 dark:text-slate-300">

              Certain activities,
              including optional marketing emails,
              cookies,
              analytics,
              and promotional communications,
              are processed only with your consent,
              where required by law.

            </p>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* SECTION 5 - HOW WE USE YOUR INFORMATION */}
      {/* ====================================================== */}

      <section
        id="usage"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-blue-100 dark:bg-blue-900 p-4">
            <Server className="text-blue-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              5. How We Use Your Information
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Purposes for collecting and processing your information
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">

          Host-Age uses personal information only for legitimate business,
          operational, security, and legal purposes necessary to provide
          reliable hosting services.

        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              Account Management
            </h3>

            <ul className="space-y-3 list-disc ml-5 text-slate-600 dark:text-slate-300">
              <li>Create customer accounts</li>
              <li>Authenticate users</li>
              <li>Manage subscriptions</li>
              <li>Reset passwords</li>
              <li>Verify identities</li>
            </ul>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              Service Delivery
            </h3>

            <ul className="space-y-3 list-disc ml-5 text-slate-600 dark:text-slate-300">
              <li>Website hosting</li>
              <li>Domain registration</li>
              <li>Email hosting</li>
              <li>SSL activation</li>
              <li>DNS management</li>
            </ul>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              Billing & Payments
            </h3>

            <ul className="space-y-3 list-disc ml-5 text-slate-600 dark:text-slate-300">
              <li>Payment processing</li>
              <li>Invoice generation</li>
              <li>Renewal reminders</li>
              <li>Refund processing</li>
              <li>Tax compliance</li>
            </ul>

          </div>

          <div className="rounded-2xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              Security & Monitoring
            </h3>

            <ul className="space-y-3 list-disc ml-5 text-slate-600 dark:text-slate-300">
              <li>Fraud prevention</li>
              <li>Security monitoring</li>
              <li>Server diagnostics</li>
              <li>Threat detection</li>
              <li>Abuse prevention</li>
            </ul>

          </div>

        </div>

        <div className="mt-10 rounded-2xl bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 p-8">

          <h3 className="font-bold text-xl dark:text-white mb-5">
            Examples of How Your Information Helps Us
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <ul className="space-y-3 list-disc ml-5 text-slate-600 dark:text-slate-300">
                <li>Deploy your hosting account automatically</li>
                <li>Create business email mailboxes</li>
                <li>Register and renew domain names</li>
                <li>Send service notifications</li>
                <li>Provide technical support</li>
              </ul>
            </div>

            <div>
              <ul className="space-y-3 list-disc ml-5 text-slate-600 dark:text-slate-300">
                <li>Improve platform reliability</li>
                <li>Prevent spam and cyber attacks</li>
                <li>Generate invoices and payment receipts</li>
                <li>Monitor uptime and performance</li>
                <li>Meet legal and regulatory obligations</li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* NEXT: SECTION 6 - THIRD-PARTY SERVICES */}
      {/* ====================================================== */}
      {/* SECTION 6 - THIRD-PARTY SERVICES */}
      {/* ====================================================== */}

      <section
        id="third-party"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-violet-100 dark:bg-violet-900 p-4">
            <Globe className="text-violet-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              6. Third-Party Services
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Trusted providers that help us operate Host-Age
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">
          To provide secure and reliable hosting services, Host-Age works
          with carefully selected third-party providers. These providers
          only receive the information necessary to perform their services
          and are expected to protect your information appropriately.
        </p>

        <div className="overflow-x-auto rounded-2xl border dark:border-slate-700">

          <table className="w-full">

            <thead className="bg-slate-100 dark:bg-slate-800 text-white">

              <tr>

                <th className="text-black text-left p-4">Service</th>

                <th className="text-black text-left p-4">Purpose</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t dark:border-slate-700 text-white">
                <td className="text-black p-4">AWS Cloud</td>
                <td className="text-black p-4">Cloud Hosting Infrastructure</td>
              </tr>

              <tr className="border-t dark:border-slate-700 text-white">
                <td className="p-4 text-black">Domain Registrar</td>
                <td className="p-4 text-black">Domain Registration & Renewal</td>
              </tr>

              <tr className="border-t dark:border-slate-700 text-white">
                <td className="p-4 text-black">Payment Gateway</td>
                <td className="p-4 text-black">Payment Processing</td>
              </tr>

              <tr className="border-t dark:border-slate-700 text-black">
                <td className="p-4">Cloudflare</td>
                <td className="p-4">CDN, DNS & Security</td>
              </tr>

              <tr className="border-t dark:border-slate-700 text-black">
                <td className="p-4">Email Provider</td>
                <td className="p-4">Business Email Delivery</td>
              </tr>

            </tbody>

          </table>

        </div>

      </section>


      {/* SECTION 7 - COOKIES */}


      <section
        id="cookies"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-amber-100 dark:bg-amber-900 p-4">
            <Cookie className="text-amber-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              7. Cookies & Tracking Technologies
            </h2>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">

          Host-Age uses cookies and similar technologies to improve your
          browsing experience, remember preferences, maintain sessions,
          analyze traffic, and protect against fraud.

        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg mb-4 dark:text-white">
              Essential Cookies
            </h3>

            <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">

              <li>Login Sessions</li>

              <li>Security Tokens</li>

              <li>Shopping Cart</li>

              <li>User Authentication</li>

            </ul>

          </div>

          <div className="rounded-xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg mb-4 dark:text-white">
              Optional Cookies
            </h3>

            <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">

              <li>Analytics</li>

              <li>Marketing</li>

              <li>Performance Monitoring</li>

              <li>Website Preferences</li>

            </ul>

          </div>

        </div>

      </section>


      {/* SECTION 8 - PAYMENT SECURITY */}


      <section
        id="payments"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-green-100 dark:bg-green-900 p-4">
            <CreditCard className="text-green-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              8. Payment Security
            </h2>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300">

          Payments made through Host-Age are processed using secure,
          industry-standard payment gateways. We do not store your
          complete credit or debit card details on our servers. All
          payment transactions are encrypted using SSL/TLS technology
          and handled by trusted payment providers.

        </p>

        <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 p-6">

          <h3 className="font-bold text-lg dark:text-white mb-4">

            Security Measures

          </h3>

          <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">

            <li>Encrypted Payment Transactions</li>

            <li>SSL/TLS Protected Checkout</li>

            <li>Fraud Detection & Prevention</li>

            <li>Secure Invoice Generation</li>

            <li>Automatic Payment Verification</li>

          </ul>

        </div>

      </section>


      {/* SECTION 9 - SECURITY & DATA PROTECTION */}

      <section
        id="security"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <div className="flex items-center gap-4 mb-8">

          <div className="rounded-2xl bg-red-100 dark:bg-red-900 p-4">
            <Lock className="text-red-600" size={30} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              9. Security & Data Protection
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Protecting your information is our highest priority.
            </p>

          </div>

        </div>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">

          Host-Age implements administrative, technical,
          and physical safeguards designed to protect your
          personal information against unauthorized access,
          alteration, disclosure, or destruction.

        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-xl border dark:border-slate-700 p-6">
            <h3 className="font-bold text-lg dark:text-white mb-4">
              Infrastructure Security
            </h3>

            <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">
              <li>Enterprise Firewalls</li>
              <li>DDoS Protection</li>
              <li>Intrusion Detection</li>
              <li>24×7 Monitoring</li>
              <li>Encrypted Communications</li>
            </ul>

          </div>

          <div className="rounded-xl border dark:border-slate-700 p-6">

            <h3 className="font-bold text-lg dark:text-white mb-4">
              Account Protection
            </h3>

            <ul className="list-disc ml-5 space-y-2 text-slate-600 dark:text-slate-300">

              <li>Strong Passwords</li>
              <li>Two-Factor Authentication</li>
              <li>Login Notifications</li>
              <li>Access Control</li>
              <li>Regular Security Audits</li>

            </ul>

          </div>

        </div>

      </section>


      {/* SECTION 10 - DATA RETENTION */}

      <section
        id="retention"
        className="rounded-3xl text-white bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <h2 className="  text-3xl font-bold dark:text-white mb-8">
          10. Data Retention
        </h2>

        <p className="leading-8 text-slate-600 dark:text-slate-300 mb-8">

          Host-Age retains personal information only as long
          as necessary to provide services, comply with legal
          obligations, resolve disputes, and enforce agreements.

        </p>

        <div className="overflow-x-auto rounded-xl border text-white dark:border-slate-700">

          <table className="w-full">

            <thead className="bg-slate-100 dark:bg-slate-800">

              <tr>

                <th className="p-4 text-black text-left">Data Type</th>

                <th className="p-4 text-black text-left">Retention Period</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t text-black dark:border-slate-700">

                <td className="p-4">Customer Account</td>

                <td className="p-4">Until Account Closure</td>

              </tr>

              <tr className="border-t text-black dark:border-slate-700">

                <td className="p-4">Invoices</td>

                <td className="p-4">Up to 7 Years</td>

              </tr>

              <tr className="border-t text-black dark:border-slate-700">

                <td className="p-4">Support Tickets</td>

                <td className="p-4">3 Years</td>

              </tr>

              <tr className="border-t text-black dark:border-slate-700">

                <td className="p-4">Server Logs</td>

                <td className="p-4">12 Months</td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>


      {/* SECTION 11 - YOUR RIGHTS */}


      <section
        id="rights"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <h2 className="text-3xl font-bold dark:text-white mb-8">
          11. Your Privacy Rights
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="rounded-xl border dark:border-slate-700 p-6">

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">

              <li>Access your personal information</li>

              <li>Update inaccurate information</li>

              <li>Delete eligible personal data</li>

              <li>Download your account data</li>

              <li>Withdraw consent where applicable</li>

            </ul>

          </div>

          <div className="rounded-xl border dark:border-slate-700 p-6">

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">

              <li>Object to certain processing</li>

              <li>Request restriction of processing</li>

              <li>Manage marketing preferences</li>

              <li>Contact our Privacy Team</li>

              <li>File complaints where permitted</li>

            </ul>

          </div>

        </div>

      </section>

      {/* SECTION 12 - CHILDREN'S PRIVACY */}


      <section
        id="children"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <h2 className="text-3xl font-bold dark:text-white mb-6">
          12. Children's Privacy
        </h2>

        <p className="leading-8 text-slate-600 dark:text-slate-300">

          Host-Age services are intended for individuals and
          businesses capable of entering into legally binding
          agreements. We do not knowingly collect personal
          information from children where prohibited by
          applicable law.

        </p>

      </section>


      {/* SECTION 13 - CHANGES TO THIS POLICY */}


      <section
        id="updates"
        className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-10 mb-10"
      >

        <h2 className="text-3xl font-bold dark:text-white mb-6">
          13. Changes to This Policy
        </h2>

        <p className="leading-8 text-slate-600 dark:text-slate-300">

          We may revise this Privacy Policy from time to time.
          Material changes will be posted on this page together
          with an updated revision date. Continued use of
          Host-Age services after such changes constitutes
          acceptance of the updated policy.

        </p>

      </section>




      {/* SECTION 14 - CONTACT US */}

      <section
        id="contact"
        className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 text-white p-10"
      >
        <div className="flex items-center gap-4 mb-8">
          <Mail size={34} />

          <h2 className="text-3xl font-bold">
            14. Contact Us
          </h2>
        </div>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Host-Age Privacy Team</strong>
          </p>

          <p>Email: support@host-age.in</p>

          <p>Website: https://host-age.in</p>

          <p>Support: support@host-age.in</p>
        </div>
      </section>
      {/* Footer */}
      <li></li>
      <footer className="bg-[#074476] ">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

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

          {/*{isOpen && (
            <ChatBot
              onClose={() => setIsOpen(false)}
            />
          )} */}




        </div>

      </footer>


      {/* END MAIN CONTENT */}
    </div>

  )

};
