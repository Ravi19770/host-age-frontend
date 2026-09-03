import React, { useMemo, useState } from "react";
import { termsConditions } from "./TermsData";

const TermsModal = ({
    isOpen,
    onClose,
    onAccept,
}) => {
    // Individual checkbox state
    const [acceptedItems, setAcceptedItems] = useState({});

    const conditions = useMemo(() => {
        return [
            {
                id: "terms",
                label: "I have read and agree to the Host-Age Terms & Conditions.",
                type: "link",
                href: "/terms-and-conditions",
                linkText: "Terms & Conditions",
            },
            {
                id: "refund",
                label: "I have read and agree to the Host-Age Refund Policy.",
                type: "link",
                href: "/Refund-policy",
                linkText: "Refund Policy",
            },
            {
                id: "no-cpanel",
                label: "I understand that no cPanel access is provided to customers.",
            },
            {
                id: "non-refundable",
                label: "I understand that payments are non-refundable once the service is activated.",
            },
            {
                id: "hosting",
                label: "I understand that Host-Age provides secure and reliable hosting services.",
            },
            {
                id: "content",
                label: "I understand that I am responsible for the content and files hosted under my account.",
            },
            {
                id: "policies",
                label: "I agree to use the hosting service in accordance with Host-Age policies.",
            },
        ];
    }, []);

    // Do not render modal when closed
    if (!isOpen) {
        return null;
    }

    // Checkbox toggle
    const toggleCondition = (id) => {
        setAcceptedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    // Check whether ALL conditions are accepted
    const allAccepted = conditions.every(
        (condition) => acceptedItems[condition.id] === true
    );

    // Accept button
    const handleAccept = () => {
        if (!allAccepted) {
            return;
        }

        if (onAccept) {
            onAccept();
        }
    };

    const acceptedCount = conditions.filter(
        (condition) => acceptedItems[condition.id] === true
    ).length;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 p-4">

            {/* Modal */}
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-5">

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Terms & Conditions
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Please review and accept all conditions before
                            continuing.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-gray-700"
                        aria-label="Close"
                    >
                        ×
                    </button>

                </div>

                {/* Body */}
                <div className="max-h-[65vh] overflow-y-auto px-6 py-5">

                    {/* Terms Content */}
                    {termsConditions?.map((term, index) => (
                        <div
                            key={term.id || index}
                            className="mb-5"
                        >
                            <h3 className="mb-2 font-semibold text-gray-900">
                                {term.title}
                            </h3>

                            <p className="text-sm leading-6 text-gray-600">
                                {term.content}
                            </p>
                        </div>
                    ))}

                    {/* Acceptance Conditions */}
                    <div className="mt-6 border-t pt-5">

                        <h3 className="mb-4 text-base font-bold text-gray-900">
                            Please confirm each condition
                        </h3>

                        <div className="space-y-3">

                            {conditions.map((condition) => (
                                <label
                                    key={condition.id}
                                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50"
                                >

                                    <input
                                        type="checkbox"
                                        checked={
                                            acceptedItems[condition.id] || false
                                        }
                                        onChange={() =>
                                            toggleCondition(condition.id)
                                        }
                                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer"
                                    />

                                    <span className="text-sm leading-6 text-gray-700">

                                        {condition.type === "link" ? (
                                            <>
                                                {condition.id === "terms" ? (
                                                    <>
                                                        I have read and agree
                                                        to the{" "}
                                                        <a
                                                            href={condition.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="font-semibold text-blue-600 hover:underline"
                                                        >
                                                            {condition.linkText}
                                                        </a>
                                                        .
                                                    </>
                                                ) : (
                                                    <>
                                                        I have read and agree
                                                        to the{" "}
                                                        <a
                                                            href={condition.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            className="font-semibold text-blue-600 hover:underline"
                                                        >
                                                            {condition.linkText}
                                                        </a>
                                                        .
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            condition.label
                                        )}

                                    </span>

                                </label>
                            ))}

                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t bg-gray-50 px-6 py-4">

                    <div className="mb-4 flex items-center justify-between">

                        <span className="text-sm text-gray-500">
                            {acceptedCount} of {conditions.length} conditions
                            accepted
                        </span>

                        {!allAccepted && (
                            <span className="text-sm font-medium text-red-500">
                                Please accept all conditions
                            </span>
                        )}

                        {allAccepted && (
                            <span className="text-sm font-medium text-green-600">
                                ✓ All conditions accepted
                            </span>
                        )}

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={!allAccepted}
                            onClick={handleAccept}
                            className={`rounded-lg px-6 py-2.5 font-semibold text-white transition ${allAccepted
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "cursor-not-allowed bg-gray-400"
                                }`}
                        >
                            Accept & Continue
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default TermsModal;