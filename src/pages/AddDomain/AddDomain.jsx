import { useState } from "react";

import StepIndicator from "./components/StepIndicator";
import DomainStep from "./components/DomainStep";
import PurposeStep from "./components/PurposeStep";
import VerificationStep from "./components/VerificationStep";

import {
  createDomain,
} from "../../services/domainService";

export default function AddDomainPage() {
  const [step, setStep] =
    useState(1);

  const [domain, setDomain] =
    useState("");

  const [domainId, setDomainId] =
    useState(null);

  const [purpose, setPurpose] =
    useState("");

  const [domainData, setDomainData] =
    useState(null);

  const [error, setError] =
    useState("");

  const handleDomainSuccess = (
    normalizedDomain
  ) => {
    setDomain(
      normalizedDomain
    );

    setStep(2);
  };

  const handlePurpose = async (
    selectedPurpose
  ) => {
    if (!selectedPurpose) return;

    try {
      setError("");

      const response =
        await createDomain(
          domain,
          selectedPurpose
        );

      setPurpose(selectedPurpose);

      setDomainId(
        response.domain.id
      );

      setDomainData(
        response.domain
      );

      setStep(3);
    } catch (error) {
      setError(
        error.message ||
          "Unable to add domain."
      );
    }
  };

  const handleVerified = () => {
    // Next phase:
    // DNS / Website / Email setup

    setStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-4 py-10">
      
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Add Domain
          </h1>

          <p className="mt-2 text-slate-500">
            Connect your existing domain
            with Host-Age.
          </p>
        </div>

        <StepIndicator
          currentStep={step}
        />

        <div className="rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-sm">
          {step === 1 && (
            <DomainStep
              onSuccess={
                handleDomainSuccess
              }
            />
          )}

          {step === 2 && (
            <>
              {error && (
                <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
                  {error}
                </div>
              )}

              <PurposeStep
                selected={purpose}
                onSelect={
                  handlePurpose
                }
                onBack={() =>
                  setStep(1)
                }
              />
            </>
          )}

          {step === 3 && (
            <VerificationStep
              domain={domainData}
              domainId={domainId}
              onVerified={
                handleVerified
              }
              onBack={() =>
                setStep(2)
              }
            />
          )}

          {step === 4 && (
            <div className="text-center py-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                ✓
              </div>

              <h2 className="text-2xl font-bold">
                Domain Verified
              </h2>

              <p className="mt-2 text-slate-500">
                {domain} has been successfully
                verified.
              </p>

              <button
                onClick={() => {
                  // Navigate to next setup
                  // DNS / Website / Email
                }}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white"
              >
                Continue Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}