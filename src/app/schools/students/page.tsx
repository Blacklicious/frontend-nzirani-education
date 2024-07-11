'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch('/data/students.json');
      const data = await res.json();
      setStudents(data);
    }
    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Students List</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            <Link href={`/students/${student.id}`}>
              <a>{student.name}</a>
            </Link>
            <p>{student.email}</p>
            <p>{student.course}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
