import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AlertCircle,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";


const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5200";

const DOMAIN_REGEX =
  /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

const WEBSITE_REGEX =
  /^https?:\/\/([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

const GITHUB_REGEX =
  /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/i;

export default function AddDomainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Selected plan from previous step
  const selectedPlan =
    location.state?.plan || null;

  // -------------------------
  // Main States
  // -------------------------

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------
  // Domain
  // -------------------------

  const [domains, setDomains] = useState([""]);

  // -------------------------
  // Website Source
  // -------------------------

  const [websiteSource, setWebsiteSource] =
    useState("");

  const [websiteUrl, setWebsiteUrl] =
    useState("");

  const [githubUrl, setGithubUrl] =
    useState("");

  const [websiteFile, setWebsiteFile] =
    useState(null);

  const [files, setFiles] =
    useState([]);

  const [pages, setPages] =
    useState("");

  // -------------------------
  // Terms
  // -------------------------

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [modalTermsChecked,
    setModalTermsChecked] =
    useState(false);

  // -------------------------
  // Business Emails
  // -------------------------

  const [businessEmails,
    setBusinessEmails] =
    useState([
      {
        email: "",
        password: "",
        showPassword: false,
      },
    ]);

  // -------------------------
  // URL Errors
  // -------------------------

  const [urlError, setUrlError] =
    useState("");

  const [githubError,
    setGithubError] =
    useState("");

  // -------------------------
  // Preview URL
  // -------------------------

  const previewFileUrl = useMemo(() => {
    if (!websiteFile) return null;

    return URL.createObjectURL(
      websiteFile
    );
  }, [websiteFile]);

  // -------------------------
  // Domain Helpers
  // -------------------------

  const addDomainField = () => {
    setDomains((prev) => [...prev, ""]);
  };

  const removeDomainField = (index) => {
    setDomains((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateDomain = (index, value) => {
    setDomains((prev) => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  // -------------------------
  // Business Email Helpers
  // -------------------------

  const addBusinessEmail = () => {
    setBusinessEmails((prev) => [
      ...prev,
      {
        email: "",
        password: "",
        showPassword: false,
      },
    ]);
  };

  const removeBusinessEmail = (index) => {
    setBusinessEmails((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateBusinessEmail = (
    index,
    field,
    value
  ) => {
    setBusinessEmails((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  const toggleBusinessPassword = (
    index
  ) => {
    setBusinessEmails((prev) => {
      const copy = [...prev];

      copy[index].showPassword =
        !copy[index].showPassword;

      return copy;
    });
  };

  // -------------------------
  // Password Validator
  // -------------------------

  const validatePassword = (
    password
  ) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@#$%&!*]/.test(password),
  });
  // -------------------------
  // Website ZIP Upload
  // -------------------------

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.name.toLowerCase().endsWith(".zip")) {
      setError("Please upload a ZIP file.");
      return;
    }

    const MAX_SIZE = 50 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      setError("ZIP file must be smaller than 50 MB.");
      return;
    }

    setWebsiteFile(file);
    setFiles([file]);
  };

  // -------------------------
  // Website URL
  // -------------------------

  const handleWebsiteUrlChange = (e) => {
    const value = e.target.value.trim();

    setWebsiteUrl(value);

    if (!value) {
      setUrlError("");
      return;
    }

    if (!WEBSITE_REGEX.test(value)) {
      setUrlError(
        "Please enter a valid website URL."
      );
      return;
    }

    setUrlError("");
  };

  // -------------------------
  // Github URL
  // -------------------------

  const handleGithubUrlChange = (e) => {
    const value = e.target.value.trim();

    setGithubUrl(value);

    if (!value) {
      setGithubError("");
      return;
    }

    if (!GITHUB_REGEX.test(value)) {
      setGithubError(
        "Please enter a valid GitHub repository URL."
      );
      return;
    }

    setGithubError("");
  };

  // -------------------------
  // Form Validation
  // -------------------------

  const validateForm = () => {
    const cleanDomains = domains
      .map((d) => d.trim().toLowerCase())
      .filter(Boolean);

    if (cleanDomains.length === 0) {
      return "Please enter your domain.";
    }

    for (const domain of cleanDomains) {
      if (!DOMAIN_REGEX.test(domain)) {
        return `Invalid domain: ${domain}`;
      }
    }

    if (!websiteSource) {
      return "Please choose a website source.";
    }

    if (
      websiteSource === "upload" &&
      !websiteFile
    ) {
      return "Please upload your website ZIP.";
    }

    if (
      websiteSource === "url" &&
      urlError
    ) {
      return urlError;
    }

    if (
      websiteSource === "github" &&
      githubError
    ) {
      return githubError;
    }

    if (!pages || Number(pages) <= 0) {
      return "Enter a valid page count.";
    }

    if (!modalTermsChecked) {
      return "Please accept Terms & Conditions.";
    }

    const validBusinessEmails =
      businessEmails.filter(
        (item) =>
          item.email.trim() &&
          item.password.trim()
      );

    for (const item of validBusinessEmails) {
      const rules = validatePassword(
        item.password
      );

      const strongPassword =
        Object.values(rules).every(Boolean);

      if (!strongPassword) {
        return `Weak password for ${item.email}`;
      }
    }

    return null;
  };
  // -------------------------
  // Submit
  // -------------------------

  const handleStep2Submit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // -------------------------
      // Authentication
      // -------------------------

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // -------------------------
      // Domain
      // -------------------------

      const cleanDomains = domains
        .map((d) => d.trim().toLowerCase())
        .filter(Boolean);

      // -------------------------
      // Business Emails
      // -------------------------

      const validBusinessEmails =
        businessEmails
          .filter(
            (item) =>
              item.email.trim() &&
              item.password.trim()
          )
          .map((item) => ({
            email: item.email.trim(),
            password: item.password,
          }));

      // -------------------------
      // FormData
      // -------------------------

      const formData = new FormData();

      formData.append("domain", cleanDomains[0]);

      formData.append(
        "businessEmails",
        JSON.stringify(validBusinessEmails)
      );

      formData.append(
        "websiteSource",
        websiteSource
      );

      formData.append(
        "pages",
        String(pages)
      );

      formData.append(
        "termsAccepted",
        String(modalTermsChecked)
      );

      if (
        websiteSource === "upload" &&
        websiteFile
      ) {
        formData.append(
          "websiteFile",
          websiteFile
        );
      }

      if (websiteSource === "url") {
        formData.append(
          "websiteUrl",
          websiteUrl.trim()
        );
      }

      if (websiteSource === "github") {
        formData.append(
          "githubUrl",
          githubUrl.trim()
        );
      }

      // -------------------------
      // Upload
      // -------------------------

      const { data } = await axios.post(
        `${API_URL}/api/domains/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        throw new Error(
          data.message ||
          "Domain upload failed."
        );
      }

      // -------------------------
      // Save Local Data
      // -------------------------

      localStorage.setItem(
        "domain",
        cleanDomains[0]
      );

      // -------------------------
      // FREE PLAN
      // -------------------------

      if (
        selectedPlan &&
        Number(selectedPlan.price) === 0
      ) {
        navigate("/dashboard", {
          replace: true,
          state: {
            domain: cleanDomains[0],
            plan: selectedPlan,
            upload: data,
          },
        });

        return;
      }

      // -------------------------
      // PAID PLAN
      // -------------------------

      localStorage.setItem("domain", cleanDomains[0]);

      navigate("/domain/billing", {
        state: {
          plan: JSON.parse(localStorage.getItem("selectedPlan")),
          domain: cleanDomains[0],
        },
      });

    } catch (err) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message
        );
      } else {
        setError(
          err.message ||
          "Something went wrong."
        );
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleStep2Submit} className="space-y-6">
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-8 text-white">
              <p className="uppercase tracking-widest text-sm opacity-90">
                Registration
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Upload Your Domain
              </h1>

              <p className="mt-2 text-blue-100">
                Connect your website so we can configure your hosting account.
              </p>
            </div>

            <div className="p-8 space-y-8">

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-red-700 text-sm">
                    {error}
                  </p>
                </div>
              )}

              {/* ---------------- Domain ---------------- */}

              <section className="space-y-5">

                <div>
                  <h2 className="text-xl font-semibold">
                    Domain Name
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Add one or more domains you want to host.
                  </p>
                </div>

                {domains.map((domain, index) => (

                  <div
                    key={index}
                    className="flex gap-3"
                  >

                    <Input
                      placeholder="example.com"
                      value={domain}
                      onChange={(e) =>
                        updateDomain(index, e.target.value)
                      }
                    />

                    {domains.length > 1 && (

                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() =>
                          removeDomainField(index)
                        }
                      >
                        Remove
                      </Button>

                    )}

                  </div>

                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addDomainField}
                >
                  + Add Another Domain
                </Button>

              </section>

              {/* --------------- Website Source --------------- */}

              <section className="space-y-6">

                <div>

                  <h2 className="text-xl font-semibold">
                    Website Source
                  </h2>

                  <p className="text-slate-500 text-sm mt-1">
                    Choose how you want to provide your website.
                  </p>

                </div>

                <div className="grid md:grid-cols-2 gap-4">

                  {[
                    {
                      id: "upload",
                      title: "Upload ZIP",
                      desc: "Upload your website files."
                    },
                    {
                      id: "url",
                      title: "Existing Website",
                      desc: "Clone an existing website."
                    },
                    {
                      id: "github",
                      title: "GitHub Repository",
                      desc: "Deploy directly from GitHub."
                    },
                    {
                      id: "new",
                      title: "Build New Website",
                      desc: "Let our team build your website."
                    },
                  ].map((item) => (

                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setWebsiteSource(item.id)
                      }
                      className={`rounded-2xl border p-6 text-left transition-all

${websiteSource === item.id
                          ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                    >

                      <h3 className="font-semibold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-2">
                        {item.desc}
                      </p>

                    </button>

                  ))}

                </div>

                {/* Upload ZIP */}

                {websiteSource === "upload" && (

                  <div className="rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">

                    <input
                      type="file"
                      accept=".zip"
                      onChange={handleFileUpload}
                    />

                    <p className="text-sm text-slate-500 mt-3">
                      Upload a ZIP file (Maximum 50 MB)
                    </p>

                    {websiteFile && (
                      <div className="mt-5 flex items-center justify-between rounded-xl border bg-slate-50 p-4">

                        <span className="font-medium">
                          {websiteFile.name}
                        </span>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setWebsiteFile(null);
                            setFiles([]);
                          }}
                        >
                          Remove
                        </Button>

                      </div>
                    )}

                  </div>

                )}

                {/* Website URL */}

                {websiteSource === "url" && (

                  <div>

                    <Input
                      placeholder="https://example.com"
                      value={websiteUrl}
                      onChange={handleWebsiteUrlChange}
                    />

                    {urlError && (
                      <p className="mt-2 text-sm text-red-600">
                        {urlError}
                      </p>
                    )}

                  </div>

                )}

                {/* GitHub */}

                {websiteSource === "github" && (

                  <div>

                    <Input
                      placeholder="https://github.com/user/repository"
                      value={githubUrl}
                      onChange={handleGithubUrlChange}
                    />

                    {githubError && (
                      <p className="mt-2 text-sm text-red-600">
                        {githubError}
                      </p>
                    )}

                  </div>

                )}

                {/* New Website */}

                {websiteSource === "new" && (

                  <div className="rounded-2xl bg-blue-50 border border-blue-200 p-6">

                    <h3 className="font-semibold">
                      Need a Website?
                    </h3>

                    <p className="text-sm text-slate-600 mt-2">
                      Our design and development team will contact you after registration.
                    </p>

                  </div>

                )}

              </section>
              {/* ---------------- Number of Pages ---------------- */}

              <section className="space-y-4">

                <div>
                  <h2 className="text-xl font-semibold">
                    Website Pages
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Enter the approximate number of pages on your website.
                  </p>
                </div>

                <Input
                  type="number"
                  min={1}
                  placeholder="e.g. 6"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="max-w-xs"
                />

              </section>

              {/* ---------------- Business Emails ---------------- */}

              <section className="space-y-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-semibold">
                      Business Email Accounts
                    </h2>

                    <p className="text-sm text-slate-500 mt-1">
                      Create professional email accounts for your domain.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={addBusinessEmail}
                  >
                    + Add Email
                  </Button>

                </div>

                {businessEmails.map((item, index) => {

                  const rules = validatePassword(
                    item.password
                  );

                  return (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 p-6 space-y-5"
                    >

                      <div className="flex items-center justify-between">

                        <h3 className="font-semibold">
                          Email #{index + 1}
                        </h3>

                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() =>
                              removeBusinessEmail(index)
                            }
                          >
                            Remove
                          </Button>
                        )}

                      </div>

                      <Input
                        type="email"
                        placeholder="info@example.com"
                        value={item.email}
                        onChange={(e) =>
                          updateBusinessEmail(
                            index,
                            "email",
                            e.target.value
                          )
                        }
                      />

                      <div className="relative">

                        <Input
                          type={
                            item.showPassword
                              ? "text"
                              : "password"
                          }
                          placeholder="Password"
                          value={item.password}
                          onChange={(e) =>
                            updateBusinessEmail(
                              index,
                              "password",
                              e.target.value
                            )
                          }
                          className="pr-12"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            toggleBusinessPassword(index)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                        >
                          {item.showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>

                      </div>

                      {/* Password Rules */}

                      <div className="grid md:grid-cols-2 gap-2 text-sm">

                        <p
                          className={
                            rules.length
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          {rules.length ? "✓" : "✕"} Minimum 8 characters
                        </p>

                        <p
                          className={
                            rules.uppercase
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          {rules.uppercase ? "✓" : "✕"} Uppercase letter
                        </p>

                        <p
                          className={
                            rules.lowercase
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          {rules.lowercase ? "✓" : "✕"} Lowercase letter
                        </p>

                        <p
                          className={
                            rules.number
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          {rules.number ? "✓" : "✕"} Number
                        </p>

                        <p
                          className={
                            rules.special
                              ? "text-green-600"
                              : "text-red-500"
                          }
                        >
                          {rules.special ? "✓" : "✕"} Special character
                        </p>

                      </div>

                    </div>

                  );

                })}
              </section>
              {/* ---------------- Terms & Conditions ---------------- */}

              <section className="space-y-4">

                <div className="flex items-start gap-3">

                  <input
                    id="terms"
                    type="checkbox"
                    checked={modalTermsChecked}
                    onChange={(e) =>
                      setModalTermsChecked(e.target.checked)
                    }
                    className="mt-1 h-4 w-4"
                  />

                  <label
                    htmlFor="terms"
                    className="text-sm text-slate-600 leading-6"
                  >
                    I have read and agree to the{" "}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </button>
                  </label>

                </div>

              </section>

              {/* ---------------- Modal ---------------- */}

              {isModalOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">

                  <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

                    <div className="border-b px-6 py-4">

                      <h2 className="text-2xl font-bold">
                        Terms & Conditions
                      </h2>

                    </div>

                    <div className="max-h-[400px] overflow-y-auto px-6 py-6">

                      <ol className="list-decimal space-y-4 pl-5 text-sm text-slate-700">

                        <li>
                          You agree to provide accurate information during registration.
                        </li>

                        <li>
                          You are responsible for maintaining your account security.
                        </li>

                        <li>
                          Hosting resources depend on your selected plan.
                        </li>

                        <li>
                          Domain ownership remains your responsibility.
                        </li>

                        <li>
                          Business email accounts are limited according to your hosting plan.
                        </li>

                        <li>
                          Refunds are subject to our Refund Policy.
                        </li>

                        <li>
                          Host-Age reserves the right to suspend accounts involved in abuse or illegal activity.
                        </li>

                      </ol>

                    </div>

                    <div className="border-t px-6 py-4 flex justify-end gap-3">

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </Button>

                      <Button
                        type="button"
                        onClick={() => {
                          setModalTermsChecked(true);
                          setIsModalOpen(false);
                        }}
                      >
                        I Agree
                      </Button>

                    </div>

                  </div>

                </div>

              )}

              {/* ---------------- Footer Buttons ---------------- */}

              <div className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:justify-between">

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="min-w-[220px] bg-blue-600 hover:bg-blue-700"
                >
                  {loading
                    ? "Processing..."
                    : selectedPlan?.price === 0
                      ? "Finish Registration"
                      : "Continue to Payment"}
                </Button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

