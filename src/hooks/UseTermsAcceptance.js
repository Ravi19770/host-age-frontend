import { useState } from "react";
import { termsConditions } from "../components/terms/TermsData";
import { validateTermsAcceptance } from "../pages/AddDomain/utils/termsValidation";


const useTermsAcceptance = () => {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);

    const openTermsModal = () => {
        setShowTermsModal(true);
    };

    const closeTermsModal = () => {
        setShowTermsModal(false);
    };

    const acceptTerms = () => {
        setTermsAccepted(true);
        setShowTermsModal(false);
    };

    const validateAcceptance = () => {
        return validateTermsAcceptance(termsAccepted);
    };

    return {
        termsAccepted,
        setTermsAccepted,

        showTermsModal,

        // IMPORTANT
        openTermsModal,
        closeTermsModal,

        acceptTerms,
        validateAcceptance,

        termsConditions,
    };
};

export default useTermsAcceptance;