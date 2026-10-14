
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
    selectedPlanId: null,
    payment: null,
    domain: "",
    emailPages: [],
  });

  useEffect(() => {
    const step = Number(searchParams.get("step"));

    if (Number.isInteger(step) && step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  }, [searchParams]);

  useEffect(() => {
    console.log("Current Step:", currentStep);
    console.log("Selected Plan:", registrationData.selectedPlan);
  }, [currentStep, registrationData]);

  // Step 1 -> Step 2
  const handleAccountNext = () => {
    setCurrentStep(2);
  };

  // Step 2 -> Step 3 (Add Domain)
  const handlePlanNext = () => {
    setCurrentStep(3);
  };

  // Step 3 (Add Domain) -> FREE: Email, PAID: Payment
  const handleDomainNext = () => {
    const price = Number(registrationData.selectedPlan?.price);

    if (!registrationData.selectedPlan) {
      alert("Please select a hosting plan.");
      setCurrentStep(2);
      return;
    }

    if (price === 0) {
      setCurrentStep(5);
    } else {
      setCurrentStep(4);
    }
  };

  // Step 4 (Payment) -> Step 5 (Email)
  const handlePaymentSuccess = () => {
    setCurrentStep(5);
  };

  // Step 5 -> Dashboard
  const handleFinish = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div
        className={`mx-auto px-4 ${
          currentStep === 2 || currentStep === 4
            ? "max-w-7xl"
            : "max-w-3xl"
        }`}
      >
        {currentStep === 1 && (
          <Step1Account
            data={registrationData}
            setData={setRegistrationData}
            nextStep={handleAccountNext}
          />
        )}

        {currentStep === 2 && (
    <Step2Plan
        data={registrationData}
        setData={setRegistrationData}
        nextStep={() => {
            navigate("/add-domain", {
                state: {
                    plan: registrationData.selectedPlan
                }
            });
        }}
        prevStep={() => setCurrentStep(1)}
    />
)}

        {/* Step 3: Add Domain */}
        {currentStep === 3 && (
          <Step4Domain
            data={registrationData}
            setData={setRegistrationData}
            nextStep={handleDomainNext}
            prevStep={() => setCurrentStep(2)}
          />
        )}

        {/* Step 4: Payment - paid plans only */}
        {currentStep === 4 && (
          <Step3Payment
            data={registrationData}
            setData={setRegistrationData}
            nextStep={handlePaymentSuccess}
            prevStep={() => setCurrentStep(3)}
          />
        )}

        {/* Step 5: Email */}
        {currentStep === 5 && (
          <Step5Email
            data={registrationData}
            setData={setRegistrationData}
            nextStep={handleFinish}
            prevStep={() => {
              const price = Number(
                registrationData.selectedPlan?.price
              );

              setCurrentStep(price === 0 ? 3 : 4);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RegistrationWizardd;
