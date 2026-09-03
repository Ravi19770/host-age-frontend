const API_URL =
  process.env.REACT_APP_BACKEND_URL ||
  "http://localhost:5200";

export async function uploadDomain({
  domain,
  domains = [domain],
  businessEmails = [],
  websiteSource,
  websiteUrl,
  githubUrl,
  pages,
  websiteFile,
  termsAccepted = false,
  plan = null,
}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login again.");
  }

  const formData = new FormData();

  formData.append("domain", domain);
  formData.append("domains", JSON.stringify(domains.filter(Boolean)));
  formData.append("businessEmails", JSON.stringify(businessEmails));
  formData.append("websiteSource", websiteSource || "");
  formData.append("termsAccepted", String(termsAccepted));

  if (plan) {
    formData.append("plan", JSON.stringify(plan));
  }

  if (websiteUrl) {
    formData.append("websiteUrl", websiteUrl);
  }

  if (githubUrl) {
    formData.append("githubUrl", githubUrl);
  }

  if (pages) {
    formData.append("pages", JSON.stringify(pages));
  }

  if (websiteFile) {
    formData.append("websiteFile", websiteFile);
  }

  const response = await fetch(
    `${API_URL}/api/domains/upload`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },

      body: formData,
    }
  );

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "Invalid response from server."
    );
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Unable to add domain."
    );
  }

  return data;
}