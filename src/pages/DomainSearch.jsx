import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL =
    process.env.REACT_APP_BACKEND_URL ||
    "http://localhost:5000";


const DomainSearch = () => {
    const [domain, setDomain] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const searchDomain = async () => {
        try {
            setLoading(true);
            setResult(null);
            const res = await axios.get(
                `${API_URL}/api/domains/search`,
                {
                    params: {
                        domain
                    }
                }
            );

            setResult(res.data);
        } catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to search domain"
            );

        }
    };

    const selectDomain = () => {
        navigate("/domain/select", {
            state: { domain: result.domain },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md w-[420px]">
                <h2 className="text-xl font-bold mb-4">
                    Search Domain
                </h2>

                <input
                    type="text"
                    placeholder="example.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value.trim())}
                />

                <button
                    disabled={loading}
                    onClick={searchDomain}
                    className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
                >
                    {loading ? "Checking..." : "Search"}
                </button>
                {result && (
                    <div className="mt-4 p-3 border rounded">
                        {result.available ? (
                            <p className="text-green-600">
                                ✅ {result.domain} is available
                            </p>
                        ) : (
                            <p className="text-red-600">
                                ❌ {result.domain} is taken
                            </p>
                        )}

                        {result.available && (
                            <button
                                onClick={selectDomain}
                                className="mt-3 w-full bg-green-600 text-white p-2 rounded"
                            >
                                Select Domain
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DomainSearch;