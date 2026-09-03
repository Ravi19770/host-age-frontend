import React, { useState } from "react";
import TermsModal from "./TermsModal";

const TermsCheckbox = ({
    accepted,
    onAcceptedChange,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAccept = () => {
        onAcceptedChange(true);
    };

    const handleMainCheckbox = () => {
        if (!accepted) {
            setIsModalOpen(true);
        } else {
            onAcceptedChange(false);
        }
    };

    return (
        <>
            <div className="mt-8">
                <label className="flex items-start gap-3">

                    <input
                        type="checkbox"
                        checked={accepted}
                        onChange={handleMainCheckbox}
                        className="mt-1 h-4 w-4 cursor-pointer"
                    />

                    <span className="text-sm leading-6 text-gray-600">

                        I agree to the{" "}

                        <button
                            type="button"
                            onClick={() =>
                                setIsModalOpen(true)
                            }
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Terms & Conditions
                        </button>

                        {" "}and{" "}

                        <button
                            type="button"
                            onClick={() =>
                                setIsModalOpen(true)
                            }
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Refund Policy
                        </button>

                        .
                    </span>
                </label>
            </div>

            <TermsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAccept={handleAccept}
            />
        </>
    );
};

export default TermsCheckbox;