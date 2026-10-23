import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Globe2,
  LogOut,
  Mail,
  Plus,
  RefreshCw,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import ChatBot from "../components/ChatBot";
import ThemeToggle from "../components/ThemeToggle";
import DnsSetupPanel from "../components/DnsSetupPanel";

const Stat = ({ icon: Icon, label, value, helper, tone = "blue" }) => {
  const tones = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  };
  return (
    <div className="ha-surface rounded-2xl p-5 transition hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}>
          <Icon size={21} />
        </div>
        <Activity size={16} className="text-emerald-500" />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{helper}</p>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [domains, setDomains] = useState([]);
  const [emailPages, setEmailPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [health, setHealth] = useState(null);
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [verifyingDns, setVerifyingDns] = useState(false);
  const [dnsMessage, setDnsMessage] = useState("");
  const [fetchError, setFetchError] = useState("");

  
const fetchData = async () => {
  setLoading(true);
  setFetchError("");

  try {
    const results = await Promise.allSettled([
      api.get("/api/domains"),
      api.get("/api/email-pages"),
      api.get("/api/health"),
    ]);

    // An expired session should return the customer to login.
    const unauthorized = results.some(
      (result) =>
        result.status === "rejected" &&
        result.reason?.response?.status === 401
    );

    if (unauthorized) {
      await logout();
      navigate("/login", { replace: true });
      return;
    }

    const [domainsResult, pagesResult, healthResult] = results;

    if (domainsResult.status === "fulfilled") {
      const data = domainsResult.value.data;
      const list = Array.isArray(data)
        ? data
        : data?.domains;

      if (Array.isArray(list)) {
        setDomains(list);
      } else {
        setFetchError("The domains API returned an invalid response.");
      }
    } else {
      setFetchError("Could not load domains. Please refresh.");
    }

    if (pagesResult.status === "fulfilled") {
      const data = pagesResult.value.data;
      const list = Array.isArray(data)
        ? data
        : data?.emailPages;

      if (Array.isArray(list)) {
        setEmailPages(list);
      } else {
        setFetchError((previous) =>
          previous || "The email pages API returned an invalid response."
        );
      }
    } else {
      setFetchError((previous) =>
        previous || "Could not load email accounts."
      );
    }

    if (healthResult.status === "fulfilled") {
      setHealth(healthResult.value.data);
    } else {
      setHealth(null);
      setFetchError((previous) =>
        previous || "Service health is currently unavailable."
      );
    }
  } catch (error) {
    console.error("Dashboard request failed:", error);
    setFetchError("Unable to load dashboard data. Please try again.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
    // dashboard should refresh only when the screen is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeDomains = useMemo(
    () => domains.filter((d) => String(d?.status || "").toLowerCase() === "verified").length,
    [domains]
  );

  const displayName = user?.fullName || user?.name || user?.email?.split("@")[0] || "there";
  const emailLimit = user?.emailLimit || 6;
  const selectedDomain = useMemo(
    () =>
      domains.find(
        (domain) => String(domain.id) === String(selectedDomainId)
      ) || null,
    [domains, selectedDomainId]
  );
  useEffect(() => {
  if (domains.length === 0) {
    setSelectedDomainId("");
    return;
  }

  const selectionExists = domains.some(
    (domain) =>
      String(domain.id) === String(selectedDomainId)
  );

  if (!selectionExists) {
    setSelectedDomainId(String(domains[0].id));
  }
}, [domains, selectedDomainId]);

  const handleVerifyDns = async () => {
    if (!selectedDomain?.id) {
      setDnsMessage("Please select a domain first.");
      return;
    }

    setDnsMessage(
      "DNS verification is not configured yet. No verification was performed."
    );
  };
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="ha-page">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <img
              src="/assets/Host-age3.png"
              alt="Host-Age"
              className="h-10 w-[140px] object-contain"
            />
          </Link>

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
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden h-8 w-px bg-slate-200 sm:block dark:bg-slate-800" />
            <div className="hidden text-right sm:block">
              <p className="max-w-32 truncate text-xs font-semibold text-slate-800 dark:text-white">{displayName}</p>
              <p className="text-[11px] text-slate-500">Customer</p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>



      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">

        {fetchError && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300"
          >
            <div className="flex items-center justify-between gap-3">
              <p>{fetchError}</p>
              <button
                type="button"
                onClick={fetchData}
                disabled={loading}
                className="shrink-0 font-semibold underline disabled:opacity-50"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Connect Your Domain
          </h2>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Log in to your domain provider and update the DNS settings
            using the records provided by Host-Age.
          </p>

          <label
            htmlFor="dns-domain-select"
            className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Select your domain
          </label>

          <select
            id="dns-domain-select"
            value={selectedDomainId}
            onChange={(event) => {
              setSelectedDomainId(event.target.value);
              setDnsMessage("");
            }}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          >
            <option value="">Choose a domain</option>

            {domains.map((domain) => (
              <option key={domain.id} value={String(domain.id)}>
                {domain.domain}
              </option>
            ))}
          </select>


          {selectedDomain && (
            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white">
                {selectedDomain.domain}
              </p>

              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
                <li>Log in to the company where you purchased your domain.</li>
                <li>Open Domain Settings or DNS Management.</li>
                <li>Enter the DNS records provided by Host-Age.</li>
                <li>Save the changes and wait for DNS propagation.</li>
                <li>Return to Host-Age to check the connection status.</li>
              </ol>

              <DnsSetupPanel
                domainName={selectedDomain.domain}
                records={selectedDomain.dnsRecords || []}
                status={selectedDomain.dnsStatus || "pending"}
                onVerify={handleVerifyDns}
                verifying={verifyingDns}
              />

              <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
                Do not delete existing email-related DNS records unless
                Host-Age specifically instructs you to change them.
              </p>
            </div>
          )}

        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={Globe2} label="Domains" value={loading ? "—" : domains.length} helper={`${activeDomains} verified`} />
          <Stat icon={Mail} label="Email accounts" value={loading ? "—" : `${emailPages.length}/${emailLimit}`} helper="Business mailbox capacity" tone="green" />
          <Stat
            icon={ShieldCheck}
            label="Hosting status"
            value={
              loading
                ? "—"
                : String(health?.services?.hosting || "").toLowerCase() === "operational"
                  ? "Operational"
                  : health
                    ? "Unavailable"
                    : "Unknown"
            }
            helper="Platform hosting service health; not individual website deployment status"
            tone="violet"
          />
          <Stat
            icon={WalletCards}
            label="Current plan"
            value={user?.plan || "No Plan"}
            helper="Manage plan & billing"
            tone="amber"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="ha-surface rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
              <div>
                <h2 className="font-semibold text-slate-950 dark:text-white">Your domains</h2>
                <p className="mt-0.5 text-xs text-slate-500">Recent domains connected to Host-Age</p>
              </div>
              <button onClick={fetchData} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800" title="Refresh">
                <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
            {loading ? (
              <div className="space-y-3 p-5">
                {[1, 2, 3].map((i) => <div key={i} className="h-14 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />)}
              </div>
            ) : domains.length ? (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {domains.slice(0, 5).map((domain, index) => {
                  const status = String(domain?.status || "pending").toLowerCase();
                  const verified = status === "verified";
                  return (
                    <div key={domain?.id || domain?.domain || index} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                          <Globe2 size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{domain?.domain || "Domain"}</p>
                          <p className="text-xs text-slate-500">{domain?.expiryDate ? `Expires ${domain.expiryDate}` : "Domain service"}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${verified ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}>
                        {verified
                          ? "Verified"
                          : status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-5 py-12 text-center">
                <Globe2 className="mx-auto text-slate-300 dark:text-slate-600" size={34} />
                <p className="mt-3 font-semibold text-slate-800 dark:text-white">No domains yet</p>
                <p className="mt-1 text-sm text-slate-500">Connect your first domain to get started.</p>
                <Link to="/dashboard/add-domain" className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
                  <Plus size={16} /> Add domain
                </Link>
              </div>
            )}
          </section>

          <section className="ha-surface rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <CheckCircle2 size={19} />
              </div>

              <div>
                <h2 className="font-semibold text-slate-950 dark:text-white">
                  Service health
                </h2>

                <p className="text-xs text-slate-500">
                  Live workspace status
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {[
                {
                  name: "Hosting",
                  status: health?.services?.hosting,
                },
                {
                  name: "Email service",
                  status: health?.services?.email,
                },
                {
                  name: "Security",
                  status: health?.services?.security,
                },
              ].map(({ name, status }) => {
                const isOperational =
                  String(status || "").toLowerCase() === "operational";

                const isLoading = !health;

                return (
                  <div
                    key={name}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 dark:bg-slate-800/60"
                  >
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                      {name}
                    </span>

                    {isLoading ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-400" />
                        Checking...
                      </span>
                    ) : (
                      <span
                        className={`flex items-center gap-1.5 text-xs font-semibold ${isOperational
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                          }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${isOperational
                            ? "bg-emerald-500"
                            : "bg-red-500"
                            }`}
                        />

                        {isOperational ? "Operational" : "Unavailable"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <Link
              to="/tickets"
              className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-200"
            >
              Need help?
              <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </main>

      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black text-white shadow-xl shadow-blue-600/25 transition hover:-translate-y-1 hover:bg-blue-700"
        aria-label="Open support chat"
      >
        HA
      </button>
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default Dashboard;

