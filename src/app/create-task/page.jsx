"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';



const TaskCreationPage = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('o\'rta');
  const [status, setStatus] = useState('nomalum');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || !dueDate || !assignedTo) {
      alert('Iltimos, barcha majburiy maydonlarni to‘ldiring.');
      return;
    }

    const newTask = {
      name: taskName,
      description,
      assignedTo,
      createdAt: new Date().toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      priority,
      status,
    };

    try {
      await addDoc(collection(db, 'tasks'), newTask);
      alert('Vazifa muvaffaqiyatli yaratildi!');
    } catch (error) {
      console.error('Vazifani qo\'shishda xato:', error);
    }

    setTaskName('');
    setDescription('');
    setAssignedTo('');
    setDueDate('');
    setPriority('o\'rta');
    setStatus('nomalum');
  };

  return (
    <div className='p-3'>
      <h1>Yangi Vazifa Yaratish</h1>
      <form onSubmit={handleSubmit}>
        <div className='flex items-start'>
          <label>Vazifa Nomi:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div className='flex items-start'>
          <label>Vazifa Ta'rifi:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Bajaruvchi:</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          >
            <option value="" disabled>
              Foydalanuvchini tanlang
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {user.surname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Bajarish Sanasi:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prioritet:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="yuqori">Yuqori</option>
            <option value="o'rta">O'rta</option>
            <option value="past">Past</option>
          </select>
        </div>
        <div>
          <label>Holat:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="nomalum">Nomalum</option>
            <option value="jarayonda">Jarayonda</option>
            <option value="bajarilmagan">Bajarilmagan</option>
            <option value="bajarilgan">Bajarilgan</option>
          </select>
        </div>
        <button type="submit">Yaratish</button>
      </form>
    </div>
  );
};

export default TaskCreationPage;
