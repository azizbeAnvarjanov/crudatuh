"use client";
import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const UserProjects = ({ user }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user) {
      // Loyihalarni olish uchun query tuzamiz
      const fetchProjects = async () => {
        const projectsRef = collection(db, "projects");
        const q = query(
          projectsRef,
          where("members", "array-contains", user.user.id)
        ); // Foydalanuvchi ID'si bo'yicha filtr

        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProjects(projectsData); // Loyihalarni state'ga saqlaymiz
      };

      fetchProjects();
    }
  }, [user]);

  if (!user) {
    return <div>Foydalanuvchi tizimga kirgan emas.</div>;
  }

  return (
    <div>
      <h1>Ushbu foydalanuvchiga tegishli loyihalar</h1>
      {projects.length > 0 ? (
        <ul className="">
          {projects.map((project) => (
            <li className="m-2 border" key={project.id}>
              <h2>{project.projectName}</h2>
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Hech qanday loyiha topilmadi.</p>
      )}
    </div>
  );
};

export default UserProjects;
