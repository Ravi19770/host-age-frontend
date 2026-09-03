import { useRef } from "react";
import {
  Link,
  GitBranch,
  Upload,
  FileArchive,
} from "lucide-react";

import {
  validateWebsiteUrl,
  validateGithubUrl,
  validateZipFile,
} from "../utils/domainValidation";

export default function ConfigurationStep({
  websiteSource,
  websiteUrl,
  setWebsiteUrl,
  githubUrl,
  setGithubUrl,
  websiteFile,
  setWebsiteFile,
  error,
  setError,
  onNext,
  onBack,
}) {
  const fileInputRef = useRef(null);

  const handleContinue = () => {
    let validationError = null;

    // Website URL validation
    if (websiteSource === "url") {
      validationError = validateWebsiteUrl(websiteUrl);
    }

    // GitHub URL validation
    if (websiteSource === "github") {
      validationError = validateGithubUrl(githubUrl);
    }

    // ZIP validation
    if (websiteSource === "zip") {
      validationError = validateZipFile(websiteFile);
    }

    // Show validation error
    if (validationError) {
      setError(validationError);
      return;
    }

    // Clear error
    setError("");

    // Continue to next step
    onNext();
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Website configuration
        </h2>

        <p className="mt-2 text-slate-400">
          Provide the details required to connect your website.
        </p>
      </div>

      {/* ================= WEBSITE URL ================= */}
      {websiteSource === "url" && (
        <div className="mt-10">
          <label className="mb-2 block text-sm font-semibold text-white">
            Website URL
          </label>

          <div className="relative">
            <Link
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={websiteUrl}
              onChange={(e) => {
                setWebsiteUrl(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="https://example.com"
              spellCheck={false}
              autoComplete="url"
              className="
                w-full
                rounded-xl
                border border-slate-700
                bg-slate-950
                py-3.5
                pl-12
                pr-4
                !text-white
                caret-white
                placeholder:!text-slate-500
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
              "
            />
          </div>
        </div>
      )}

      {/* ================= GITHUB ================= */}
      {websiteSource === "github" && (
        <div className="mt-10">
          <label className="mb-2 block text-sm font-semibold text-white">
            GitHub Repository URL
          </label>

          <div className="relative">
            <GitBranch
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={githubUrl}
              onChange={(e) => {
                setGithubUrl(e.target.value);

                if (error) {
                  setError("");
                }
              }}
              placeholder="https://github.com/user/project"
              spellCheck={false}
              autoComplete="url"
              className="
                w-full
                rounded-xl
                border border-slate-700
                bg-slate-950
                py-3.5
                pl-12
                pr-4
                !text-white
                caret-white
                placeholder:!text-slate-500
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
              "
            />
          </div>
        </div>
      )}

      {/* ================= ZIP UPLOAD ================= */}
      {websiteSource === "zip" && (
        <div className="mt-10">
          <label className="mb-2 block text-sm font-semibold text-white">
            Website ZIP file
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".zip,application/zip"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              setWebsiteFile(file || null);

              if (error) {
                setError("");
              }
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="
              flex
              w-full
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-700
              bg-slate-950
              p-10
              text-center
              transition
              hover:border-blue-500
              hover:bg-slate-900
            "
          >
            {websiteFile ? (
              <>
                <FileArchive
                  size={42}
                  className="text-blue-500"
                />

                <p className="mt-4 font-semibold text-white">
                  {websiteFile.name}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  {(websiteFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <Upload
                  size={42}
                  className="text-slate-400"
                />

                <p className="mt-4 font-semibold text-white">
                  Click to upload ZIP
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Maximum file size: 50 MB
                </p>
              </>
            )}
          </button>
        </div>
      )}

      {/* ================= ERROR ================= */}
      {error && (
        <p className="mt-3 text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      {/* ================= BUTTONS ================= */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="
            flex-1
            rounded-xl
            border
            border-slate-700
            px-5
            py-3.5
            font-semibold
            text-white
            transition
            hover:bg-slate-800
          "
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleContinue}
          className="
            flex-1
            rounded-xl
            bg-blue-600
            px-5
            py-3.5
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/50
          "
        >
          Continue
        </button>
      </div>
    </div>
  );
}