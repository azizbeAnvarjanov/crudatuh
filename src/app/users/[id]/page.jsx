"use client";
// pages/users/[id].js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditUser = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const router = useRouter();
  const { id } = router.query; // Dynamic route parameter

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      const userDoc = doc(db, "users", id);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUser(userData);
        setName(userData.name);
        setSurname(userData.surname);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userRef = doc(db, "users", id);
    await updateDoc(userRef, { name, surname });

    router.push("/users"); // Redirect back to users list after update
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Foydalanuvchini Tahrirlash</h1>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Ism</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Familiya</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default EditUser;
