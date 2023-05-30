import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminHeader from "./Header/AdminHeader";
import "./scss/Admin.scss";
import AdminSider from "./Sider/AdminSider";

const Admin = ({ user, setUser }) => {
  const [selectedCategory, setSelectedCategory] = useState({ name: localStorage.getItem("c_n"), id: localStorage.getItem("c_i") })

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div className="admin">
      <AdminSider user={user} setSelectedCategory={setSelectedCategory} />
      <div className="left">
        <AdminHeader user={user} />
        <Outlet context={{ selectedCategory, setSelectedCategory }} />
      </div>
    </div>
  );
};

export default Admin;
