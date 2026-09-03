import { useState } from "react";
import { CheckCircle2, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import StepIndicator from "./components/StepIndicator";
import DomainStep from "./components/DomainStep";
import WebsiteSourceStep from "./components/WebsiteSourceStep";
import ConfigurationStep from "./components/ConfigurationStep";
import ReviewStep from "./components/ReviewStep";
import ThemeToggle from "../../components/ThemeToggle";

import { uploadDomain } from "../../services/domainService";

export default function AddDomainPages() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [domain, setDomain] =
    useState("");

  const [websiteSource, setWebsiteSource] =
    useState("");

  const [websiteUrl, setWebsiteUrl] =
    useState("");

  const [githubUrl, setGithubUrl] =
    useState("");

  const [websiteFile, setWebsiteFile] =
    useState(null);

  const [pages, setPages] =
    useState([]);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);
    
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);


  const handleDomainNext = (
    normalizedDomain
  ) => {
    setDomain(normalizedDomain);
    setError("");
    setStep(2);
  };

  const handleSourceNext = () => {
    setError("");
    setStep(3);
  };

  const handleConfigurationNext = () => {
    setError("");
    setStep(4);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await uploadDomain({
          domain,
          websiteSource,
          websiteUrl:
            websiteSource === "url"
              ? websiteUrl
              : "",
          githubUrl:
            websiteSource === "github"
              ? githubUrl
              : "",
          pages,
          websiteFile:
            websiteSource === "zip"
              ? websiteFile
              : null,
        });

      console.log(
        "Domain upload response:",
        response
      );

      setSuccess(true);
    } catch (err) {
      console.error(
        "Add domain error:",
        err
      );

      setError(
        err.message ||
          "Unable to add domain."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12 dark:bg-slate-950">
       

        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm dark:bg-slate-900">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/40">
              <CheckCircle2
                size={42}
                className="text-green-600"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
              Domain Added Successfully
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-slate-500 dark:text-slate-400">
              <strong>{domain}</strong>{" "}
              has been added to your Host-Age
              account.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/dashboard/domains"
                  )
                }
                className="flex-1 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white hover:bg-blue-700"
              >
                View My Domains
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="flex-1 rounded-xl border border-slate-300 px-6 py-3.5 font-semibold dark:border-slate-700"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
   <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div>
        
<header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
  <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

    {/* Logo */}
    <Link
      to="/dashboard"
      onClick={() => setMobileMenuOpen(false)}
      className="flex shrink-0 items-center"
    >
      <img
        src="/assets/host-age3.png"
        alt="Host-Age"
         className="w-[140px] h-[140px] object-contain"
      />
    </Link>

    {/* Desktop Navigation */}
    <nav className="hidden items-center gap-1 md:flex">
      {[
        ["Overview", "/dashboard"],
        ["Add domain", "/dashboard/add-domain"],
        ["Billing", "/billing"],
        ["Support", "/tickets"],
        ["Settings", "/settings/general"],
      ].map(([label, path]) => (
        <Link
          key={path}
          to={path}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {label}
        </Link>
      ))}
    </nav>

    {/* Right Controls */}
    <div className="flex items-center gap-2">

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-300 md:hidden dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {mobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  <div
    id="mobile-navigation"
    className={`overflow-hidden border-t border-slate-200/80 bg-white transition-all duration-200 md:hidden dark:border-slate-800 dark:bg-slate-950 ${
      mobileMenuOpen
        ? "max-h-96 opacity-100"
        : "max-h-0 border-transparent opacity-0"
    }`}
  >
    <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
      {[
        ["Overview", "/dashboard"],
        ["Add domain", "/dashboard/add-domain"],
        ["Billing", "/billing"],
        ["Support", "/tickets"],
        ["Settings", "/settings/general"],
      ].map(([label, path]) => (
        <Link
          key={path}
          to={path}
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-lg px-3 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {label}
        </Link>
      ))}
    </nav>
  </div>
</header>

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            
          </button>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Add Domain
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Connect a domain you already own
            with Host-Age.
          </p>
        </div>

        {/* Steps */}
        <StepIndicator
          currentStep={step}
        />

        {/* Card */}
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900 sm:p-8">
          {step === 1 && (
            <DomainStep
              domain={domain}
              setDomain={setDomain}
              error={error}
              setError={setError}
              onNext={
                handleDomainNext
              }
            />
          )}

          {step === 2 && (
            <WebsiteSourceStep
              websiteSource={
                websiteSource
              }
              setWebsiteSource={
                setWebsiteSource
              }
              onNext={
                handleSourceNext
              }
              onBack={() => {
                setError("");
                setStep(1);
              }}
            />
          )}

          {step === 3 && (
            <ConfigurationStep
              websiteSource={
                websiteSource
              }
              websiteUrl={websiteUrl}
              setWebsiteUrl={
                setWebsiteUrl
              }
              githubUrl={githubUrl}
              setGithubUrl={
                setGithubUrl
              }
              websiteFile={
                websiteFile
              }
              setWebsiteFile={
                setWebsiteFile
              }
              error={error}
              setError={setError}
              onNext={
                handleConfigurationNext
              }
              onBack={() => {
                setError("");
                setStep(2);
              }}
            />
          )}

          {step === 4 && (
            <ReviewStep
              domain={domain}
              websiteSource={
                websiteSource
              }
              websiteUrl={websiteUrl}
              githubUrl={githubUrl}
              websiteFile={
                websiteFile
              }
              loading={loading}
              error={error}
              onBack={() => {
                setError("");
                setStep(3);
              }}
              onSubmit={
                handleSubmit
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}