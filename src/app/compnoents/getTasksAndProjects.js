import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const fetchUserData = async (userId) => {
  const tasksQuery = query(
    collection(db, "tasks"),
    where("assignedTo", "==", userId)
  );
  const projectsQuery = query(
    collection(db, "projects"),
    where("members", "array-contains", userId)
  );

  const tasksSnapshot = await getDocs(tasksQuery);
  const projectsSnapshot = await getDocs(projectsQuery);

  const tasks = tasksSnapshot.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const projects = projectsSnapshot.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { tasks, projects };
};
