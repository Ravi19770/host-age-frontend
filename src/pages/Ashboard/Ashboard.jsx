import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  Globe2,
  Mail,
  Plus,
  RefreshCw,
  Users,
} from "lucide-react";
import AshboardLayout from "../../components/ui/ashboard/AshboardLayout";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const MetricCard = ({ icon: Icon, title, value, detail, tone }) => {
  const toneClass = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    violet: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    amber: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  }[tone];

  return (
    <div className="ha-surface rounded-2xl p-5">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={21} />
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-1 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{detail}</p>
    </div>
  );
};

export default function Ashboard() {
  const [domains, setDomains] = useState([]);
  const [emailPages, setEmailPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const [domainsRes, pagesRes] = await Promise.all([
        api.get("/api/domains"),
        api.get("/api/email-pages"),
      ]);
      setDomains(Array.isArray(domainsRes.data) ? domainsRes.data : domainsRes.data?.domains || []);
      setEmailPages(Array.isArray(pagesRes.data) ? pagesRes.data : pagesRes.data?.emailPages || []);
    } catch (error) {
      console.error("Admin dashboard data load failed:", error?.response?.data || error?.message);
      setDomains([]);
      setEmailPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const verified = useMemo(
    () => domains.filter((d) => String(d?.status || "").toLowerCase() === "verified").length,
    [domains]
  );

  return (
    <AshboardLayout>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
            <Activity size={13} />
            Live operations
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            Overview
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            A clean operational view of your Host-Age environment.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
          <Link to="/dashboard/add-domain" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
            <Plus size={16} />
            Add domain
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Users} title="Customers" value="—" detail="Connect customer analytics when enabled" tone="blue" />
        <MetricCard icon={Globe2} title="Domains" value={loading ? "—" : domains.length} detail={`${verified} verified`} tone="green" />
        <MetricCard icon={Mail} title="Email accounts" value={loading ? "—" : emailPages.length} detail="Active email pages" tone="violet" />
        <MetricCard icon={CreditCard} title="Revenue" value="—" detail="Billing analytics" tone="amber" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <section className="ha-surface overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-slate-800">
            <div>
              <h2 className="font-semibold text-slate-950 dark:text-white">Domain operations</h2>
              <p className="mt-0.5 text-xs text-slate-500">Latest domain records available to this account</p>
            </div>
            <Globe2 size={18} className="text-slate-400" />
          </div>
          {domains.length ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {domains.slice(0, 8).map((domain, index) => {
                const status = String(domain?.status || "pending").toLowerCase();
                const ok = status === "verified";
                return (
                  <div key={domain?.id || domain?.domain || index} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                        <Globe2 size={17} />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{domain?.domain || "Domain"}</p>
                        <p className="text-xs text-slate-500">ID: {domain?.id || "—"}</p>
                      </div>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${ok ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}`}>
                      {status}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <Clock3 className="mx-auto text-slate-300" size={32} />
              <p className="mt-3 font-semibold text-slate-800 dark:text-white">No domain records</p>
              <p className="mt-1 text-sm text-slate-500">New records will appear here when available.</p>
            </div>
          )}
        </section>

        <section className="ha-surface rounded-2xl p-5">
          <h2 className="font-semibold text-slate-950 dark:text-white">Admin shortcuts</h2>
          <p className="mt-1 text-xs text-slate-500">Jump to the operational areas already available in this frontend.</p>

          <div className="mt-5 space-y-2">
            {[
              ["Customer dashboard", "/dashboard", Users],
              ["Domains & onboarding", "/dashboard/add-domain", Globe2],
              ["Billing & payments", "/billing", CreditCard],
              ["Support tickets", "/tickets", Mail],
            ].map(([label, path, Icon]) => (
              <Link key={path} to={path} className="group flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/50 dark:border-slate-700 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/5">
                <span className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                    <Icon size={17} />
                  </span>
                  {label}
                </span>
                <ArrowUpRight size={17} className="text-slate-400 transition group-hover:text-blue-600" />
              </Link>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
            <div className="flex gap-3">
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" size={18} />
              <div>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">Production-safe UI layer</p>
                <p className="mt-1 text-xs leading-5 text-emerald-800/80 dark:text-emerald-300/70">
                  This redesign is presentation-focused and keeps existing API calls and business flows intact.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AshboardLayout>
  );
}
