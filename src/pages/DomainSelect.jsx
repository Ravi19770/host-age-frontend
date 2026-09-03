import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DomainSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const domain = location.state?.domain;
  const selectedPlan = location.state?.selectedPlan;
  const skipPayment = location.state?.skipPayment;

  const proceed = () => {
    if (skipPayment) {
      // ✅ FREE PLAN
      navigate("/welcome", {
        state: {
          domain,
          selectedPlan,
        },
      });
      return;
    }

    // ✅ PAID PLAN
    navigate("/hosting/plans", {
      state: {
        domain,
        selectedPlan,
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow rounded w-[400px] text-center">
        <h2 className="text-xl font-bold mb-4">
          Confirm Domain
        </h2>

        <p className="mb-4 text-gray-600">{domain}</p>

        <button
          onClick={proceed}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DomainSelect;