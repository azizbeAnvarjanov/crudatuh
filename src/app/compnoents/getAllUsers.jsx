"use client";
// pages/users.js
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const GetAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs?.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const userRef = doc(db, "users", id);
    await deleteDoc(userRef);
    setUsers(users.filter((user) => user.id !== id)); // Remove deleted user from state
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Foydalanuvchilar</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border py-2">Foydalanuvchi ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Ism</th>
            <th className="border px-4 py-2">Familiya</th>
            <th className="border px-4 py-2">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.surname}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">
                  Tahrirlash
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  O‘chirish
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllUsers;
