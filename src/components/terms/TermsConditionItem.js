const TermsConditionItem = ({
    condition,
    checked,
    onChange,
}) => {
    return (
        <label
            className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition ${
                checked
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
            }`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="mt-1 h-4 w-4 cursor-pointer"
            />

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">
                        {condition.title}
                    </h3>

                    {condition.required && (
                        <span className="text-xs font-medium text-red-500">
                            Required
                        </span>
                    )}
                </div>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                    {condition.description}
                </p>
            </div>
        </label>
    );
};

export default TermsConditionItem;