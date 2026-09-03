import React from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Search, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">
            🎉 Welcome to HostAge
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Your account has been created successfully.
          </p>

          <p className="text-slate-500">
            Let's connect your domain and start hosting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Existing Domain */}

          <div className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-lg transition">

            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
              <Globe className="text-blue-600" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              I already own a domain
            </h2>

            <p className="text-slate-600 mb-8">
              Connect your existing domain with our hosting platform.
            </p>

            <Button
              className="w-full"
              onClick={() => navigate("/existing-domain")}
            >
              Connect Domain
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

          </div>

          {/* Buy Domain */}

          <div className="bg-white rounded-2xl shadow-sm border p-8 hover:shadow-lg transition">

            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6">
              <Search className="text-green-600" />
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Register a new domain
            </h2>

            <p className="text-slate-600 mb-8">
              Search millions of domain names and register yours today.
            </p>

            <Button
              className="w-full"
              onClick={() => navigate("/search-domain")}
            >
              Search Domain
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

          </div>

        </div>

        <div className="text-center mt-12">

          <button
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/dashboard")}
          >
            Skip for now →
          </button>

        </div>

      </div>
    </div>
  );
};

export default WelcomePage;