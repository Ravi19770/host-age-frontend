import {
  Globe,
  Mail,
  CreditCard,
  LifeBuoy,
  Receipt,
  Settings,
} from "lucide-react";

import ActionCard from "./ActionCard";

const actions = [
  {
    title: "Add Domain",
    description: "Register or connect a domain",
    icon: Globe,
    color: "bg-blue-600",
    link: "/add-domain",
  },
  {
    title: "Create Email",
    description: "Create business email accounts",
    icon: Mail,
    color: "bg-green-600",
    link: "/dashboard/emails",
  },
  {
    title: "Billing",
    description: "Manage payments",
    icon: CreditCard,
    color: "bg-purple-600",
    link: "/billing",
  },
  {
    title: "Support",
    description: "Open support tickets",
    icon: LifeBuoy,
    color: "bg-orange-600",
    link: "/support",
  },
  {
    title: "Invoices",
    description: "Download invoices",
    icon: Receipt,
    color: "bg-pink-600",
    link: "/payments",
  },
  {
    title: "Settings",
    description: "Manage account",
    icon: Settings,
    color: "bg-slate-700",
    link: "/settings",
  },
];

export default function QuickActions() {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {actions.map((item) => (
          <ActionCard
            key={item.title}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}