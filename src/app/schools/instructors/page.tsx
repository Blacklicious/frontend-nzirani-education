'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';

export default function Instructors() {
  const [instructor, setInstructors] = useState([]);

  useEffect(() => {
    async function fetchInstructors() {
      const res = await fetch('../data/Instructors.json');
      const data = await res.json();
      setInstructors(data);
    }
    fetchInstructors();
  }, []);

  return (
    <div>
      <Navbar />
      <ul className='p-2 flex flex-wrap justify-between mt-[20px]'>
        {instructor.map(instructor => (
          <li key={instructor.id} className='w-[48%] p-4 ring-2 my-4 rounded '>
            <Link href={`/schools/instructors/${instructor.id}`}>
              <div>{instructor.name}</div>
            </Link>
            <p>{instructor.department}</p>
            <p>{instructor.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
