"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ProjectCreate = (user) => {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]); // Barcha foydalanuvchilarni olish uchun
  console.log(users);

  useEffect(() => {
    // Barcha foydalanuvchilarni olish
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("Foydalanuvchi tizimga kirgan emas");
      return;
    }

    // Loyiha yaratish
    try {
      const newProject = {
        projectName,
        description,
        createdBy: user.user.id, // Loyihani yaratgan foydalanuvchi
        members, // Loyihada ishtirok etayotgan foydalanuvchilar
        tasks: [], // Dastlabki holda bo'sh tasklar ro'yxati
      };

      // Loyihani Firebase'ga qo'shish
      const docRef = await addDoc(collection(db, "projects"), newProject);
      console.log("Loyiha yaratildi:", docRef.id);
      setProjectName("");
      setDescription("");
      setMembers([]);
    } catch (e) {
      console.error("Loyiha yaratishda xatolik:", e);
    }
  };

  const handleMemberChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setMembers(value);
  };

  return (
    <div>
      <h1>Loyiha Yaratish</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Loyiha nomi:</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Loyiha tavsifi:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="members">Loyiha a'zolari:</label>
          <select
            multiple
            value={members}
            onChange={handleMemberChange}
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Loyiha yaratish</button>
      </form>
    </div>
  );
};

export default ProjectCreate;
