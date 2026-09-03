import React, { useState } from "react";
import useTermsAcceptance from "../hooks/UseTermsAcceptance";

import TermsModal from "../components/terms/TermsModal";

import { useNavigate, useLocation } from "react-router-dom";

import {
    User,
    Mail,
    Phone,
    Building,
    MapPin,
    Globe,
    Ticket,
    ShieldCheck,
    CreditCard,
    Lock,
} from "lucide-react";

const Billing = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Billing page must use the plan selected on the previous page.
    // Do NOT use a hard-coded price here, otherwise ₹999 appears when
    // Billing is opened directly or when navigation state is missing.
    const selectedPlan = location.state?.plan || null;

    const selectedDomain = location.state?.domain || "";

    // Normalize/validate the plan price so an accidental/missing value
    // never becomes a fake default amount.
    const planPrice = Number(selectedPlan?.price);

    const hasValidPlan =
        Boolean(selectedPlan) &&
        Number.isFinite(planPrice) &&
        planPrice > 0;

    const [loading, setLoading] = useState(false);

    const [coupon, setCoupon] = useState("");

    const [discount, setDiscount] = useState(0);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        country: "India",
        state: "",
        city: "",
        address: "",
        postalCode: "",
        gst: "",
    });
    const {
        termsAccepted,
        setTermsAccepted,
        showTermsModal,
        openTermsModal,
        closeTermsModal,
        acceptTerms,
    } = useTermsAcceptance();
    const gstRate = 18;

    const subtotal = hasValidPlan ? planPrice : 0;

    const taxableAmount = Math.max(subtotal - discount, 0);
    const gstAmount = (taxableAmount * gstRate) / 100;
    const total = taxableAmount + gstAmount;

    console.log("selectedPlan:", selectedPlan);
    console.log("selectedPlan.price:", selectedPlan?.price);
    console.log("subtotal:", subtotal);
    console.log("total:", total);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const applyCoupon = () => {
        if (coupon.trim().toUpperCase() === "HOSTAGE20") {
            setDiscount(200);
            alert("Coupon Applied");
        } else {
            setDiscount(0);
            alert("Invalid Coupon");
        }
    };
    const API_URL = process.env.REACT_APP_API_URL;

    console.log("Selected Plan:", selectedPlan);

    const handlePayment = async () => {

        if (!termsAccepted) {
            openTermsModal();
            return;
        }

        if (!hasValidPlan) {
            alert("Please select a hosting plan before continuing to payment.");
            navigate("/pricing");
            return;
        }

        if (!formData.fullName) return alert("Enter Full Name");
        if (!formData.email) return alert("Enter Email");
        if (!formData.phone) return alert("Enter Phone Number");
        if (!formData.state) return alert("Enter State");
        if (!formData.city) return alert("Enter City");
        if (!formData.address) return alert("Enter Address");
        if (!formData.postalCode) return alert("Enter Postal Code");
        console.log("Payment Payload:", {
            amount: total,
            plan: selectedPlan,
            domain: selectedDomain,
        });

        try {
            setLoading(true);
            const API_URL = process.env.REACT_APP_API_URL;
            const res = await fetch("http://localhost:5001/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({

                    amount: total,

                    planId: selectedPlan.id,

                    plan: selectedPlan.title,

                    billingCycle: selectedPlan.billing,

                    domain: selectedDomain,

                    billing: formData,

                    coupon,

                }),
            });

            const data = await res.json();

            if (!window.Razorpay) {
                alert("Razorpay SDK not loaded");
                setLoading(false);
                return;
            }

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,

                amount: data.order.amount,

                currency: "INR",

                order_id: data.order.id,

                name: "Host-Age",

                description: `${selectedPlan.title}`,

                image: "/logo.png",

                prefill: {
                    name: formData.fullName,
                    email: formData.email,
                    contact: formData.phone,
                },

                theme: {
                    color: "#2563EB",
                },

                handler: async function (response) {

                    const verify = await fetch(
                        `${API_URL}/api/payment/verify`,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type": "application/json",

                                Authorization: `Bearer ${localStorage.getItem("token")}`

                            },

                            body: JSON.stringify({

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_signature:
                                    response.razorpay_signature

                            })

                        }

                    );

                    const result = await verify.json();

                    if (!result.success) {

                        alert("Payment Verification Failed");

                        return;

                    }

                    navigate(`/payment-success/${result.payment._id}`);

                },
            };

            const razor = new window.Razorpay(options);

            razor.open();

            razor.on("payment.failed", function (response) {

                console.error(response);

                alert(

                    response.error.description ||

                    "Payment Failed"

                );

            });

        } catch (err) {

            console.log(err);

            alert("Server Error");

        } finally {

            setLoading(false);

        }
    };

    if (!hasValidPlan) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">
                        No Hosting Plan Selected
                    </h1>
                    <p className="text-gray-600 mb-6">
                        Please select a hosting plan first. The billing page will
                        then use the exact price from that selected plan.
                    </p>
                    <button
                        onClick={() => navigate("/pricing")}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                    >
                        Choose Hosting Plan
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 py-12">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 px-6">

                {/* LEFT */}

                <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Billing Information
                    </h1>

                    {/* Customer */}

                    <div className="mb-10">

                        <h2 className="font-semibold text-xl mb-5">
                            Customer Details
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2 font-medium">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <User className="absolute left-3 top-3 text-gray-400" size={18} />

                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg pl-10 py-3"
                                        placeholder="John Doe"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Email
                                </label>

                                <div className="relative">

                                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg pl-10 py-3"
                                        placeholder="john@gmail.com"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Phone
                                </label>

                                <div className="relative">

                                    <Phone className="absolute left-3 top-3 text-gray-400" size={18} />

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg pl-10 py-3"
                                        placeholder="+91"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-medium">
                                    Company
                                </label>

                                <div className="relative">

                                    <Building className="absolute left-3 top-3 text-gray-400" size={18} />

                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg pl-10 py-3"
                                        placeholder="Optional"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Billing Address */}

                    <div>

                        <h2 className="font-semibold text-xl mb-5">
                            Billing Address
                        </h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <div>

                                <label className="block mb-2">
                                    Country
                                </label>

                                <div className="relative">

                                    <Globe className="absolute left-3 top-3 text-gray-400" size={18} />

                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full border rounded-lg pl-10 py-3"
                                    />

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2">
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg py-3 px-3"
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg py-3 px-3"
                                />

                            </div>

                            <div>

                                <label className="block mb-2">
                                    Postal Code
                                </label>

                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg py-3 px-3"
                                />

                            </div>

                            <div className="md:col-span-2">

                                <label className="block mb-2">
                                    Address
                                </label>

                                <textarea
                                    rows="4"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg p-3"
                                />

                            </div>

                            <div className="md:col-span-2">

                                <label className="block mb-2">
                                    GST Number (Optional)
                                </label>

                                <input
                                    type="text"
                                    name="gst"
                                    value={formData.gst}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg py-3 px-3"
                                />

                            </div>

                        </div>

                    </div>

                </div>
                {/* ================= RIGHT SIDE ================= */}

                <div className="lg:col-span-1">

                    <div
                        className="lg:col-span-2 bg-white/90 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,.08)] rounded-3xl border border-white p-10">


                        <h2 className="text-2xl font-bold mb-6">
                            Order Summary
                        </h2>

                        {/* Domain */}

                        <div className="border rounded-xl p-4 mb-4">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Selected Domain
                                    </p>

                                    <h3 className="font-semibold text-lg">
                                        {selectedDomain || "No domain selected"}
                                    </h3>

                                </div>

                                <Globe className="text-blue-600" />

                            </div>

                        </div>

                        {/* Hosting Plan */}

                        <div className="border rounded-xl p-4 mb-4">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500 text-sm">
                                        Hosting Plan
                                    </p>

                                    <h3 className="font-semibold">
                                        {selectedPlan?.title || "No plan selected"}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {selectedPlan?.billing || "—"}
                                    </p>

                                </div>

                                <CreditCard className="text-green-600" />

                            </div>

                        </div>

                        {/* Coupon */}

                        <div className="mb-6">

                            <label className="font-medium flex items-center gap-2 mb-3">

                                <Ticket size={18} />

                                Coupon Code

                            </label>

                            <div className="flex gap-2">

                                <input
                                    type="text"
                                    placeholder="HOSTAGE20"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    className="flex-1 border rounded-lg px-3 py-3"
                                />

                                <button
                                    onClick={applyCoupon}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg"
                                >
                                    Apply
                                </button>

                            </div>

                        </div>

                        {/* Price */}

                        <div className="space-y-4 border-t pt-5">

                            <div className="flex justify-between">

                                <span className="text-gray-600">
                                    Hosting Price
                                </span>

                                <span>
                                    {hasValidPlan ? `₹${subtotal.toFixed(2)}` : "Select a plan"}
                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-600">
                                    Discount
                                </span>

                                <span className="text-green-600">

                                    - ₹{discount}

                                </span>

                            </div>

                            <div className="flex justify-between">

                                <span className="text-gray-600">

                                    GST ({gstRate}%)

                                </span>

                                <span>

                                    ₹{gstAmount.toFixed(2)}

                                </span>

                            </div>

                            <hr />

                            <div className="flex justify-between text-2xl font-bold">

                                <span>Total</span>

                                <span className="text-blue-700">

                                    ₹{total.toFixed(2)}

                                </span>

                            </div>

                        </div>

                        {/* Secure */}

                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-8">

                            <div className="flex gap-3">

                                <ShieldCheck
                                    className="text-green-600"
                                    size={26}
                                />

                                <div>

                                    <h4 className="font-semibold">

                                        Secure Payment

                                    </h4>

                                    <p className="text-sm text-gray-600 mt-1">

                                        SSL encrypted payment powered by Razorpay.

                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Features */}

                        <div className="mt-8 space-y-3">

                            <div className="flex items-center gap-3">

                                <Lock
                                    size={18}
                                    className="text-green-600"
                                />

                                <span className="text-sm">

                                    256-bit SSL Encryption

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <ShieldCheck
                                    size={18}
                                    className="text-green-600"
                                />

                                <span className="text-sm">

                                    Secure Razorpay Checkout

                                </span>

                            </div>

                            <div className="flex items-center gap-3">

                                <CreditCard
                                    size={18}
                                    className="text-green-600"
                                />

                                <span className="text-sm">

                                    UPI • Cards • Net Banking

                                </span>

                            </div>

                        </div>

                        {/* Terms & Conditions */}

                        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4">

                            <div className="flex items-start justify-between gap-4">

                                <div>
                                    <h3 className="font-semibold text-gray-900">
                                        Terms & Conditions
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Please review and accept all terms before
                                        making payment.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log("Review Terms clicked");
                                        openTermsModal();
                                    }}
                                    className="shrink-0 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Review Terms
                                </button>


                            </div>

                            {termsAccepted && (
                                <div className="mt-3 text-sm font-medium text-green-600">
                                    ✓ All terms and conditions accepted
                                </div>
                            )}

                        </div>


                        {/* PAYMENT */}

                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={
                                loading ||
                                !hasValidPlan ||
                                !termsAccepted
                            }
                            className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition ${loading ||
                                !hasValidPlan ||
                                !termsAccepted
                                ? "bg-gray-400 cursor-not-allowed text-white"
                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                        >
                            {loading
                                ? "Processing..."
                                : `Pay ₹${total.toFixed(2)}`}
                        </button>

                    </div>

                </div>

            </div>


            {/* TERMS MODAL */}

            <TermsModal
                isOpen={showTermsModal}
                onClose={closeTermsModal}
                onAccept={acceptTerms}
            />

        </div>
    );
};

export default Billing;