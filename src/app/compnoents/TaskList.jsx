"use client";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const UserTasks = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const userId = user.user.id;
  console.log(userId);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        const userId = user.user.id;

        if (!userId) return;
        // Tekshiruv: agar userId mavjud bo'lsa, so'rovni amalga oshiramiz
        if (userId) {
          const q = query(
            collection(db, "tasks"),
            where("assignedTo", "==", userId)
          );

          try {
            const querySnapshot = await getDocs(q);
            const userTasks = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));

            setTasks(userTasks);
          } catch (error) {
            console.error("Vazifalar olishda xatolik:", error);
          }
        } else {
          console.error("Foydalanuvchi ID mavjud emas");
        }
      } else {
        console.error("Foydalanuvchi tizimga kirgan emas");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Mening Vazifalarim</h1>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.name}</strong> - {task.description} - {task.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>Sizda hech qanday vazifa yo'q.</p>
      )}
    </div>
  );
};

export default UserTasks;
