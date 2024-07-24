'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function InstructorDetails() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    async function fetchInstructor() {
      if (id) {
        const res = await fetch('/data/instructors.json');
        const data = await res.json();
        const instructorData = data.find(instructor => instructor.id === parseInt(id));
        setInstructor(instructorData);
      }
    }
    fetchInstructor();
  }, [id]);

  if (!instructor) return <div>Loading...</div>;

  return (
    <div>
      <h1>{instructor.name}</h1>
      <p>{instructor.department}</p>
      <p>{instructor.email}</p>
    </div>
  );
}
