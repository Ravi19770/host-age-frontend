import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What hosting plans does Host-Age offer?",
    answer:
      "Host-Age offers Shared Hosting, Business Hosting, VPS Hosting, and Custom Enterprise solutions designed for businesses of every size.",
  },
  {
    question: "Do all plans include a free SSL certificate?",
    answer:
      "Yes. Every hosting plan includes a free SSL certificate to keep your website secure and improve visitor trust.",
  },
  {
    question: "Can I transfer my existing domain to Host-Age?",
    answer:
      "Absolutely! Our team will help you transfer your domain with minimal downtime and complete guidance.",
  },
  {
    question: "How many websites can I host?",
    answer:
      "The number of websites depends on your selected plan. Premium plans allow multiple websites under one account.",
  },
  {
    question: "Do you provide business email accounts?",
    answer:
      "Yes. Business email accounts are included with eligible plans, giving your business a professional email address.",
  },
  {
    question: "Can Host-Age migrate my website?",
    answer:
      "Yes! We provide free website migration assistance for eligible hosting plans.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and International Payments.",
  },
  {
    question: "Do you offer 24/7 technical support?",
    answer:
      "Yes. Our expert support team is available 24/7 via Live Chat, Email, and Support Tickets.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(null);

  const navigate = useNavigate();

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
   <section className="bg-gradient-to-b from-[#020617] via-[#081B3A] to-[#0F172A] py-24">
 <div className="max-w-7xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-[#0B1220] shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
    <div className="grid lg:grid-cols-[420px_1fr]">

      {/* LEFT SIDE */}

   <div className="bg-gradient-to-br from-[#0A2540] via-[#0B5ED7] to-[#06B6D4] p-10 flex flex-col justify-between text-white">
            <div>
              <h2 className="text-5xl font-bold text-white leading-tight">
                Frequently
                <br />
                Asked
                <br />
                Questions
              </h2>

             <p className="mt-6 text-blue-100 leading-7">
                Got questions? We've got answers.
                Browse our FAQs or reach out anytime—
                we're here to help make your hosting
                journey smooth and stress-free.
              </p>
              <div className="border-white/10 flex gap-6 mt-8">
                <button className="mt-8 px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-full transition duration-300">
                  Contact Support
                </button>

                <button
                  onClick={() => navigate("/support-center")}
                  className="mt-8 px-6 py-3 bg-gray-900 hover:bg-gray-700 text-white rounded-full transition duration-300"
                >
                  Support Center
                </button>
              </div>
            </div>

            <div className="hidden lg:flex justify-center mt-16">

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="bg-white">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-7 flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <h3 className="text-left text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>

                  <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center">
                    {active === index ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ${active === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-8 pb-7 text-gray-600 leading-7">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}