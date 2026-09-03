import { Globe, ArrowRight } from "lucide-react";
import {
  normalizeDomain,
  validateDomain,
} from "../utils/domainValidation";

export default function DomainStep({
  domain,
  setDomain,
  error,
  setError,
  onNext,
}) {
  const handleContinue = () => {
    const normalized =
      normalizeDomain(domain);

    const validationError =
      validateDomain(normalized);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setDomain(normalized);

    onNext(normalized);
  };

  return (
    <div>
      <div className="mb-8">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/40">
          <Globe size={28} />
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Add your domain
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Enter a domain you already own and
          connect it with Host-Age.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
          Domain name
        </label>

        <div
          className={`
            flex items-center rounded-xl border
            bg-white dark:bg-slate-950
            ${
              error
                ? "border-red-500"
                : "border-slate-300 dark:border-slate-700"
            }
          `}
        >
          <span className="pl-4 text-slate-400">
            https://
          </span>

          <input
            type="text"
            value={domain}
            onChange={(e) => {
              setDomain(e.target.value);

              if (error) {
                setError("");
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleContinue();
              }
            }}
            placeholder="example.com"
            className="w-full bg-transparent px-3 py-4 text-slate-900 outline-none dark:text-white"
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <p className="mt-3 text-xs text-slate-500">
          Example: example.com, mybusiness.in
        </p>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700"
      >
        Continue
        <ArrowRight size={18} />
      </button>
    </div>
  );
}