export default function StepIndicator({
  currentStep,
}) {
  const steps = [
    "Domain",
    "Website Source",
    "Configuration",
    "Review",
  ];

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const number = index + 1;

          const completed =
            currentStep > number;

          const active =
            currentStep === number;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-10 w-10 items-center
                    justify-center rounded-full
                    text-sm font-semibold
                    transition-all
                    ${
                      completed || active
                        ? "bg-blue-600 text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-800"
                    }
                  `}
                >
                  {completed ? "✓" : number}
                </div>

                <span
                  className={`
                    mt-2 hidden text-xs font-medium
                    sm:block
                    ${
                      active || completed
                        ? "text-blue-600"
                        : "text-slate-500"
                    }
                  `}
                >
                  {step}
                </span>
              </div>

              {number < steps.length && (
                <div
                  className={`
                    mx-2 h-0.5 flex-1
                    ${
                      completed
                        ? "bg-blue-600"
                        : "bg-slate-200 dark:bg-slate-800"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}