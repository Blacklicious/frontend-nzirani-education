'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await fetch('../data/courses.json');
      const data = await res.json();
      setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className='p-2'>
      <div className='border-[2px] py-2 px-3 text-xl bg-gray-100 rounded-lg mb-1'>Recherchez</div>
      <div className='border-[2px] py-1  text-xl bg-white rounded-lg hidden'>
        <div className='bg-gray-100 h-auto mx-2 py-1 px-2 rounded'> Niveau 1</div>
        <div className='bg-gray-100 h-auto mx-2 py-1 px-2 rounded'> Niveau 2</div>
      </div>
      <ul className='px-2 flex flex-wrap justify-between'>
        {courses.map(course => (
          <li key={course.id} className='w-[48%] p-4 ring-2 my-3 rounded bg-white text-black '>
            <Link href={`/schools/courses/${course.id}`}>
              <div>{course.title}</div>
            </Link>
            <p>{course.description}</p>
            <p><strong>School:</strong> {course.school}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
