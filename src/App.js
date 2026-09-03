import React from "react";
import { Routes, Route } from "react-router-dom";

// Main Pages
import ServicePage from "./pages/ServicePage";
import LoginPage from "./pages/LoginPage";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import Ashboard from "./pages/Ashboard/Ashboard";

// Registration
import RegistrationWizard from "./pages/Registration/RegistrationWizardd";

// Domain
import AddDomainPage from "./pages/AddDomainPage";
import ExistingDomain from "./pages/ExistingDomain";
import DomainSearch from "./pages/DomainSearch";
import DomainSelect from "./pages/DomainSelect";

// Billing & Payment
import Billing from "./pages/Billing";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// Authentication
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

// Tickets
import TicketRoutes from "./routes/TicketRoutes";

// Chat
import ChatBot from "./components/ChatBot";

// PrivacyPolicy
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";

// Settings
import General from "./pages/settings/General";
import Security from "./pages/settings/Security";
import Notifications from "./pages/settings/Notifications";
import SettingsHeader from "./pages/settings/SettingsHeeader";
import ThemeToggle from "./components/ThemeToggle";
import AddDomainPages from "./pages/AddDomain/AddDomainPages";

function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<ServicePage />} />
      <Route path="/pricing" element={<ServicePage />} />

      {/* Authentication */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationWizard />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/welcome" element={<WelcomePage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ashboard" element={<Ashboard />} />

      {/* Domain */}
      <Route path="/add-domain" element={<AddDomainPage />} />
      <Route path="/existing-domain" element={<ExistingDomain />} />
      <Route path="/domain/search" element={<DomainSearch />} />
      <Route path="/domain/select" element={<DomainSelect />} />

      {/* Billing */}
      <Route path="/billing" element={<Billing />} />
      <Route path="/domain/billing" element={<Billing />} />
      <Route
        path="/payment-success/:paymentId"
        element={<PaymentSuccessPage />}
      />

      {/* Tickets */}
      <Route path="/tickets/*" element={<TicketRoutes />} />

      {/* Chat */}
      <Route path="/chatbot/support" element={<ChatBot />} />

      {/* Settings */}
      <Route path="/settings/header" element={<SettingsHeader />} />
      <Route path="/settings/general" element={<General />} />
      <Route path="/settings/security" element={<Security />} />
      <Route
        path="/settings/notifications"
        element={<Notifications />}
      />

      {/* Theme */}


      <Route path="/components/themeTtoggle" element={< ThemeToggle />} />


      {/* PrivacyPolicy */}

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
  
  



      <Route
        path="/dashboard/add-domain"
        element={<AddDomainPages />}
      />

      

    </Routes>
  );
}

export default App;