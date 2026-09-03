import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const AshboardLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-900 dark:text-slate-100">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {mobileOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex-1 min-w-0 flex flex-col lg:pl-72">
        <TopNavbar onMenu={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-5 left-5 z-20 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={21} />
      </button>
    </div>
  );
};

export default AshboardLayout;
