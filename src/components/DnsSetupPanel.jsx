
import React, { useState } from "react";

const DnsSetupPanel = ({
  domainName,
  records = [],
  status = "pending",
  onVerify,
  verifying = false,
}) => {
  const [copiedRecord, setCopiedRecord] = useState("");

  const copyValue = async (value, key) => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopiedRecord(key);
      setTimeout(() => setCopiedRecord(""), 2000);
    } catch {
      window.prompt("Copy this value:", String(value));
    }
  };

  const statusInfo = {
    pending: {
      label: "DNS Setup Required",
      color: "#b45309",
      message:
        "Update the DNS records at your domain provider, then verify them here.",
    },
    processing: {
      label: "Verification Pending",
      color: "#2563eb",
      message:
        "Your DNS configuration is being checked. DNS propagation may take time.",
    },
    verified: {
      label: "DNS Verified",
      color: "#15803d",
      message:
        "The backend has confirmed that the required DNS records are correct.",
    },
    failed: {
      label: "Verification Failed",
      color: "#b91c1c",
      message:
        "DNS verification did not succeed. Check the records and try again.",
    },
  };

  const currentStatus = statusInfo[status] || statusInfo.pending;

  return (
    <section
      style={{
        maxWidth: 850,
        margin: "24px auto",
        padding: 24,
        border: "1px solid #dbe3ee",
        borderRadius: 14,
        background: "#ffffff",
        color: "#172033",
      }}
    >
      <h2>Connect Your Domain</h2>

      <p>
        Domain: <strong>{domainName || "Your domain"}</strong>
      </p>

      <div
        role="status"
        style={{
          padding: 12,
          background: "#f8fafc",
          borderRadius: 8,
          color: currentStatus.color,
        }}
      >
        <strong>{currentStatus.label}</strong>
        <p style={{ color: "#475569", marginBottom: 0 }}>
          {currentStatus.message}
        </p>
      </div>

      <h3>How to change your DNS</h3>

      <ol>
        <li>
          Log in to the account where you purchased your domain.
        </li>
        <li>
          Open Domain Settings or DNS Management.
        </li>
        <li>
          Add or update the DNS records specified by Host-Age below.
        </li>
        <li>Save your changes at your domain provider.</li>
        <li>Return here and click Verify DNS.</li>
      </ol>

      <h3>Required DNS Records</h3>

      {records.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                {["Type", "Host", "Value", "TTL", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      style={{
                        padding: 10,
                        borderBottom: "1px solid #dbe3ee",
                      }}
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {records.map((record, index) => {
                const key = `${record.type}-${record.host}-${index}`;

                return (
                  <tr key={key}>
                    <td style={{ padding: 10 }}>
                      {record.type}
                    </td>
                    <td style={{ padding: 10 }}>
                      {record.host}
                    </td>
                    <td
                      style={{
                        padding: 10,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {record.value}
                    </td>
                    <td style={{ padding: 10 }}>
                      {record.ttl ?? "Provider default"}
                    </td>
                    <td style={{ padding: 10 }}>
                      <button
                        type="button"
                        onClick={() =>
                          copyValue(record.value, key)
                        }
                      >
                        {copiedRecord === key ? "Copied!" : "Copy"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>
          DNS records are not available yet. Please contact
          Host-Age support while your hosting configuration is
          being prepared.
        </p>
      )}

      <p style={{ color: "#b45309", marginTop: 20 }}>
        Important: Do not delete existing MX, SPF, DKIM or DMARC
        records unless Host-Age explicitly instructs you to do so.
      </p>

      <button
        type="button"
        disabled={!domainName || verifying || !onVerify}
        onClick={() => onVerify(domainName)}
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          border: "none",
          background: "#2563eb",
          color: "#ffffff",
          cursor: "pointer",
          opacity: verifying || !onVerify ? 0.6 : 1,
        }}
      >
        {verifying ? "Checking DNS..." : "Verify DNS"}
      </button>
    </section>
  );
};

export default DnsSetupPanel;
