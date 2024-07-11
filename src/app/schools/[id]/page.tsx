'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SchoolDetails() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [school, setSchool] = useState(null);

  useEffect(() => {
    async function fetchSchool() {
      if (id) {
        const res = await fetch('/data/schools.json');
        const data = await res.json();
        const schoolData = data.find(school => school.id === parseInt(id));
        setSchool(schoolData);
      }
    }
    fetchSchool();
  }, [id]);

  if (!school) return <div>Loading...</div>;

  return (
    <div>
      <h1>{school.name}</h1>
      <p>{school.location}</p>
    </div>
  );
}
