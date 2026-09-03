import { useState } from "react";

import SettingsCard from "./components/SettingsCard";
import SaveButton from "./components/SaveButton";
import SelectField from "./components/SelectField";
import RadioCard from "./components/RadioCard";

const Preferences = () => {
  const [loading, setLoading] = useState(false);

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12",
  });

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Preferences Updated");
    }, 1000);
  };

  return (
    <SettingsCard
      title="Preferences"
      description="Customize your account experience."
    >
      <div className="space-y-6">
        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Theme
          </label>

          <div className="grid grid-cols-3 gap-4">
            <RadioCard
              label="Light"
              name="theme"
              value="light"
              selected={preferences.theme}
              onChange={handleChange}
            />

            <RadioCard
              label="Dark"
              name="theme"
              value="dark"
              selected={preferences.theme}
              onChange={handleChange}
            />

            <RadioCard
              label="System"
              name="theme"
              value="system"
              selected={preferences.theme}
              onChange={handleChange}
            />
          </div>
        </div>

        <SelectField
          label="Language"
          name="language"
          value={preferences.language}
          onChange={handleChange}
          options={[
            { label: "English", value: "en" },
            { label: "Hindi", value: "hi" },
          ]}
        />

        <SelectField
          label="Timezone"
          name="timezone"
          value={preferences.timezone}
          onChange={handleChange}
          options={[
            { label: "Asia/Kolkata", value: "Asia/Kolkata" },
            { label: "UTC", value: "UTC" },
          ]}
        />

        <SelectField
          label="Date Format"
          name="dateFormat"
          value={preferences.dateFormat}
          onChange={handleChange}
          options={[
            { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
            { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
            { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
          ]}
        />

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Time Format
          </label>

          <div className="grid grid-cols-2 gap-4">
            <RadioCard
              label="12 Hours"
              name="timeFormat"
              value="12"
              selected={preferences.timeFormat}
              onChange={handleChange}
            />

            <RadioCard
              label="24 Hours"
              name="timeFormat"
              value="24"
              selected={preferences.timeFormat}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <div onClick={handleSubmit}>
            <SaveButton loading={loading} />
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

export default Preferences;