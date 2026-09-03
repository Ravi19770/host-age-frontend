import {
  Link,
  GitBranch,
  Upload,
} from "lucide-react";

const options = [
  {
    id: "url",
    title: "Existing Website URL",
    description:
      "Connect an existing website URL.",
    icon: Link,
  },
  {
    id: "github",
    title: "GitHub Repository",
    description:
      "Deploy your website from a Git repository.",
    icon: GitBranch,
  },
  {
    id: "zip",
    title: "Upload ZIP File",
    description:
      "Upload your website files as a ZIP.",
    icon: Upload,
  },
];

export default function WebsiteSourceStep({
  websiteSource,
  setWebsiteSource,
  onNext,
  onBack,
}) {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          How do you want to connect your website?
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Choose how Host-Age should handle your website.
        </p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {options.map((option) => {
          const Icon = option.icon;
          const selected =
            websiteSource === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() =>
                setWebsiteSource(option.id)
              }
              className={`
                flex w-full items-center gap-4
                rounded-2xl border p-5
                text-left transition-all duration-200
                ${
                  selected
                    ? "border-blue-600 bg-blue-50 shadow-sm dark:border-blue-500 dark:bg-blue-950/30"
                    : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-xl
                  transition-colors
                  ${
                    selected
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }
                `}
              >
                <Icon size={22} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {option.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {option.description}
                </p>
              </div>

              {/* Radio */}
              <div
                className={`
                  flex h-5 w-5 shrink-0
                  items-center justify-center
                  rounded-full border-2
                  ${
                    selected
                      ? "border-blue-600"
                      : "border-slate-300 dark:border-slate-600"
                  }
                `}
              >
                {selected && (
                  <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-slate-300 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Back
        </button>

        <button
          type="button"
          disabled={!websiteSource}
          onClick={onNext}
          className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
