import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

import {
    ShieldCheck,
    FileText,
    UserCheck,
    Server,
    Globe,
    Mail,
    CreditCard,
    Lock,
    Scale,
    RefreshCw,
    AlertTriangle,
    Building2,
    Receipt,
    Code2,
    Database,
    ArrowUp,
    ChevronRight,
} from "lucide-react";

export default function TermsAndConditions() {
    const sections = [
        { id: "introduction", title: "Introduction" },
        { id: "definitions", title: "Definitions" },
        { id: "acceptance", title: "Acceptance of Terms" },
        { id: "eligibility", title: "Eligibility" },
        { id: "account", title: "Account Registration" },
        { id: "managed-hosting", title: "Managed Hosting" },
        { id: "no-cpanel", title: "No cPanel Access" },
        { id: "website-management", title: "Website Management" },
        { id: "modification", title: "Website Modification Policy" },
        { id: "additional-charges", title: "Additional Charges" },
        { id: "domain", title: "Domain Registration" },
        { id: "email", title: "Business Email Services" },
        { id: "ssl", title: "SSL Certificates" },
        { id: "payment", title: "Payment Terms" },
        { id: "refund", title: "Refund and Cancellation" },
        { id: "acceptable-use", title: "Acceptable Use Policy" },
        { id: "privacy", title: "Privacy and Data Protection" },
        { id: "liability", title: "Limitation of Liability" },
        { id: "governing-law", title: "Governing Law" },
        { id: "contact", title: "Contact Information" },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* =========================================================
          HERO
      ========================================================== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600 py-24">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-400 blur-3xl" />
                    <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-500 blur-3xl" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="max-w-4xl">
                        <span className="inline-flex items-center rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-200 border border-cyan-400/30">
                            <ShieldCheck className="w-4 h-4 mr-2" />
                            Legal & Service Agreement
                        </span>

                        <h1 className="mt-8 text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                            Terms & Conditions
                        </h1>

                        <p className="mt-6 text-xl leading-9 text-slate-200">
                            These Terms and Conditions govern your access to and use of
                            Host-Age websites, hosting services, domain registration,
                            business email services, website management solutions, and
                            related products and services.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">
                            <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 border border-white/20">
                                <p className="text-sm text-slate-300">Effective Date</p>
                                <p className="text-white font-semibold">
                                    August 29, 2026
                                </p>
                            </div>

                            <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 border border-white/20">
                                <p className="text-sm text-slate-300">Last Updated</p>
                                <p className="text-white font-semibold">
                                    August 29, 2026
                                </p>
                            </div>

                            <div className="rounded-xl bg-white/10 backdrop-blur px-5 py-4 border border-white/20">
                                <p className="text-sm text-slate-300">Version</p>
                                <p className="text-white font-semibold">1.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================================
          CONTENT
      ========================================================== */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid lg:grid-cols-4 gap-10">
                    {/* =====================================================
              SIDEBAR / TABLE OF CONTENTS
          ====================================================== */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-24 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Table of Contents
                            </h3>

                            <ul className="mt-8 space-y-3 text-sm">
                                {sections.map((section, index) => (
                                    <li key={section.id}>
                                        <a
                                            href={`#${section.id}`}
                                            className="flex items-start gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition"
                                        >
                                            <ChevronRight
                                                size={16}
                                                className="mt-0.5 shrink-0"
                                            />
                                            <span>
                                                {index + 1}. {section.title}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* =====================================================
              MAIN CONTENT
          ====================================================== */}
                    <main className="lg:col-span-3">
                        {/* =================================================
                1. INTRODUCTION
            ================================================== */}
                        <section
                            id="introduction"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<ShieldCheck className="text-cyan-600" size={30} />}
                                iconBg="bg-cyan-100 dark:bg-cyan-900"
                                title="1. Introduction"
                                subtitle="Welcome to Host-Age"
                            />

                            <div className={contentText}>
                                <p>
                                    Welcome to <strong>Host-Age</strong>. These Terms and
                                    Conditions ("Terms") govern your access to and use of our
                                    website, hosting services, domain registration, business
                                    email services, website management solutions, and all
                                    related products and services provided by Host-Age.
                                </p>

                                <p>
                                    By accessing our website, creating an account, purchasing
                                    any service, or using any Host-Age product, you agree to
                                    comply with these Terms and Conditions. These Terms
                                    constitute a legally binding agreement between you
                                    ("Customer", "User", or "You") and Host-Age
                                    ("Host-Age", "We", "Our", or "Us").
                                </p>

                                <p>
                                    If you do not agree with any part of these Terms, you must
                                    not use our services.
                                </p>

                                <p>
                                    Host-Age reserves the right to update, modify, or replace
                                    these Terms at any time. Any changes will become effective
                                    upon publication on our website unless otherwise stated.
                                    Continued use of our services after such changes
                                    constitutes your acceptance of the revised Terms.
                                </p>

                                <InfoBox>
                                    By using Host-Age services, you acknowledge that you have
                                    read, understood, and agreed to these Terms and Conditions.
                                </InfoBox>
                            </div>
                        </section>

                        {/* =================================================
                2. DEFINITIONS
            ================================================== */}
                        <section
                            id="definitions"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<FileText className="text-blue-600" size={30} />}
                                iconBg="bg-blue-100 dark:bg-blue-900"
                                title="2. Definitions"
                                subtitle="Meaning of important terms"
                            />

                            <div className="space-y-5">
                                <Definition
                                    term="Host-Age"
                                    description="refers to the company providing web hosting, domain registration, website management, business email services, cloud hosting, and related online services."
                                />

                                <Definition
                                    term="Customer, User, You, or Your"
                                    description="refers to any individual, business, or organization that registers for, purchases, or uses Host-Age services."
                                />

                                <Definition
                                    term="Account"
                                    description="means the registered customer account created on the Host-Age website to manage purchased services."
                                />

                                <Definition
                                    term="Services"
                                    description="include all products and solutions offered by Host-Age, including but not limited to web hosting, VPS hosting, domain registration, SSL certificates, business email hosting, website management, technical support, backups, and related services."
                                />

                                <Definition
                                    term="Website"
                                    description="refers to the official Host-Age website, customer dashboard, and associated online platforms."
                                />

                                <Definition
                                    term="Content"
                                    description="means all files, data, images, videos, text, software, databases, emails, or other materials uploaded, stored, transmitted, or managed using Host-Age services."
                                />

                                <Definition
                                    term="Domain Name"
                                    description="means the internet domain registered or managed through Host-Age or a third-party registrar."
                                />

                                <Definition
                                    term="Business Email"
                                    description="means email accounts created or managed under a customer's registered domain name."
                                />

                                <Definition
                                    term="Hosting Plan"
                                    description="refers to the package selected by the customer, including the allocated storage, bandwidth, email accounts, website pages, and other resources."
                                />
                            </div>
                        </section>

                        {/* =================================================
                3. ACCEPTANCE
            ================================================== */}
                        <section
                            id="acceptance"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<UserCheck className="text-emerald-600" size={30} />}
                                iconBg="bg-emerald-100 dark:bg-emerald-900"
                                title="3. Acceptance of Terms"
                                subtitle="Agreement to these Terms"
                            />

                            <div className={contentText}>
                                <p>
                                    By registering an account, purchasing a hosting plan,
                                    registering a domain name, or using any Host-Age service,
                                    you acknowledge that you have read, understood, and agreed
                                    to be legally bound by these Terms and Conditions.
                                </p>

                                <p>
                                    You further agree to comply with all applicable local,
                                    national, and international laws, regulations, and policies
                                    while using Host-Age services.
                                </p>

                                <p>
                                    If you do not agree with these Terms, you must immediately
                                    discontinue the use of our website and services.
                                </p>

                                <p>
                                    Host-Age reserves the right to suspend or terminate access
                                    to any service if these Terms are violated.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                4. ELIGIBILITY
            ================================================== */}
                        <section
                            id="eligibility"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<UserCheck className="text-violet-600" size={30} />}
                                iconBg="bg-violet-100 dark:bg-violet-900"
                                title="4. Eligibility"
                                subtitle="Requirements for using Host-Age services"
                            />

                            <div className={contentText}>
                                <p>
                                    To use Host-Age services, you must meet the following
                                    eligibility requirements:
                                </p>

                                <BulletList
                                    items={[
                                        "You must be at least 18 years of age or have reached the legal age required to enter into binding contracts in your jurisdiction.",
                                        "You must provide complete, accurate, and up-to-date registration information.",
                                        "You must have the legal authority to purchase and use the requested services.",
                                        "You must not use Host-Age services for any unlawful, fraudulent, abusive, or prohibited activities.",
                                        "You agree to maintain accurate billing and contact information throughout the duration of your account.",
                                    ]}
                                />

                                <p>
                                    Host-Age reserves the right to refuse, suspend, or terminate
                                    services if any eligibility requirements are not met.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                5. ACCOUNT REGISTRATION
            ================================================== */}
                        <section
                            id="account"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Building2 className="text-cyan-600" size={30} />}
                                iconBg="bg-cyan-100 dark:bg-cyan-900"
                                title="5. Account Registration"
                                subtitle="Creating and maintaining your account"
                            />

                            <div className={contentText}>
                                <p>
                                    To access certain Host-Age services, customers are required
                                    to create a registered account.
                                </p>

                                <p>
                                    During registration, customers must provide accurate and
                                    complete information, including their full name, email
                                    address, phone number, and any other information requested
                                    during the registration process.
                                </p>

                                <p>
                                    Customers are responsible for maintaining the
                                    confidentiality of their account credentials, including
                                    usernames and passwords.
                                </p>

                                <p>You agree to:</p>

                                <BulletList
                                    items={[
                                        "Keep your account information accurate and up to date.",
                                        "Protect your login credentials from unauthorized access.",
                                        "Notify Host-Age immediately if you suspect unauthorized use of your account.",
                                        "Accept responsibility for activities performed using your account, subject to applicable law.",
                                    ]}
                                />

                                <p>
                                    Host-Age may require identity verification, including email
                                    verification, phone verification using OTP, or additional
                                    documentation before activating certain services.
                                </p>

                                <p>
                                    Host-Age reserves the right to suspend, restrict, or
                                    permanently terminate accounts that contain false
                                    information, violate these Terms, or are involved in
                                    suspicious, fraudulent, or illegal activities.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                6. MANAGED HOSTING
            ================================================== */}
                        <section
                            id="managed-hosting"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Server className="text-blue-600" size={30} />}
                                iconBg="bg-blue-100 dark:bg-blue-900"
                                title="6. Managed Hosting"
                                subtitle="Managed infrastructure and hosting responsibilities"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age provides managed hosting services designed to
                                    simplify website management for customers.
                                </p>

                                <p>
                                    Under managed hosting, Host-Age is responsible for
                                    maintaining the hosting environment, including server
                                    monitoring, security updates, software maintenance, and
                                    infrastructure management.
                                </p>

                                <p>
                                    Customers are responsible for managing their website
                                    content, applications, and ensuring compliance with these
                                    Terms.
                                </p>

                                <p>
                                    The features included in managed hosting may vary depending
                                    on the selected hosting plan.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                7. NO CPANEL
            ================================================== */}
                        <section
                            id="no-cpanel"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Lock className="text-red-600" size={30} />}
                                iconBg="bg-red-100 dark:bg-red-900"
                                title="7. No cPanel Access"
                                subtitle="Managed hosting administration"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age operates as a managed hosting provider. Unless
                                    specifically stated in the purchased hosting plan,
                                    customers will not receive direct access to cPanel, WHM,
                                    root access, SSH access, or any other server administration
                                    interface.
                                </p>

                                <p>
                                    All hosting-related tasks, including website deployment,
                                    email creation, SSL installation, DNS configuration,
                                    backups, and technical changes, will be performed by the
                                    Host-Age support team upon request.
                                </p>

                                <InfoBox>
                                    Requests that fall outside the scope of the purchased plan
                                    may be subject to additional service charges.
                                </InfoBox>
                            </div>
                        </section>

                        {/* =================================================
                8. WEBSITE MANAGEMENT
            ================================================== */}
                        <section
                            id="website-management"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Globe className="text-violet-600" size={30} />}
                                iconBg="bg-violet-100 dark:bg-violet-900"
                                title="8. Website Management"
                                subtitle="Website maintenance and management services"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age may provide Website Management Services as part of
                                    selected hosting plans or as an optional paid service.
                                </p>

                                <p>Website Management may include:</p>

                                <BulletList
                                    items={[
                                        "Website deployment and configuration.",
                                        "Performance optimization.",
                                        "Security monitoring.",
                                        "Malware scanning and basic malware removal.",
                                        "SSL certificate installation and renewal.",
                                        "Cache optimization.",
                                        "CDN configuration, where applicable.",
                                        "Routine software updates.",
                                        "Website health monitoring.",
                                        "Basic technical support.",
                                    ]}
                                />

                                <p>
                                    The availability and scope of Website Management Services
                                    depend on the customer's selected hosting plan.
                                </p>

                                <p>
                                    Host-Age reserves the right to modify or discontinue any
                                    management feature with prior notice where required.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                9. WEBSITE MODIFICATION
            ================================================== */}
                        <section
                            id="modification"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Code2 className="text-cyan-600" size={30} />}
                                iconBg="bg-cyan-100 dark:bg-cyan-900"
                                title="9. Website Modification Policy"
                                subtitle="Minor and major website changes"
                            />

                            <div className={contentText}>
                                <p>
                                    After a website has been deployed, customers may request
                                    modifications or updates.
                                </p>

                                <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <PolicyCard
                                        title="Minor Changes"
                                        items={[
                                            "Text updates.",
                                            "Image replacements.",
                                            "Contact information changes.",
                                            "Basic content edits.",
                                            "Small layout adjustments.",
                                        ]}
                                    />

                                    <PolicyCard
                                        title="Major Changes"
                                        items={[
                                            "New website pages.",
                                            "Custom functionality.",
                                            "API integrations.",
                                            "Database modifications.",
                                            "Design redesigns.",
                                            "E-commerce features.",
                                            "Plugin installations.",
                                            "Custom coding.",
                                            "SEO implementation.",
                                            "Third-party integrations.",
                                        ]}
                                    />
                                </div>

                                <p className="mt-8">
                                    Host-Age will review each request and determine whether it
                                    is covered under the customer's hosting or maintenance
                                    plan.
                                </p>

                                <p>
                                    Any work outside the agreed scope may require a separate
                                    quotation and customer approval before commencement.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                10. ADDITIONAL CHARGES
            ================================================== */}
                        <section
                            id="additional-charges"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Receipt className="text-amber-600" size={30} />}
                                iconBg="bg-amber-100 dark:bg-amber-900"
                                title="10. Additional Charges"
                                subtitle="Services outside standard plan limits"
                            />

                            <div className={contentText}>
                                <p>
                                    Certain services are not included within the standard
                                    hosting plans and may require additional payment.
                                </p>

                                <p>Additional charges may apply for, but are not limited to:</p>

                                <BulletList
                                    items={[
                                        "Additional website pages.",
                                        "Additional business email accounts.",
                                        "Website redesign.",
                                        "Custom development.",
                                        "Plugin installation.",
                                        "API integration.",
                                        "Database modifications.",
                                        "Website migration from third-party providers.",
                                        "Content updates.",
                                        "Emergency technical support.",
                                        "Website recovery services.",
                                        "Premium SSL certificates.",
                                        "Additional storage or bandwidth.",
                                        "Domain renewals and transfers.",
                                        "Third-party software licensing.",
                                        "Payment gateway integration.",
                                        "Graphic design services.",
                                        "SEO and digital marketing services.",
                                    ]}
                                />

                                <InfoBox>
                                    Host-Age will provide a quotation for any billable service
                                    before work begins. No additional work will be performed
                                    until the customer approves the quotation and any required
                                    payment has been received.
                                </InfoBox>
                            </div>
                        </section>

                        {/* =================================================
                11. DOMAIN
            ================================================== */}
                        <section
                            id="domain"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Globe className="text-blue-600" size={30} />}
                                iconBg="bg-blue-100 dark:bg-blue-900"
                                title="11. Domain Registration"
                                subtitle="Registration, transfer and renewal"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age may provide domain registration, transfer, renewal,
                                    and management services either directly or through
                                    accredited third-party domain registrars.
                                </p>

                                <p>
                                    Domain registrations are subject to the policies, rules,
                                    regulations, and requirements of the respective domain
                                    registry and registrar.
                                </p>

                                <p>
                                    Customers are responsible for providing accurate registrant
                                    information and ensuring that their domain registration
                                    details remain current.
                                </p>

                                <p>
                                    Host-Age is not responsible for the loss of a domain due to
                                    inaccurate information, failure to renew, or violations of
                                    registry policies.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                12. BUSINESS EMAIL
            ================================================== */}
                        <section
                            id="email"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Mail className="text-cyan-600" size={30} />}
                                iconBg="bg-cyan-100 dark:bg-cyan-900"
                                title="12. Business Email Services"
                                subtitle="Business email usage and responsibilities"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age provides business email services according to the
                                    features included in the customer's selected hosting plan.
                                </p>

                                <p>
                                    The number of email accounts, mailbox storage, and related
                                    features may vary by plan.
                                </p>

                                <p>
                                    Customers are responsible for maintaining the security of
                                    their email accounts and must not use the service to send
                                    spam, phishing emails, or any unlawful communications.
                                </p>

                                <p>
                                    Additional email accounts beyond the plan limits may
                                    require additional recurring charges.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                13. SSL
            ================================================== */}
                        <section
                            id="ssl"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Lock className="text-emerald-600" size={30} />}
                                iconBg="bg-emerald-100 dark:bg-emerald-900"
                                title="13. SSL Certificates"
                                subtitle="SSL certificate services"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age may provide free or paid SSL Certificates
                                    depending on the selected hosting plan.
                                </p>

                                <p>
                                    SSL Certificates help encrypt communication between a
                                    website and its visitors to improve security.
                                </p>

                                <p>
                                    Customers are responsible for ensuring that their domain
                                    and DNS settings are correctly configured for SSL
                                    installation.
                                </p>

                                <p>
                                    Host-Age is not responsible for delays caused by
                                    third-party Certificate Authorities or incorrect customer
                                    configurations.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                14. PAYMENT
            ================================================== */}
                        <section
                            id="payment"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<CreditCard className="text-green-600" size={30} />}
                                iconBg="bg-green-100 dark:bg-green-900"
                                title="14. Payment Terms"
                                subtitle="Payments, activation and billing"
                            />

                            <div className={contentText}>
                                <p>
                                    Customers agree to pay all applicable fees for the
                                    services they purchase.
                                </p>

                                <p>
                                    Payments must be made using the payment methods accepted by
                                    Host-Age.
                                </p>

                                <p>
                                    Services may not be activated until payment has been
                                    successfully received and verified.
                                </p>

                                <p>
                                    Additional charges such as taxes, payment gateway fees,
                                    domain registration fees, or optional service fees may apply
                                    where applicable.
                                </p>

                                <p>
                                    Failure to make timely payments may result in service
                                    suspension, cancellation, or non-renewal.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                15. REFUND
            ================================================== */}
                        <section
                            id="refund"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<RefreshCw className="text-orange-600" size={30} />}
                                iconBg="bg-orange-100 dark:bg-orange-900"
                                title="15. Refund and Cancellation"
                                subtitle="Cancellation and refund conditions"
                            />

                            <div className={contentText}>
                                <p>
                                    Customers may request cancellation of their services at any
                                    time through their Host-Age account or by contacting
                                    Customer Support.
                                </p>

                                <p>
                                    Unless otherwise stated under a specific promotional offer
                                    or Money-Back Guarantee, payments made for domain
                                    registrations, domain renewals, SSL certificates, setup
                                    fees, activated hosting services, website development
                                    services, and other non-refundable services shall not be
                                    eligible for refunds.
                                </p>

                                <p>
                                    Cancellation of a service does not automatically cancel
                                    future recurring subscriptions unless specifically
                                    requested by the customer.
                                </p>

                                <InfoBox>
                                    Any applicable refund eligibility may also depend on the
                                    specific service plan, promotional offer, payment provider,
                                    domain registry, or applicable law.
                                </InfoBox>
                            </div>
                        </section>

                        {/* =================================================
                16. ACCEPTABLE USE
            ================================================== */}
                        <section
                            id="acceptable-use"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<AlertTriangle className="text-red-600" size={30} />}
                                iconBg="bg-red-100 dark:bg-red-900"
                                title="16. Acceptable Use Policy"
                                subtitle="Prohibited activities"
                            />

                            <div className={contentText}>
                                <p>
                                    Customers agree to use Host-Age services only for lawful
                                    purposes and in accordance with these Terms.
                                </p>

                                <p>The following activities are strictly prohibited:</p>

                                <BulletList
                                    items={[
                                        "Hosting illegal or copyrighted content without authorization.",
                                        "Sending spam, phishing emails, or fraudulent communications.",
                                        "Distributing malware, ransomware, viruses, or malicious software.",
                                        "Attempting unauthorized access to servers, networks, or customer accounts.",
                                        "Conducting denial-of-service (DDoS) attacks or other activities that disrupt services.",
                                        "Using Host-Age services for illegal, abusive, or fraudulent purposes.",
                                    ]}
                                />

                                <div className="mt-8 rounded-2xl border-l-4 border-red-500 bg-red-50 dark:bg-red-950 p-6">
                                    <h4 className="font-semibold text-lg text-slate-900 dark:text-white mb-3">
                                        Enforcement
                                    </h4>

                                    <p className="text-slate-600 dark:text-slate-300 leading-8">
                                        Host-Age reserves the right to suspend or terminate any
                                        account found to be in violation of this policy without
                                        prior notice where permitted by applicable law.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* =================================================
                17. PRIVACY
            ================================================== */}
                        <section
                            id="privacy"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Database className="text-cyan-600" size={30} />}
                                iconBg="bg-cyan-100 dark:bg-cyan-900"
                                title="17. Privacy and Data Protection"
                                subtitle="Protection of customer information"
                            />

                            <div className={contentText}>
                                <p>
                                    Host-Age respects customer privacy and is committed to
                                    protecting personal information.
                                </p>

                                <p>
                                    Customer information is collected, processed, stored, and
                                    used for purposes including providing services, processing
                                    payments, improving customer experience, maintaining
                                    security, and complying with applicable legal obligations.
                                </p>

                                <p>
                                    Host-Age implements reasonable administrative, technical,
                                    and security measures designed to protect customer data
                                    from unauthorized access, disclosure, alteration, or
                                    destruction.
                                </p>

                                <InfoBox>
                                    Customers are encouraged to review our{" "}
                                    <Link
                                        to="/privacy-policy"
                                        className="font-semibold text-cyan-700 dark:text-cyan-400 hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>{" "}
                                    for additional information regarding data collection,
                                    processing, storage, and privacy practices.
                                </InfoBox>
                            </div>
                        </section>

                        {/* =================================================
                18. LIMITATION OF LIABILITY
            ================================================== */}
                        <section
                            id="liability"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Scale className="text-violet-600" size={30} />}
                                iconBg="bg-violet-100 dark:bg-violet-900"
                                title="18. Limitation of Liability"
                                subtitle="Limits of responsibility"
                            />

                            <div className={contentText}>
                                <p>
                                    To the maximum extent permitted by applicable law,
                                    Host-Age shall not be liable for any indirect, incidental,
                                    consequential, special, or punitive damages arising from or
                                    relating to the use or inability to use its services.
                                </p>

                                <p>This includes, but is not limited to:</p>

                                <BulletList
                                    items={[
                                        "Loss of profits.",
                                        "Business interruption.",
                                        "Data loss.",
                                        "Reputational damage.",
                                        "Service outages.",
                                        "Cyberattacks.",
                                        "Third-party failures.",
                                        "Customer negligence.",
                                    ]}
                                />

                                <p>
                                    Customers acknowledge that the use of hosting services is
                                    subject to the limitations and risks associated with
                                    internet-based services.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                19. GOVERNING LAW
            ================================================== */}
                        <section
                            id="governing-law"
                            className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10"
                        >
                            <SectionHeader
                                icon={<Scale className="text-blue-600" size={30} />}
                                iconBg="bg-blue-100 dark:bg-blue-900"
                                title="19. Governing Law"
                                subtitle="Applicable law and jurisdiction"
                            />

                            <div className={contentText}>
                                <p>
                                    These Terms and Conditions shall be governed by and
                                    interpreted in accordance with the laws of the Republic of
                                    India.
                                </p>

                                <p>
                                    Any disputes arising out of or relating to these Terms or
                                    the use of Host-Age services shall be subject to the
                                    exclusive jurisdiction of the competent courts located in
                                    the city or state where Host-Age maintains its principal
                                    place of business, unless otherwise required by applicable
                                    law.
                                </p>
                            </div>
                        </section>

                        {/* =================================================
                20. CONTACT
            ================================================== */}
                        <section
                            id="contact"
                            className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-700 text-white p-8 md:p-10 mb-10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="rounded-2xl bg-white/10 p-4">
                                    <Mail size={34} />
                                </div>

                                <div>
                                    <h2 className="text-3xl font-bold">
                                        20. Contact Information
                                    </h2>

                                    <p className="text-slate-300 mt-1">
                                        Contact Host-Age regarding these Terms
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 text-lg leading-8">
                                <p>
                                    For questions, complaints, technical assistance, or legal
                                    inquiries regarding these Terms and Conditions or any
                                    Host-Age services, customers may contact Host-Age through
                                    the official communication channels provided on the
                                    Host-Age website.
                                </p>

                                <p className="font-semibold">
                                    Customers may contact us using:
                                </p>

                                <ul className="list-disc ml-6 space-y-3 text-slate-200">
                                    <li>Customer Support Portal</li>
                                    <li>Live Chat</li>
                                    <li>Support Email</li>
                                    <li>Business Email</li>
                                    <li>Telephone, if available</li>
                                    <li>Official Website Contact Form</li>
                                </ul>

                                <div className="pt-4 border-t border-white/20">
                                    <p>
                                        <strong>Host-Age Support</strong>
                                    </p>

                                    <p>support@host-age.in</p>

                                    <p>https://host-age.in</p>
                                </div>
                            </div>
                        </section>

                        {/* =================================================
                RELATED POLICIES
            ================================================== */}
                        <section className="rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 mb-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="rounded-2xl bg-cyan-100 dark:bg-cyan-900 p-4">
                                    <FileText className="text-cyan-600" size={30} />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Related Legal Documents
                                    </h2>

                                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                                        Review our other policies
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-5">
                                <Link
                                    to="/privacy-policy"
                                    className="group rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-cyan-400 hover:shadow-lg transition"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                                Privacy Policy
                                            </h3>

                                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                                Learn how Host-Age collects, uses, and protects
                                                personal information.
                                            </p>
                                        </div>

                                        <ChevronRight className="text-cyan-600 group-hover:translate-x-1 transition" />
                                    </div>
                                </Link>

                                <Link
                                    to="/terms-and-conditions"
                                    className="group rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-cyan-400 hover:shadow-lg transition"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                                                Terms & Conditions
                                            </h3>

                                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                                Review the terms governing Host-Age services.
                                            </p>
                                        </div>

                                        <ChevronRight className="text-cyan-600 group-hover:translate-x-1 transition" />
                                    </div>
                                </Link>
                            </div>
                        </section>

                        {/* =================================================
                LAST UPDATED
            ================================================== */}
                        <div className="text-center py-6">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Terms & Conditions — Version 1.0
                            </p>

                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                Last Updated: August 29, 2026
                            </p>
                        </div>
                    </main>
                </div>
            </div>

            {/* =========================================================
          BACK TO TOP
      ========================================================== */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 hover:scale-110 transition-all"
            >
                <ArrowUp size={22} />
            </button>

            {/* =========================================================
          FOOTER
      ========================================================== */}
            <footer className="bg-[#074476]">
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Brand */}
                        <div>
                            <h3 className="text-white text-xl font-bold">
                                Host-Age
                            </h3>

                            <p className="mt-3 text-white">
                                Professional email and Host-Age domain management platform
                                for businesses and creators.
                            </p>

                            <div className="flex items-center gap-4 mt-6">
                                <a
                                    href="https://www.linkedin.com/in/YOUR_USERNAME"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 transition-all duration-300"
                                >
                                    <FaLinkedinIn className="h-5 w-5 text-white" />
                                </a>

                                <a
                                    href="https://www.instagram.com/YOUR_USERNAME"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-pink-600 transition-all duration-300"
                                >
                                    <FaInstagram className="h-5 w-5 text-white" />
                                </a>

                                <a
                                    href="https://www.facebook.com/YOUR_USERNAME"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] transition-all duration-300 hover:scale-110"
                                >
                                    <FaFacebookF className="text-white text-lg" />
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-white text-xl font-bold mb-4">
                                Services
                            </h4>

                            <ul className="space-y-2 text-white">
                                <li>
                                    <Link
                                        to="/about"
                                        className="hover:text-lime-400 transition"
                                    >
                                        Services
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/features"
                                        className="hover:text-lime-400 transition"
                                    >
                                        Features
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/contact"
                                        className="hover:text-lime-400 transition"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Plans */}
                        <div>
                            <h4 className="text-white text-xl font-bold mb-4">
                                Plans
                            </h4>

                            <ul className="space-y-2 text-white">
                                <li>
                                    <Link
                                        to="/pricing"
                                        className="hover:text-lime-400 transition"
                                    >
                                        Basic Plan
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/pricing"
                                        className="hover:text-lime-400 transition"
                                    >
                                        Pro Plan
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/pricing"
                                        className="hover:text-lime-400 transition"
                                    >
                                        Enterprise
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Location */}
                        <div>
                            <h4 className="text-xl text-white font-bold mb-4">
                                Location
                            </h4>

                            <p className="text-white">
                                Mumbai, Maharashtra
                            </p>

                            <p className="text-white">
                                India
                            </p>

                            <p className="text-white mt-2">
                                support@host-age.in
                            </p>
                        </div>
                    </div>

                    {/* Bottom Footer */}
                    <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
                        <p className="text-center md:text-left">
                            © 2026 Host-Age. All rights reserved.
                        </p>

                        <div className="flex items-center gap-6">
                            <Link
                                to="/privacy-policy"
                                className="hover:text-cyan-300 transition-colors"
                            >
                                Privacy Policy
                            </Link>


                        </div>
                        <Link
                            to="/terms-and-conditions"
                            className="hover:text-cyan-300 transition-colors"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ================================================================
   REUSABLE COMPONENTS
================================================================ */

const contentText =
    "space-y-6 text-slate-600 dark:text-slate-300 leading-8";

function SectionHeader({
    icon,
    iconBg = "bg-cyan-100 dark:bg-cyan-900",
    title,
    subtitle,
}) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className={`rounded-2xl ${iconBg} p-4`}>
                {icon}
            </div>

            <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {title}
                </h2>

                {subtitle && (
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
}

function BulletList({ items }) {
    return (
        <ul className="list-disc ml-6 space-y-3 text-slate-600 dark:text-slate-300">
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}

function Definition({ term, description }) {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
                {term}
            </h3>

            <p className="leading-8 text-slate-600 dark:text-slate-300">
                {description}
            </p>
        </div>
    );
}

function PolicyCard({ title, items }) {
    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-5">
                {title}
            </h3>

            <ul className="list-disc ml-5 space-y-3 text-slate-600 dark:text-slate-300">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

function InfoBox({ children }) {
    return (
        <div className="rounded-2xl border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-950 p-6">
            <p className="text-slate-700 dark:text-slate-300 leading-8">
                {children}
            </p>
        </div>
    );
}