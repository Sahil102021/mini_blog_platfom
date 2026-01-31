import axios from "axios";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Input from "../../components/ul/Input";
import { NavLink, useNavigate } from "react-router";
import { setToken, setUserData } from "../../auth/useAuth";
import Button from "../../components/ul/Button";

const Login = ({ onSwitchToSignup }) => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
      );
      if (res.data.success) {
        console.log("Login success:", res.data?.data);
        setUserData(res.data?.data?.user?.username);
        setToken(res.data?.data?.token);
        navigate("/");
      }
      console.log("Login success:", res.data);
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Try again.";
      console.error("Login error:", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col">
      <div className="md:w-1/2">
        <img
          src={
            "https://res.cloudinary.com/dttftmu4m/image/upload/v1769626620/Gemini_Generated_Image_vk757vk757vk757v_xqokgq.png"
          }
          className="h-[40vh] md:h-full w-full object-cover"
          alt="login img"
        />
      </div>

      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-2">Sign In</h2>
          <p className="text-gray-600 mb-6">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  error={errors.email}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  error={errors.password}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1.5 md:right-3 md:top-3"
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" />
                  ) : (
                    <Eye className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              children="Sign In"
              icon={ArrowRight}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}
              loadingText="Signing in..."
            />
          </form>

          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <NavLink
              onClick={onSwitchToSignup}
              className="text-indigo-600 font-medium cursor-pointer"
              to={"/signup"}
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
