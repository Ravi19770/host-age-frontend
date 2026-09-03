import { useEffect, useState } from "react";
import axios from "axios";

import SettingsCard from "./SettingsCard";
import ToggleSwitch from "./ToggleSwitch";
import SaveButton from "./components/SaveButton";

const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const defaultSettings = {
  email: true,
  sms: false,
  support: true,
  invoice: true,
  renewal: true,
  maintenance: false,
};

const Notifications = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // GET NOTIFICATION SETTINGS
  // =====================================================
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required.");
          return;
        }

        const response = await axios.get(
          `${API_URL}/api/settings/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "NOTIFICATION SETTINGS:",
          response.data
        );

        if (
          response.data?.success &&
          response.data?.settings
        ) {
          const serverSettings =
            response.data.settings;

          setSettings({
            email:
              serverSettings.email ??
              serverSettings.emailNotifications ??
              defaultSettings.email,

            sms:
              serverSettings.sms ??
              serverSettings.smsNotifications ??
              defaultSettings.sms,

            support:
              serverSettings.support ??
              serverSettings.supportTicketUpdates ??
              defaultSettings.support,

            invoice:
              serverSettings.invoice ??
              serverSettings.invoicePaymentAlerts ??
              defaultSettings.invoice,

            renewal:
              serverSettings.renewal ??
              serverSettings.renewalReminders ??
              defaultSettings.renewal,

            maintenance:
              serverSettings.maintenance ??
              serverSettings.maintenanceAnnouncements ??
              defaultSettings.maintenance,
          });
        }
      } catch (err) {
        console.error(
          "❌ GET NOTIFICATION SETTINGS ERROR:",
          err?.response?.data || err
        );

        setError(
          err?.response?.data?.message ||
            "Failed to load notification settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // =====================================================
  // TOGGLE
  // =====================================================
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));

    setSuccess("");
    setError("");
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================
  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required.");
        return;
      }

      console.log(
        "📤 SAVING NOTIFICATION SETTINGS:",
        settings
      );

      const response = await axios.put(
        `${API_URL}/api/settings/notifications`,
        settings,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "✅ SAVE NOTIFICATION SETTINGS RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        setSuccess(
          "Notification settings saved successfully."
        );

        // Use server-returned values if available
        if (response.data?.settings) {
          const saved =
            response.data.settings;

          setSettings({
            email:
              saved.email ??
              saved.emailNotifications ??
              settings.email,

            sms:
              saved.sms ??
              saved.smsNotifications ??
              settings.sms,

            support:
              saved.support ??
              saved.supportTicketUpdates ??
              settings.support,

            invoice:
              saved.invoice ??
              saved.invoicePaymentAlerts ??
              settings.invoice,

            renewal:
              saved.renewal ??
              saved.renewalReminders ??
              settings.renewal,

            maintenance:
              saved.maintenance ??
              saved.maintenanceAnnouncements ??
              settings.maintenance,
          });
        }
      } else {
        setError(
          response.data?.message ||
            "Failed to save notification settings."
        );
      }
    } catch (err) {
      console.error(
        "❌ SAVE NOTIFICATION SETTINGS ERROR:",
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to save notification settings."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================
  if (loading) {
    return (
      <SettingsCard
        title="Notifications"
        description="Manage how you receive notifications."
      >
        <div className="p-6 text-center text-gray-500">
          Loading notification settings...
        </div>
      </SettingsCard>
    );
  }

  // =====================================================
  // UI
  // =====================================================
  return (
    <SettingsCard
      title="Notifications"
      description="Manage how you receive notifications."
    >
      <div className="space-y-5">

        <NotificationRow
          title="Email Notifications"
          checked={settings.email}
          onChange={() =>
            handleToggle("email")
          }
        />

        <NotificationRow
          title="SMS Notifications"
          checked={settings.sms}
          onChange={() =>
            handleToggle("sms")
          }
        />

        <NotificationRow
          title="Support Ticket Updates"
          checked={settings.support}
          onChange={() =>
            handleToggle("support")
          }
        />

        <NotificationRow
          title="Invoice & Payment Alerts"
          checked={settings.invoice}
          onChange={() =>
            handleToggle("invoice")
          }
        />

        <NotificationRow
          title="Renewal Reminders"
          checked={settings.renewal}
          onChange={() =>
            handleToggle("renewal")
          }
        />

        <NotificationRow
          title="Maintenance Announcements"
          checked={settings.maintenance}
          onChange={() =>
            handleToggle("maintenance")
          }
        />

        {/* ERROR */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-600">
            {success}
          </div>
        )}

        {/* SAVE */}
        <div className="flex justify-end pt-4">
          <div
            onClick={
              saving ? undefined : handleSubmit
            }
          >
            <SaveButton loading={saving} />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

const NotificationRow = ({
  title,
  checked,
  onChange,
}) => (
  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
    <span className="font-medium text-gray-700">
      {title}
    </span>

    <ToggleSwitch
      checked={checked}
      onChange={onChange}
    />
  </div>
);

export default Notifications;