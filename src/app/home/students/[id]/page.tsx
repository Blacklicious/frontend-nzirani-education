'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function StudentDetails() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      if (id) {
        const res = await fetch('/data/students.json');
        const data = await res.json();
        const studentData = data.find(student => student.id === parseInt(id));
        setStudent(studentData);
      }
    }
    fetchStudent();
  }, [id]);

  if (!student) return <div>Loading...</div>;

  return (
    <div>
      <h1>{student.name}</h1>
      <p>{student.email}</p>
      <p>{student.course}</p>
    </div>
  );
}
