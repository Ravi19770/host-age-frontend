import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Menu, X } from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "../../components/ui/button";
import ThemeToggle from "../../components/ThemeToggle";

import TicketCard from "../../components/ticket/TicketCard";
// import TicketTable from "../../components/ticket/TicketTable";

const MyTickets = () => {
  const [search, setSearch] = useState("");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Tickets API Response:", res.data);

      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Fetch Tickets Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = tickets.filter((ticket) =>
    ticket.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/dashboard"
            className="flex shrink-0 items-center"
            onClick={() => setMobileMenuOpen(false)}
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
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

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
                 <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-slate-200/80 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950"
          >
            <nav className="flex flex-col gap-1">
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
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {label}
                </Link>
              ))}
            
            </nav>
          </div>
        )}
           
      </header>
      <div className="max-w-7xl mx-auto p-8">

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              Support Tickets
            </h1>

            <p className="text-gray-500">
              Manage your support requests
            </p>
          </div>

          <Link
            to="/tickets/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            + Create Ticket
          </Link>

        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">

          <div className="flex items-center gap-3">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none"
            />

          </div>

        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-500">
            Loading Tickets...
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No Tickets Found
          </div>
        ) : (
          <div className="space-y-5">

            {filtered.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyTickets;