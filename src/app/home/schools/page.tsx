'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Schools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchSchools() {
      const res = await fetch('/data/schools.json');
      const data = await res.json();
      setSchools(data);
    }
    fetchSchools();
  }, []);

  return (
    <div>
      <ul className='mt-[20px]'>
        {schools.map(school => (
          <li key={school.id}>
            <Link href={`/schools/${school.id}`}>
              <div>{school.name}</div>
            </Link>
            <p>{school.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
