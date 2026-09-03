import React from "react";
import {
  LayoutDashboard,
  Globe,
  Mail,
  CreditCard,
  Receipt,
  LifeBuoy,
  Bell,
  Settings,
  LogOut,
  X,
  ShieldCheck,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const menu = [
  { name: "Overview", icon: LayoutDashboard, path: "/ashboard" },
  { name: "Domains", icon: Globe, path: "/dashboard/add-domain" },
  { name: "Email Accounts", icon: Mail, path: "/dashboard" },
  { name: "Payments", icon: CreditCard, path: "/billing" },
  { name: "Invoices", icon: Receipt, path: "/billing" },
  { name: "Support", icon: LifeBuoy, path: "/tickets" },
  { name: "Notifications", icon: Bell, path: "/settings/notifications" },
  { name: "Settings", icon: Settings, path: "/settings/general" },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800/80 bg-slate-950 text-white shadow-2xl transition-transform duration-200 lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <NavLink to="/ashboard" className="flex items-center gap-3" onClick={onClose}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black shadow-lg shadow-blue-500/20">
            HA
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight">Host-Age</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[.22em] text-slate-400">
              Admin Console
            </span>
          </span>
        </NavLink>
        <button className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pt-6">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[.18em] text-slate-500">
          Workspace
        </p>
        <nav className="space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="mb-3 rounded-2xl border border-white/10 bg-white/[.04] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold">System healthy</p>
              <p className="text-xs text-slate-500">All core services online</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
        >
          <LogOut size={19} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
