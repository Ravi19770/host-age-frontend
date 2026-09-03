import { useEffect, useState } from "react";
import axios from "axios";

import SettingsCard from "./SettingsCard";
import FormInput from "./components/FormInput";
import ProfileAvatar from "./components/ProfileAvatar";
import SaveButton from "./components/SaveButton";

const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

const General = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [image, setImage] = useState("");

 const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  timezone: "",
});

  // =====================================================
  // LOAD USER PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("❌ No authentication token found");
          return;
        }

        const { data } = await axios.get(
          `${API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ PROFILE RESPONSE:", data);

        if (data?.success && data?.user) {
          const user = data.user;

          const fullName =
            user.fullName?.trim() || "";

          const nameParts = fullName.split(" ");

          const firstName =
            nameParts.shift() || "";

          const lastName =
            nameParts.join(" ");

          setFormData({
            firstName,
            lastName,
            email: user.email || "",
            phone: user.phone || "",
            company: user.company || "",
            country: user.country || "",
            timezone:
              user.timezone ||
              Intl.DateTimeFormat().resolvedOptions()
                .timeZone,
          });

          setImage(user.avatar || "");
        }
      } catch (error) {
        console.error(
          "❌ LOAD PROFILE ERROR:",
          error?.response?.data || error.message
        );
      } finally {
        setFetching(false);
      }
    };

    loadProfile();
  }, []);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSubmit = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      const fullName = [
        formData.firstName,
        formData.lastName,
      ]
        .filter(Boolean)
        .join(" ")
        .trim();

      const payload = {
        fullName,
        phone: formData.phone,
        company: formData.company,
        country: formData.country,
        timezone: formData.timezone,
        avatar: image,
      };

      console.log(
        "📤 SAVING GENERAL SETTINGS:",
        payload
      );

      const { data } = await axios.put(
        `${API_URL}/api/auth/profile`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(
        "✅ PROFILE SAVE RESPONSE:",
        data
      );

      if (data?.success) {
        alert("Profile updated successfully");
      } else {
        throw new Error(
          data?.message || "Profile update failed"
        );
      }
    } catch (error) {
      console.error(
        "❌ SAVE PROFILE ERROR:",
        error?.response?.data || error.message
      );

      alert(
        error?.response?.data?.message ||
        "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (fetching) {
    return (
      <SettingsCard
        title="General Settings"
        description="Manage your personal information."
      >
        <div className="py-10 text-center text-gray-500">
          Loading profile...
        </div>
      </SettingsCard>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <SettingsCard
      title="General Settings"
      description="Manage your personal information."
    >
      <ProfileAvatar
        image={image}
        setImage={setImage}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <FormInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <FormInput
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />

        <FormInput
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />

        <FormInput
          label="Timezone"
          name="timezone"
          value={formData.timezone}
          onChange={handleChange}
        />
      </div>

      <div className="mt-8 flex justify-end">
        <SaveButton
          loading={loading}
          onClick={handleSubmit}
        />
      </div>
    </SettingsCard>
  );
};

export default General;