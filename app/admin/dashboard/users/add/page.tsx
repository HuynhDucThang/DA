"use client";

import { useState } from "react";
import styles from "@/components/pages/admin/dashboard/users/addUser.module.css";
import { userSignUp } from "@/utils/proxy"; 
import { showToast } from "@/utils/helpers/common";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault(); 

    // Create user payload
    const newUser = {
      name,
      email,
      password,
      address,
      phoneNumber,
      role,
    };

    try {
      await userSignUp(newUser);

      setName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setPhoneNumber("");
      setRole("");
      
      showToast("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      showToast("Error creating user.", "error");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateUser} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <select
          name="system_role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Choose permission</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
