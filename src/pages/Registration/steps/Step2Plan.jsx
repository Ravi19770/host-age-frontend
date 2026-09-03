import { Check, ArrowUpRight, Star } from "lucide-react";
import { Button } from "../../../components/ui/button";

const plans = [
  {
    id: 1,
    title: "FREE HOST-AGE",
    description:
      "Perfect for students, portfolios and personal websites.",
    price: 0,
    displayPrice: "FREE",
    billing: "1 Year",
    featured: false,
    features: [
      "1 Website",
      "1 Domain",
      "1 Email Account",
      "No cPanel Access",
      "Free SSL Certificate",
      "Community Support",
    ],
  },
  {
    id: 2,
    title: "PRO HOST-AGE",
    description:
      "Ideal for startups, freelancers and business websites.",
    price: 142,
    displayPrice: "₹142",
    billing: "First Month",
    featured: true,
    features: [
      "1 Website",
      "6 Business Emails",
      "6 Website Pages",
      "Free SSL Certificate",
      "Daily Backup",
      "Priority Support",
    ],
  },
  {
    id: 3,
    title: "PREMIUM HOST-AGE",
    description:
      "Complete hosting solution for professionals and agencies.",
    price: 179,
    displayPrice: "₹179",
    billing: "Monthly",
    featured: false,
    features: [
      "Unlimited Bandwidth",
      "15 Business Emails",
      "12 Website Pages",
      "Free SSL Certificate",
      "Premium Support",
      "Advanced Security",
    ],
  },
];

const Step2Plan = ({
  data,
  setData,
  nextStep,
  prevStep,
}) => {
  const selectedPlan = data.selectedPlan;

  // -----------------------------
  // Select Plan
  // -----------------------------
  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));

    setData((prev) => ({
      ...prev,
      selectedPlanId: plan.id,
      selectedPlan: plan,
    }));
  };

  // -----------------------------
  // Continue
  // -----------------------------
  const handleContinue = () => {
    if (!selectedPlan) {
      alert("Please select a hosting plan.");
      return;
    }

    // Save payment information
    setData((prev) => ({
      ...prev,
      payment:
        selectedPlan.price === 0
          ? {
            status: "FREE",
            amount: 0,
          }
          : {
            status: "PENDING",
            amount: selectedPlan.price,
          },
    }));

    nextStep();
  };
  return (
    <div className="min-h-screen bg-slate-50 border-rounded">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-600 py-20">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="relative max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="inline-flex items-center rounded-full bg-cyan-500/20 border border-cyan-300/20 px-4 py-2 text-cyan-100 text-sm">
              Choose Your Hosting Plan
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white">
              Select the Perfect Plan
            </h1>

            <p className="mt-5 max-w-2xl mx-auto text-slate-200 text-lg">
              Start with a free website or upgrade anytime to unlock
              premium hosting features.
            </p>

          </div>

          {/* Pricing Cards */}

          <div className="grid lg:grid-cols-3 gap-8">

            {plans.map((plan) => {

              const selected = selectedPlan?.id === plan.id;

              return (

                <div
                  key={plan.id}
                  onClick={() => handleSelect(plan)}
                  className={`relative cursor-pointer rounded-3xl  transition-all duration-300 overflow-hidden
                    ${selected
                      ? "ring-4 ring-cyan-400 shadow-2xl scale-[1.03]"
                      : "hover:-translate-y-2 hover:shadow-2xl"}

                    ${plan.featured
                      ? "bg-gradient-to-br from-[#02142F] via-[#03295A] to-[#065F8F] text-white border border-cyan-400"
                      : "bg-white border border-slate-200"}

                      `}
                >

                  {/* Recommended Badge */}

                  {plan.featured && (

                    <div className="absolute top-5 right-5">

                      <div className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-slate-900">

                        <Star className="w-3 h-3 fill-current" />

                        Recommended

                      </div>

                    </div>

                  )}

                  <div className="p-8">

                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center mb-6

                          ${plan.featured
                          ? "bg-white/20"
                          : "bg-blue-100 text-blue-600"}

                        `}
                    >

                      🚀

                    </div>

                    <span
                      className={`inline-flex rounded-full px-4 py-4 text-xs font-semibold tracking-wider

                        ${plan.featured
                          ? "bg-white text-blue-700"
                          : "bg-blue-100 text-blue-700"}

                          `}
                    >
                      {plan.title}
                    </span>

                    <h2 className="mt-6 text-5xl font-bold">
                      {plan.displayPrice}
                    </h2>

                    <p
                      className={` mt-2

                         ${plan.featured
                          ? "text-blue-100"
                          : "text-slate-500"}

                      `}
                    >
                      {plan.billing}
                    </p>

                    <p
                      className={`mt-6 leading-7
                                  
                       ${plan.featured
                          ? "text-slate-200"
                          : "text-slate-600"}

                       `}
                    >
                      {plan.description}
                    </p>

                    <div className="my-8 border-t border-white/10" />

                    <ul className="space-y-4">

                      {plan.features.map((feature) => (

                        <li
                          key={feature}
                          className="flex items-center gap-3"
                        >

                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center

                              ${plan.featured
                                ? "bg-white text-blue-700"
                                : "bg-blue-600 text-white"}

                             `}
                          >
                            <Check size={14} />
                          </div>

                          <span>{feature}</span>

                        </li>

                      ))}

                    </ul>

                    <Button
                      type="button"
                      className={`mt-10 w-full rounded-xl h-12 transition-all

                        ${selected
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : plan.featured
                            ? "bg-white text-blue-700 hover:bg-slate-100"
                            : "bg-blue-600 hover:bg-blue-700 text-white"}

                         `}
                    >

                      {selected
                        ? "✓ Selected"
                        : "Select Plan"}

                      <ArrowUpRight className="ml-2 w-4 h-4" />

                    </Button>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* Bottom Section */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {selectedPlan
                  ? "Selected Hosting Plan"
                  : "Choose a Hosting Plan"}
              </h3>

              <p className="text-slate-500 mt-2">
                {selectedPlan
                  ? "Review your selected plan before continuing."
                  : "Select one of the hosting plans above to continue."}
              </p>
            </div>

            {selectedPlan && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 px-6 py-4 min-w-[280px]">
                <p className="text-sm text-slate-500">
                  Selected Plan
                </p>

                <h4 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedPlan.title}
                </h4>

                <p className="text-blue-600 font-semibold mt-1">
                  {selectedPlan.displayPrice}
                  <span className="text-slate-500 text-sm font-normal">
                    {" "}
                    / {selectedPlan.billing}
                  </span>
                </p>
              </div>
            )}

          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">

            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="h-12 px-8"
            >
              ← Back
            </Button>

            <Button
              type="button"
              disabled={!selectedPlan}
              onClick={handleContinue}
              className="h-12 px-10 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {selectedPlan?.price === 0
                ? "Continue with Free Plan"
                : "Continue to Payment"}
            </Button>

          </div>

        </div>

      </section>

    </div>
  );

};

export default Step2Plan;
