import axios from "axios";
import { useState } from "react";
import { Upload, ArrowLeft, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../../components/ThemeToggle";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    subject: "",
    department: "",
    category: "",
    priority: "Medium",
    description: "",
    attachment: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFile = (e) => {
    setFormData((prev) => ({
      ...prev,
      attachment: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("React State:", formData);
      const payload = new FormData();

      payload.append("subject", formData.subject);
      payload.append("department", formData.department);
      payload.append("category", formData.category);
      payload.append("priority", formData.priority);
      payload.append("description", formData.description);

      if (formData.attachment) {
        payload.append("attachments", formData.attachment);
      }

      console.log("===== FORMDATA =====");
      for (const [key, value] of payload.entries()) {
        console.log(key, value);
      }


      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/tickets",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }
      );
      console.log(response.data);

      alert("Ticket created successfully!");

      setFormData({
        subject: "",
        department: "",
        category: "",
        priority: "Medium",
        description: "",
        attachment: null,
      });

    } catch (error) {
      console.error("Full Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
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

      <div className="max-w-4xl mx-auto">

        {/*<Link
          to="/tickets"
          className="flex items-center gap-2 text-blue-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Tickets
        </Link>*/}

        <div className="bg-white rounded-2xl shadow">

          <div className="border-b p-8">

            <h1 className="text-3xl font-bold">
              Create Support Ticket
            </h1>

            <p className="text-gray-500 mt-2">
              Tell us about your issue and our support team will help you.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
          >

            <div>

              <label className="font-medium">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Example: Website is not loading"
                className="w-full mt-2 border rounded-lg p-3"
              />

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div>

                <label className="font-medium">
                  Department
                </label>

                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option value="">Select</option>
                  <option>Technical</option>
                  <option>Billing</option>
                  <option>Sales</option>
                  <option>Domains</option>
                  <option>Email Hosting</option>
                </select>

              </div>

              <div>

                <label className="font-medium">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option value="">Select</option>
                  <option>Hosting</option>
                  <option>VPS</option>
                  <option>SSL</option>
                  <option>DNS</option>
                  <option>Migration</option>
                </select>

              </div>

              <div>

                <label className="font-medium">
                  Priority
                </label>

                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full mt-2 border rounded-lg p-3"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>

              </div>

            </div>

            <div>

              <label className="font-medium">
                Description
              </label>

              <textarea
                rows={7}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Explain your issue in detail..."
                className="w-full mt-2 border rounded-lg p-3 resize-none"
              />

            </div>

            <div>

              <label className="font-medium block mb-2">
                Attachment
              </label>

              <label className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center cursor-pointer hover:border-blue-500">

                <Upload className="mb-3" />

                <span>
                  Click to upload screenshot
                </span>

                <input
                  type="file"
                  hidden
                  onChange={handleFile}
                />

              </label>

              {formData.attachment && (
                <p className="mt-3 text-green-600">
                  {formData.attachment.name}
                </p>
              )}

            </div>

            <div className="bg-blue-50 rounded-xl p-5">

              <h2 className="font-semibold mb-3">
                Estimated Response Time
              </h2>

              <div className="grid grid-cols-2 gap-4 text-sm">

                <p>Critical : 30 Minutes</p>

                <p>High : 2 Hours</p>

                <p>Medium : 8 Hours</p>

                <p>Low : 24 Hours</p>

              </div>

            </div>

            <div className="flex justify-end gap-4">

              <Link
                to="/tickets"
                className="border px-6 py-3 rounded-lg"
              >
                Cancel
              </Link>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Submit Ticket
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateTicket;