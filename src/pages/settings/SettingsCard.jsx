const SettingsCard = ({ title, description, children }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="mt-1 text-gray-500">{description}</p>
      </div>

      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default SettingsCard;