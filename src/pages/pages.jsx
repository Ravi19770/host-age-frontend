import React, { useMemo, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import {
    AlertCircle,
    CheckCircle2,
    Download,
    Mail,
    Trash2,
    X,
} from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const API_URL =
    process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function AddDomainPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // =========================================================
    // PLAN
    // =========================================================

    const selectedPlan = location.state?.plan || null;

    /*
     * Your plan can contain:
     * emailAccounts
     * includedEmails
     * emails
     *
     * If none exists, 8 is used as default.
     */
    const includedEmailAccounts = useMemo(() => {
        const value =
            selectedPlan?.emailAccounts ??
            selectedPlan?.includedEmails ??
            selectedPlan?.emails ??
            8;

        const number = Number(value);

        return Number.isFinite(number) && number >= 0
            ? number
            : 8;
    }, [selectedPlan]);

    // =========================================================
    // DOMAIN
    // =========================================================

    const [domains, setDomains] = useState([""]);

    // =========================================================
    // WEBSITE SOURCE
    // =========================================================

    const [websiteSource, setWebsiteSource] = useState("");

    const [websiteUrl, setWebsiteUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const [websiteFile, setWebsiteFile] = useState(null);
    const [files, setFiles] = useState([]);

    // =========================================================
    // WEBSITE DETAILS
    // =========================================================

    const [pages, setPages] = useState("");

    // =========================================================
    // GENERAL STATE
    // =========================================================

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // =========================================================
    // TERMS
    // =========================================================

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTermsChecked, setModalTermsChecked] =
        useState(false);

    // =========================================================
    // BUSINESS EMAIL REQUESTS
    // =========================================================

    const [businessEmails, setBusinessEmails] =
        useState([]);

    const [emailRequest, setEmailRequest] = useState({
        username: "",
        quota: "5",
        purpose: "",
    });

    const [emailRequestError, setEmailRequestError] =
        useState("");

    // =========================================================
    // URL ERRORS
    // =========================================================

    const [urlError, setUrlError] = useState("");
    const [githubError, setGithubError] = useState("");
        // =========================================================
    // FILE UPLOAD
    // =========================================================

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        // ZIP only
        if (
            !file.name
                .toLowerCase()
                .endsWith(".zip")
        ) {
            setError(
                "Please upload only a ZIP file."
            );

            setWebsiteFile(null);
            setFiles([]);

            return;
        }

        // 50 MB
        const MAX_SIZE = 50 * 1024 * 1024;

        if (file.size > MAX_SIZE) {
            setError(
                "File size must be less than 50MB."
            );

            setWebsiteFile(null);
            setFiles([]);

            return;
        }

        setError("");
        setWebsiteFile(file);
        setFiles([file]);
    };

    // =========================================================
    // WEBSITE URL
    // =========================================================

    const handleWebsiteUrlChange = (e) => {
        const value = e.target.value;

        setWebsiteUrl(value);
        setUrlError("");

        if (
            value === "" ||
            value === "http://" ||
            value === "https://"
        ) {
            return;
        }

        if (value.startsWith("www.")) {
            setUrlError(
                "Please use http:// or https://"
            );
            return;
        }

        const regex =
            /^https?:\/\/([\w-]+\.)+[\w-]{2,}(\/.*)?$/i;

        if (!regex.test(value)) {
            setUrlError(
                "Invalid Website URL"
            );
        }
    };

    // =========================================================
    // GITHUB URL
    // =========================================================

    const handleGithubUrlChange = (e) => {
        const value = e.target.value;

        setGithubUrl(value);
        setGithubError("");

        if (
            value === "" ||
            value === "https://" ||
            value === "https://github.com/"
        ) {
            return;
        }

        const regex =
            /^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/i;

        if (!regex.test(value)) {
            setGithubError(
                "Invalid GitHub Repository URL"
            );
        }
    };

    // =========================================================
    // REMOVE UPLOADED FILE
    // =========================================================

    const removeUploadedFile = () => {
        setFiles([]);
        setWebsiteFile(null);
    };

    // ============================================================
// DOMAIN HELPERS
// ============================================================

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
        const updated = [...prev];
        updated[index] = value;
        return updated;
    });
};


// ============================================================
// EMAIL COUNTERS
// ============================================================

const usedEmailAccounts = businessEmails.length;

const remainingEmailAccounts = Math.max(
    includedEmailAccounts - usedEmailAccounts,
    0
);


// ============================================================
// REMOVE EMAIL REQUEST
// ============================================================

const removeBusinessEmail = (index) => {
    setBusinessEmails((prev) =>
        prev.filter((_, i) => i !== index)
    );
};


// ============================================================
// ADD EMAIL REQUEST
// ============================================================

const handleAddEmailRequest = () => {
    setEmailRequestError("");

    const username =
        emailRequest.username.trim().toLowerCase();

    if (!username) {
        setEmailRequestError(
            "Please enter an email username."
        );
        return;
    }

    if (!/^[a-z0-9._-]+$/.test(username)) {
        setEmailRequestError(
            "Only letters, numbers, dots, hyphens and underscores are allowed."
        );
        return;
    }

    if (
        username.startsWith(".") ||
        username.endsWith(".")
    ) {
        setEmailRequestError(
            "Email username cannot start or end with a dot."
        );
        return;
    }

    const reservedUsernames = [
        "root",
        "postmaster",
        "mailer-daemon",
        "abuse",
        "webmaster",
    ];

    if (
        reservedUsernames.includes(username)
    ) {
        setEmailRequestError(
            "This email username cannot be used."
        );
        return;
    }

    if (
        businessEmails.length >=
        includedEmailAccounts
    ) {
        setEmailRequestError(
            `Your plan includes only ${includedEmailAccounts} email accounts.`
        );
        return;
    }

    const alreadyExists =
        businessEmails.some(
            (email) =>
                email.username.toLowerCase() ===
                username
        );

    if (alreadyExists) {
        setEmailRequestError(
            "This email account has already been requested."
        );
        return;
    }

    setBusinessEmails((prev) => [
        ...prev,
        {
            username,
            quota:
                Number(emailRequest.quota) || 5,
            purpose:
                emailRequest.purpose.trim(),
            status: "pending",
        },
    ]);

    setEmailRequest({
        username: "",
        quota: "5",
        purpose: "",
    });
};


// ============================================================
// MAIN SUBMIT
// ============================================================

const handleStep2Submit = async (e) => {
    e.preventDefault();

    setError("");
    setEmailRequestError("");

    const token =
        localStorage.getItem("token");

    if (!token) {
        setError(
            "Authentication failed. Please login again."
        );

        navigate("/login");
        return;
    }


    // --------------------------------------------------------
    // DOMAIN
    // --------------------------------------------------------

    const cleanDomains = domains
        .map((domain) =>
            domain.trim().toLowerCase()
        )
        .filter(Boolean);

    if (cleanDomains.length === 0) {
        setError(
            "Please enter at least one domain."
        );
        return;
    }

    const domainRegex =
        /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i;

    const invalidDomain =
        cleanDomains.find(
            (domain) =>
                !domainRegex.test(domain)
        );

    if (invalidDomain) {
        setError(
            `Invalid domain: ${invalidDomain}`
        );
        return;
    }


    // --------------------------------------------------------
    // WEBSITE SOURCE
    // --------------------------------------------------------

    if (!websiteSource) {
        setError(
            "Please select Website Source."
        );
        return;
    }

    if (
        websiteSource === "upload" &&
        !websiteFile
    ) {
        setError(
            "Please upload your website ZIP file."
        );
        return;
    }

    if (
        websiteSource === "url"
    ) {
        if (!websiteUrl.trim()) {
            setError(
                "Please enter your website URL."
            );
            return;
        }

        if (urlError) {
            setError(
                "Please fix the website URL."
            );
            return;
        }
    }

    if (
        websiteSource === "github"
    ) {
        if (!githubUrl.trim()) {
            setError(
                "Please enter your GitHub repository URL."
            );
            return;
        }

        if (githubError) {
            setError(
                "Please fix the GitHub URL."
            );
            return;
        }
    }


    // --------------------------------------------------------
    // PAGES
    // --------------------------------------------------------

    if (
        !pages ||
        Number(pages) <= 0
    ) {
        setError(
            "Please enter a valid number of pages."
        );
        return;
    }


    // --------------------------------------------------------
    // TERMS
    // --------------------------------------------------------

    if (!modalTermsChecked) {
        setError(
            "Please accept Terms & Conditions."
        );
        return;
    }


    // --------------------------------------------------------
    // EMAIL REQUESTS
    // --------------------------------------------------------

    const validBusinessEmails =
        businessEmails
            .filter(
                (item) =>
                    item.username &&
                    item.username.trim()
            )
            .map((item) => ({
                username:
                    item.username
                        .trim()
                        .toLowerCase(),

                email:
                    `${item.username
                        .trim()
                        .toLowerCase()}@${cleanDomains[0]}`,

                quota:
                    Number(item.quota) || 5,

                purpose:
                    item.purpose?.trim() || "",

                status: "pending",
            }));

    if (
        validBusinessEmails.length >
        includedEmailAccounts
    ) {
        setError(
            `You can request a maximum of ${includedEmailAccounts} email accounts.`
        );
        return;
    }


    // --------------------------------------------------------
    // FORM DATA
    // --------------------------------------------------------

    const formData = new FormData();

    formData.append(
        "domain",
        cleanDomains[0]
    );

    formData.append(
        "domains",
        JSON.stringify(cleanDomains)
    );

    formData.append(
        "businessEmails",
        JSON.stringify(
            validBusinessEmails
        )
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

    if (selectedPlan) {
        formData.append(
            "plan",
            JSON.stringify(selectedPlan)
        );
    }

    if (
        websiteSource === "url"
    ) {
        formData.append(
            "websiteUrl",
            websiteUrl.trim()
        );
    }

    if (
        websiteSource === "github"
    ) {
        formData.append(
            "githubUrl",
            githubUrl.trim()
        );
    }

    if (
        websiteSource === "upload" &&
        websiteFile
    ) {
        formData.append(
            "websiteFile",
            websiteFile
        );
    }


    // --------------------------------------------------------
    // API
    // --------------------------------------------------------

    console.log(
        "========== ADD DOMAIN =========="
    );

    for (
        const pair of formData.entries()
    ) {
        console.log(
            pair[0],
            pair[1]
        );
    }

    setLoading(true);

    try {
        const response =
            await axios.post(
                `${API_URL}/api/domains/upload`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        console.log(
            "API Response:",
            response.data
        );

        if (
            !response.data?.success
        ) {
            setError(
                response.data?.message ||
                "Domain upload failed."
            );

            return;
        }

        localStorage.setItem(
            "domain",
            cleanDomains[0]
        );

        navigate(
            "/domain/billing",
            {
                state: {
                    plan: selectedPlan,
                    domain:
                        cleanDomains[0],
                    domains:
                        cleanDomains,
                    businessEmails:
                        validBusinessEmails,
                    websiteSource,
                    pages:
                        Number(pages),
                },
            }
        );

    } catch (err) {
        console.error(
            "UPLOAD ERROR:",
            err
        );

        const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            "Upload failed.";

        setError(message);

    } finally {
        setLoading(false);
    }
};
        return (
        <form
            onSubmit={handleStep2Submit}
            className="min-h-screen bg-slate-50 py-10 px-4"
        >
            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-8">

                        <h1 className="text-3xl font-bold text-white">
                            Configure Your Hosting
                        </h1>

                        <p className="text-blue-100 mt-2">
                            Complete the details below to provision your hosting account.
                        </p>

                        {selectedPlan?.name && (
                            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-white/15 text-white text-sm">
                                Plan: {selectedPlan.name}
                            </div>
                        )}

                    </div>


                    <div className="p-8 space-y-8">

                        {/* =================================================
                            GENERAL ERROR
                        ================================================= */}

                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">

                                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />

                                <div>
                                    <p className="font-medium text-red-700">
                                        Something went wrong
                                    </p>

                                    <p className="text-sm text-red-600 mt-1">
                                        {error}
                                    </p>
                                </div>

                            </div>
                        )}


                        {/* =================================================
                            DOMAIN INFORMATION
                        ================================================= */}

                        <section className="space-y-5">

                            <div>

                                <h2 className="text-xl font-semibold text-slate-900">
                                    Domain Information
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Enter the domain you want to host.
                                </p>

                            </div>


                            {domains.map(
                                (domain, index) => (

                                    <div
                                        key={index}
                                        className="relative"
                                    >

                                        <Input
                                            value={domain}
                                            required={
                                                index === 0
                                            }
                                            placeholder="example.com"
                                            className="pr-12"
                                            onChange={(e) =>
                                                updateDomain(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                        />

                                        {domains.length >
                                            1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeDomainField(
                                                        index
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                                            >
                                                <X
                                                    size={18}
                                                />
                                            </button>
                                        )}

                                    </div>

                                )
                            )}


                            <Button
                                type="button"
                                variant="outline"
                                onClick={
                                    addDomainField
                                }
                            >
                                + Add Another Domain
                            </Button>

                            <p className="text-xs text-slate-500">
                                The first domain will be used as the primary hosting domain.
                            </p>

                        </section>


                        {/* =================================================
                            WEBSITE SOURCE
                        ================================================= */}

                        <section className="border rounded-xl p-6 space-y-6">

                            <div>

                                <h2 className="text-xl font-semibold text-slate-900">
                                    Website Source
                                </h2>

                                <p className="text-sm text-slate-500 mt-1">
                                    Tell us how you want to deploy your website.
                                </p>

                            </div>


                            <select
                                value={
                                    websiteSource
                                }
                                onChange={(e) => {
                                    const value =
                                        e.target.value;

                                    setWebsiteSource(
                                        value
                                    );

                                    setError("");
                                }}
                                className="w-full border rounded-lg px-4 py-3 bg-white"
                            >

                                <option value="">
                                    Select Website Source
                                </option>

                                <option value="upload">
                                    Upload Website Files (.zip)
                                </option>

                                <option value="url">
                                    Existing Website URL
                                </option>

                                <option value="github">
                                    GitHub Repository
                                </option>

                                <option value="new">
                                    I Need a New Website
                                </option>

                            </select>


                            {/* UPLOAD */}

                            {websiteSource ===
                                "upload" && (

                                <div className="space-y-3">

                                    <label className="inline-flex items-center px-5 py-3 rounded-lg bg-blue-600 text-white cursor-pointer hover:bg-blue-700 transition">

                                        Upload ZIP File

                                        <input
                                            type="file"
                                            accept=".zip"
                                            className="hidden"
                                            onChange={
                                                handleFileUpload
                                            }
                                        />

                                    </label>

                                    <p className="text-xs text-slate-500">
                                        Maximum file size: 50MB
                                    </p>

                                </div>
                            )}


                            {/* FILE */}

                            {files.length >
                                0 && (

                                <div className="space-y-3">

                                    {files.map(
                                        (
                                            file,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                className="flex justify-between items-center border rounded-lg bg-slate-50 p-3"
                                            >

                                                <div className="flex items-center gap-3">

                                                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                        ZIP
                                                    </div>

                                                    <span className="font-medium text-sm">
                                                        {
                                                            file.name
                                                        }
                                                    </span>

                                                </div>


                                                <div className="flex items-center gap-4">

                                                    <a
                                                        href={URL.createObjectURL(
                                                            file
                                                        )}
                                                        download={
                                                            file.name
                                                        }
                                                        className="text-blue-600 hover:text-blue-800"
                                                    >
                                                        <Download
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            removeUploadedFile
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash2
                                                            size={
                                                                18
                                                            }
                                                        />
                                                    </button>

                                                </div>

                                            </div>
                                        )
                                    )}

                                </div>
                            )}

                                                        {/* =================================================
                                EXISTING WEBSITE URL
                            ================================================= */}

                            {websiteSource ===
                                "url" && (

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        Website URL
                                    </label>

                                    <Input
                                        type="url"
                                        placeholder="https://example.com"
                                        value={
                                            websiteUrl
                                        }
                                        onChange={
                                            handleWebsiteUrlChange
                                        }
                                    />

                                    {urlError && (
                                        <p className="text-sm text-red-500 mt-2">
                                            {
                                                urlError
                                            }
                                        </p>
                                    )}

                                </div>
                            )}


                            {/* =================================================
                                GITHUB
                            ================================================= */}

                            {websiteSource ===
                                "github" && (

                                <div>

                                    <label className="block text-sm font-medium mb-2">
                                        GitHub Repository URL
                                    </label>

                                    <Input
                                        placeholder="https://github.com/username/project"
                                        value={
                                            githubUrl
                                        }
                                        onChange={
                                            handleGithubUrlChange
                                        }
                                    />

                                    {githubError && (
                                        <p className="text-sm text-red-500 mt-2">
                                            {
                                                githubError
                                            }
                                        </p>
                                    )}

                                </div>
                            )}


                            {/* =================================================
                                NEW WEBSITE
                            ================================================= */}

                            {websiteSource ===
                                "new" && (

                                <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">

                                    <h3 className="font-semibold text-blue-700">
                                        New Website Development
                                    </h3>

                                    <p className="text-sm text-slate-600 mt-2">
                                        Our development team will contact you after your order is confirmed.
                                    </p>

                                </div>
                            )}

                        </section>


                        {/* =================================================
                            WEBSITE DETAILS
                        ================================================= */}

                        <section>

                            <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                Website Details
                            </h2>

                            <label className="block text-sm font-medium mb-2">
                                Estimated Number of Pages
                            </label>

                            <Input
                                type="number"
                                min="1"
                                max="10000"
                                placeholder="e.g. 5"
                                value={pages}
                                onChange={(e) =>
                                    setPages(
                                        e.target.value
                                    )
                                }
                            />

                            <p className="text-xs text-slate-500 mt-2">
                                Enter an approximate number of pages for your website.
                            </p>

                        </section>


                        {/* =================================================
                            BUSINESS EMAIL
                        ================================================= */}

                        <section className="border rounded-xl p-6 bg-white space-y-6">

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <Mail
                                            className="text-blue-600"
                                            size={22}
                                        />

                                        <h2 className="text-xl font-semibold text-slate-900">
                                            Business Email
                                        </h2>

                                    </div>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Request professional email accounts for your domain.
                                    </p>

                                </div>


                                <div className="rounded-xl bg-slate-50 border px-5 py-3 text-center">

                                    <p className="text-xs text-slate-500">
                                        Email Accounts
                                    </p>

                                    <p className="text-xl font-bold text-blue-600">
                                        {
                                            usedEmailAccounts
                                        }{" "}
                                        /{" "}
                                        {
                                            includedEmailAccounts
                                        }
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {
                                            remainingEmailAccounts
                                        }{" "}
                                        remaining
                                    </p>

                                </div>

                            </div>


                            {/* PLAN INFO */}

                            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">

                                <div className="flex gap-3">

                                    <CheckCircle2
                                        className="text-blue-600 shrink-0 mt-0.5"
                                        size={20}
                                    />

                                    <div>

                                        <p className="font-semibold text-blue-800">
                                            {
                                                includedEmailAccounts
                                            }{" "}
                                            Business Email Accounts Included
                                        </p>

                                        <p className="text-sm text-blue-700 mt-1">
                                            Create professional addresses such as
                                            admin@yourdomain.com,
                                            sales@yourdomain.com or
                                            support@yourdomain.com.
                                        </p>

                                    </div>

                                </div>

                            </div>


                            {/* EMAIL ERROR */}

                            {emailRequestError && (

                                <div className="rounded-lg border border-red-200 bg-red-50 p-3">

                                    <p className="text-sm text-red-600">
                                        {
                                            emailRequestError
                                        }
                                    </p>

                                </div>

                            )}


                            {/* REQUESTED EMAILS */}

                            {businessEmails.length >
                                0 && (

                                <div className="space-y-3">

                                    <div className="flex items-center justify-between">

                                        <h3 className="font-semibold text-slate-800">
                                            Requested Email Accounts
                                        </h3>

                                        <span className="text-xs text-slate-500">
                                            {
                                                businessEmails.length
                                            }{" "}
                                            requested
                                        </span>

                                    </div>


                                    {businessEmails.map(
                                        (
                                            email,
                                            index
                                        ) => (

                                            <div
                                                key={`${email.username}-${index}`}
                                                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border rounded-xl p-4 bg-slate-50"
                                            >

                                                <div>

                                                    <p className="font-semibold text-slate-900">
                                                        {
                                                            email.username
                                                        }
                                                        @
                                                        {domains[0] ||
                                                            "yourdomain.com"}
                                                    </p>

                                                    <div className="flex flex-wrap gap-2 mt-2">

                                                        <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-600">
                                                            {
                                                                email.quota
                                                            }{" "}
                                                            GB
                                                        </span>

                                                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                                                            Pending
                                                        </span>

                                                    </div>

                                                    {email.purpose && (
                                                        <p className="text-xs text-slate-500 mt-2">
                                                            Purpose:{" "}
                                                            {
                                                                email.purpose
                                                            }
                                                        </p>
                                                    )}

                                                </div>


                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeBusinessEmail(
                                                            index
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1 text-sm text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    Remove
                                                </button>

                                            </div>
                                        )
                                    )}

                                </div>
                            )}

                                                        {/* =================================================
                                NEW EMAIL REQUEST
                            ================================================= */}

                            {remainingEmailAccounts >
                            0 ? (

                                <div className="border rounded-xl p-5 space-y-5">

                                    <div>

                                        <h3 className="font-semibold text-slate-800">
                                            Request New Email
                                        </h3>

                                        <p className="text-sm text-slate-500 mt-1">
                                            Your requested mailbox will be provisioned after hosting activation.
                                        </p>

                                    </div>


                                    {/* USERNAME */}

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Email Username
                                        </label>

                                        <div className="flex">

                                            <Input
                                                placeholder="support"
                                                value={
                                                    emailRequest.username
                                                }
                                                onChange={(e) => {

                                                    const value =
                                                        e.target.value
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s/g,
                                                                ""
                                                            );

                                                    setEmailRequest(
                                                        (
                                                            prev
                                                        ) => ({
                                                            ...prev,
                                                            username:
                                                                value,
                                                        })
                                                    );

                                                    setEmailRequestError(
                                                        ""
                                                    );
                                                }}
                                                className="rounded-r-none"
                                            />

                                            <div className="flex items-center px-4 border border-l-0 rounded-r-lg bg-slate-50 text-sm text-slate-600 whitespace-nowrap">

                                                @
                                                {domains[0] ||
                                                    "yourdomain.com"}

                                            </div>

                                        </div>

                                    </div>


                                    {/* QUOTA */}

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Mailbox Storage
                                        </label>

                                        <select
                                            value={
                                                emailRequest.quota
                                            }
                                            onChange={(e) =>
                                                setEmailRequest(
                                                    (
                                                        prev
                                                    ) => ({
                                                        ...prev,
                                                        quota:
                                                            e
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                            className="w-full border rounded-lg px-4 py-3 bg-white"
                                        >

                                            <option value="5">
                                                5 GB
                                            </option>

                                            <option value="10">
                                                10 GB
                                            </option>

                                            <option value="20">
                                                20 GB
                                            </option>

                                        </select>

                                    </div>


                                    {/* PURPOSE */}

                                    <div>

                                        <label className="block text-sm font-medium mb-2">
                                            Purpose
                                        </label>

                                        <Input
                                            placeholder="e.g. Sales, Support, Admin"
                                            value={
                                                emailRequest.purpose
                                            }
                                            onChange={(e) =>
                                                setEmailRequest(
                                                    (
                                                        prev
                                                    ) => ({
                                                        ...prev,
                                                        purpose:
                                                            e
                                                                .target
                                                                .value,
                                                    })
                                                )
                                            }
                                        />

                                    </div>


                                    {/* REQUEST */}

                                    <Button
                                        type="button"
                                        onClick={
                                            handleAddEmailRequest
                                        }
                                        disabled={
                                            !domains[0]?.trim() ||
                                            remainingEmailAccounts <=
                                                0
                                        }
                                    >
                                        + Request Email
                                    </Button>

                                    {!domains[0]?.trim() && (
                                        <p className="text-xs text-amber-600">
                                            Enter your domain first to request an email account.
                                        </p>
                                    )}

                                </div>

                            ) : (

                                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">

                                    <p className="font-semibold text-amber-800">
                                        All included email accounts have been used.
                                    </p>

                                    <p className="text-sm text-amber-700 mt-1">
                                        Need additional mailboxes? Contact Host-Age support for an additional email package.
                                    </p>

                                </div>

                            )}

                        </section>


                        {/* =================================================
                            TERMS
                        ================================================= */}

                        <section className="border rounded-xl p-6 bg-slate-50">

                            <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                Terms & Conditions
                            </h2>

                            <div className="flex items-start gap-3">

                                <input
                                    type="checkbox"
                                    id="acceptTerms"
                                    checked={
                                        modalTermsChecked
                                    }
                                    readOnly
                                    className="mt-1"
                                />

                                <label
                                    htmlFor="acceptTerms"
                                    className="text-sm text-slate-600"
                                >
                                    I have read and agree to the{" "}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsModalOpen(
                                                true
                                            )
                                        }
                                        className="text-blue-600 underline hover:text-blue-800"
                                    >
                                        Terms & Conditions
                                    </button>

                                </label>

                            </div>

                        </section>

                                                {/* =================================================
                            TERMS MODAL
                        ================================================= */}

                        {isModalOpen && (

                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                                <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">

                                    {/* HEADER */}

                                    <div className="p-6 border-b flex items-center justify-between">

                                        <h2 className="text-2xl font-semibold">
                                            Terms & Conditions
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(
                                                    false
                                                )
                                            }
                                            className="text-slate-500 hover:text-slate-800"
                                        >
                                            <X
                                                size={22}
                                            />
                                        </button>

                                    </div>


                                    {/* CONTENT */}

                                    <div className="p-6 overflow-y-auto">

                                        <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700">

                                            <li>
                                                You must provide valid domain information.
                                            </li>

                                            <li>
                                                Hosting setup starts only after payment verification.
                                            </li>

                                            <li>
                                                Requested business email accounts are provisioned after hosting activation.
                                            </li>

                                            <li>
                                                Temporary email passwords are generated securely during provisioning.
                                            </li>

                                            <li>
                                                You must change your password after your first login.
                                            </li>

                                            <li>
                                                Additional storage or mailboxes may require extra charges.
                                            </li>

                                            <li>
                                                Domain ownership verification may be required.
                                            </li>

                                            <li>
                                                SSL certificates are installed automatically where applicable.
                                            </li>

                                            <li>
                                                Refunds follow the official Refund Policy.
                                            </li>

                                            <li>
                                                Host-Age reserves the right to suspend abusive or fraudulent accounts.
                                            </li>

                                        </ol>


                                        {/* ACCEPT */}

                                        <div className="mt-8 flex items-start gap-3">

                                            <input
                                                type="checkbox"
                                                id="modalTerms"
                                                checked={
                                                    modalTermsChecked
                                                }
                                                onChange={(e) =>
                                                    setModalTermsChecked(
                                                        e
                                                            .target
                                                            .checked
                                                    )
                                                }
                                                className="mt-1"
                                            />

                                            <label
                                                htmlFor="modalTerms"
                                                className="text-sm text-slate-700"
                                            >
                                                I agree to these Terms & Conditions
                                            </label>

                                        </div>

                                    </div>


                                    {/* FOOTER */}

                                    <div className="border-t p-6 flex justify-end gap-3">

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setIsModalOpen(
                                                    false
                                                )
                                            }
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="button"
                                            disabled={
                                                !modalTermsChecked
                                            }
                                            onClick={() => {

                                                if (
                                                    !modalTermsChecked
                                                ) {
                                                    return;
                                                }

                                                setIsModalOpen(
                                                    false
                                                );

                                            }}
                                        >
                                            Accept
                                        </Button>

                                    </div>

                                </div>

                            </div>
                        )}


                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <div className="border-t pt-8">

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition"
                            >

                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </span>
                                ) : (
                                    "Continue To Payment"
                                )}

                            </button>


                            <p className="text-center text-xs text-slate-500 mt-4">
                                After payment, your hosting account will be provisioned automatically.
                                Requested business email accounts will be created after hosting activation.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </form>
    );
}