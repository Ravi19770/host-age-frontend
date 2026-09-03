const SaveButton = ({
  loading,
}) => {
  return (
    <button
      className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
    >
      {loading ? "Saving..." : "Save Changes"}
    </button>
  );
};

export default SaveButton;