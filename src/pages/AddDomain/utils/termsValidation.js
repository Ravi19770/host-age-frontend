
export const validateTermsAcceptance = (accepted) => {
    if (!accepted) {
        return {
            valid: false,
            message: "Please accept the Terms & Conditions before continuing.",
        };
    }

    return {
        valid: true,
        message: "",
    };
};

export const isTermsAccepted = (value) => {
    return value === true;
};

export default validateTermsAcceptance;