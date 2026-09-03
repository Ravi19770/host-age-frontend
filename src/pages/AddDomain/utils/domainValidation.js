// src/utils/domainValidation.js

export function normalizeDomain(value = "") {
  let domain = String(value).trim().toLowerCase();

  // Remove protocol
  domain = domain.replace(/^https?:\/\//, "");

  // Remove www.
  domain = domain.replace(/^www\./, "");

  // Remove path
  domain = domain.split("/")[0];

  // Remove query
  domain = domain.split("?")[0];

  // Remove hash
  domain = domain.split("#")[0];

  // Remove trailing dot
  domain = domain.replace(/\.$/, "");

  return domain;
}

export function validateDomain(value = "") {
  const domain = normalizeDomain(value);

  if (!domain) {
    return "Please enter your domain name.";
  }

  if (domain.length > 253) {
    return "Domain name cannot exceed 253 characters.";
  }

  if (domain.includes(" ")) {
    return "Domain name cannot contain spaces.";
  }

  if (!domain.includes(".")) {
    return "Please enter a complete domain, e.g. example.com";
  }

  const domainRegex =
    /^(?=.{1,253}$)(?!-)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

  if (!domainRegex.test(domain)) {
    return "Please enter a valid domain name.";
  }

  return null;
}

export function validateWebsiteUrl(value = "") {
  const website = String(value).trim();

  if (!website) {
    return "Website URL is required.";
  }

  try {
    const url = new URL(website);

    if (!["http:", "https:"].includes(url.protocol)) {
      return "Website URL must start with http:// or https://";
    }

    return null;
  } catch {
    return "Please enter a valid website URL.";
  }
}

export function validateGithubUrl(value = "") {
  const github = String(value).trim();

  if (!github) {
    return "GitHub URL is required.";
  }

  try {
    const url = new URL(github);

    if (
      url.hostname !== "github.com" &&
      url.hostname !== "www.github.com"
    ) {
      return "Please enter a valid GitHub repository URL.";
    }

    return null;
  } catch {
    return "Please enter a valid GitHub URL.";
  }
}

export function validateZipFile(file) {
  if (!file) {
    return "Please select a ZIP file.";
  }

  if (!file.name.toLowerCase().endsWith(".zip")) {
    return "Only ZIP files are allowed.";
  }

  const maxSize = 50 * 1024 * 1024;

  if (file.size > maxSize) {
    return "ZIP file must be smaller than 50 MB.";
  }

  return null;
}