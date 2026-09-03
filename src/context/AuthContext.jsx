import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

// =====================================================
// API URL
// =====================================================
// .env:
// REACT_APP_BACKEND_URL=http://localhost:5000
//
// IMPORTANT:
// Do NOT put /api at the end of REACT_APP_BACKEND_URL.
const API_URL =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:5200";

console.log("🌐 AUTH API URL:", API_URL);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK AUTH
  // =====================================================
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("🔐 CHECK AUTH TOKEN:", !!token);

      // No token = user is not logged in
      if (!token) {
        setUser(null);
        return;
      }

      console.log("🔎 CHECKING:", `${API_URL}/api/auth/me`);

      const response = await axios.get(
        `${API_URL}/api/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      console.log("✅ AUTH ME RESPONSE:", data);

      if (data?.success && data?.user) {
        setUser(data.user);

        // Keep user after page refresh
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        return;
      }

      // Backend responded but user data is invalid
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      const status = error?.response?.status;

      console.error(
        "❌ CHECK AUTH ERROR:",
        status,
        error?.response?.data || error?.message
      );

      // =================================================
      // REAL AUTH FAILURE
      // =================================================
      if (status === 401 || status === 403) {
        console.warn("⚠️ Token expired/invalid. Clearing auth.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
      }

      // =================================================
      // 404 / 500
      // Do NOT delete token.
      // These are backend/API problems.
      // =================================================
      if (status === 404) {
        console.error(
          "🚨 /api/auth/me NOT FOUND. Check backend auth route."
        );
      }

      if (status >= 500) {
        console.error(
          "🚨 Backend server error while checking authentication."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL AUTH CHECK
  // =====================================================
  useEffect(() => {
    checkAuth();
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================
  const login = async (email, password) => {
    try {
      console.log(
        "🔐 LOGIN REQUEST:",
        `${API_URL}/api/auth/login`
      );

      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );

      const data = response.data;

      console.log("✅ LOGIN RESPONSE:", data);

      if (!data?.token) {
        console.error(
          "❌ Token missing from login response:",
          data
        );

        throw new Error(
          "Token not found in login response"
        );
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      console.log(
        "✅ TOKEN SAVED:",
        !!localStorage.getItem("token")
      );

      // Save user
      if (data.user) {
        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      return data;
    } catch (error) {
      console.error(
        "❌ LOGIN ERROR:",
        error?.response?.data || error?.message
      );

      throw error;
    }
  };

  // =====================================================
  // REGISTER
  // =====================================================
  const register = async (userData) => {
    try {
      console.log(
        "📝 REGISTER REQUEST:",
        `${API_URL}/api/auth/register`
      );

      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        userData
      );

      const data = response.data;

      console.log("✅ REGISTER RESPONSE:", data);

      if (data?.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      if (data?.user) {
        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      return data;
    } catch (error) {
      console.error(
        "❌ REGISTER ERROR:",
        error?.response?.data || error?.message
      );

      throw error;
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================
  const logout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        console.log(
          "🚪 LOGOUT REQUEST:",
          `${API_URL}/api/auth/logout`
        );

        await axios.post(
          `${API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.error(
        "❌ LOGOUT ERROR:",
        error?.response?.data || error?.message
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setUser(null);
    }
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;