import { useState } from "react";

import SettingsCard from "./SettingsCard";
import PasswordInput from "./components/PasswordInput";
import SaveButton from "./components/SaveButton";

const Security = () => {

  const [loading, setLoading] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Password Updated");
    }, 1000);

  };

  return (
    <SettingsCard
      title="Security Settings"
      description="Manage your account password."
    >

      <div className="space-y-5">

        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
        />

      </div>

      <div className="mt-8 flex justify-end">

        <div onClick={handleSubmit}>
          <SaveButton loading={loading} />
        </div>

      </div>

    </SettingsCard>
  );
};

export default Security;