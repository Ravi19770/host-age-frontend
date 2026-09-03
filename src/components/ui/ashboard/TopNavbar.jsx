import React from "react";
import { Bell, Search, Menu, ChevronDown, UserCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function TopNavbar({ onMenu }) {
  const { user } = useAuth();
  const name = user?.fullName || user?.name || "Admin";
  const role = user?.role || "Administrator";

  return (
    <header className="sticky top-0 z-20 h-20 border-b border-slate-200/80 bg-white/85 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85 sm:px-6 lg:px-8">
      <div className="flex h-full items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin workspace</p>
          <p className="text-xs text-slate-500">Manage Host-Age customers, domains and operations</p>
        </div>

        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input
            aria-label="Search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:focus:bg-slate-900"
          />
          <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 lg:block dark:border-slate-700 dark:bg-slate-800">
            /
          </kbd>
        </div>

        <button className="relative rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-950" />
        </button>

        <div className="hidden h-8 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

        <button className="flex items-center gap-3 rounded-xl p-1.5 pr-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
            {name.slice(0, 1).toUpperCase()}
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="block max-w-32 truncate text-sm font-semibold text-slate-800 dark:text-white">{name}</span>
            <span className="block text-[11px] text-slate-500">{role}</span>
          </span>
          <ChevronDown size={16} className="hidden text-slate-400 md:block" />
        </button>
      </div>
    </header>
  );
}
