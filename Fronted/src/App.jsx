import { useState } from "react";
import { Route, Routes } from "react-router";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import "./App.css";
import Notfound from "./pages/other/Notfound";
import DashboardLayout from "./layout/DashboardLayout";
import Blog from "./pages/dashboard/Blog";
import BlogManagement from "./pages/dashboard/BlogManagement";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Blog />
            </DashboardLayout>
          }
        />
        <Route
          path="/blogmanagement"
          element={
            <DashboardLayout>
              <BlogManagement />
            </DashboardLayout>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
