import { useState, useEffect } from "react";
import axios from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);

  const handleProfile = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className="main--content">
      <h1>Profile</h1>
      <p>First Name: {user?.firstName}</p>
      <p>Last Name: {user?.lastName}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </div>
  );
}
