import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Step1Account from "./steps/Step1Account";
import Step2Plan from "./steps/Step2Plan";
import Step3Payment from "./steps/Step3Payment";

import Step4Domain from "./Step4Domain";
import Step5Email from "./Step5Email";


const RegistrationWizardd = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [currentStep, setCurrentStep] = useState(1);

    const [registrationData, setRegistrationData] = useState({
        user: null,
        token: "",
        selectedPlan: null,
        payment: null,
        domain: "",
        emailPages: [],
    });

    useEffect(() => {
        const step = parseInt(searchParams.get("step"), 10);

        if (!isNaN(step) && step >= 1 && step <= 3) {
            setCurrentStep(step);
        }
    }, [searchParams]);

    useEffect(() => {
        console.log("Current Step:", currentStep);
        console.log("Registration Data:", registrationData);
    }, [currentStep, registrationData]);

    const handleFinish = () => {
        console.log("Registration Completed");

        // Navigate to dashboard after successful payment
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div 
      className={`mx-auto px-4 ${
        currentStep === 2 || currentStep === 3
          ? "max-w-7xl"
          : "max-w-3xl"
      }`}
      >
                {currentStep === 1 && (
                    <Step1Account
                        data={registrationData}
                        setData={setRegistrationData}
                        nextStep={() => setCurrentStep(2)}
                    />
                )}

                {currentStep === 2 && (
                    <Step2Plan
                        data={registrationData}
                        setData={setRegistrationData}
                        nextStep={() => setCurrentStep(3)}
                        prevStep={() => setCurrentStep(1)}
                    />
                )}

                {currentStep === 3 && (
                    <Step3Payment
                        data={registrationData}
                        setData={setRegistrationData}
                        nextStep={handleFinish}
                        prevStep={() => setCurrentStep(2)}
                    />
                )}
                {currentStep === 4 && (
                    <Step4Domain
                        data={registrationData}
                        setData={setRegistrationData}
                        nextStep={() => setCurrentStep(5)}
                        prevStep={() => setCurrentStep(3)}
                    />
                )}

                {currentStep === 5 && (
                    <Step5Email
                        data={registrationData}
                        setData={setRegistrationData}
                        nextStep={() => navigate("/dashboard")}
                        prevStep={() => setCurrentStep(4)}
                    />
                )}


            </div>
        </div>
    );
};

export default RegistrationWizardd;