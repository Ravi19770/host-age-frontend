import SettingsCard from "./components/SettingsCard";

const TemporaryGeneral = () => {
  return (
    <SettingsCard
      title="General Settings"
      description="Manage your personal information."
    >
      <p className="text-gray-600">
        General settings content will go here.
      </p>
    </SettingsCard>
  );
};

export default TemporaryGeneral;