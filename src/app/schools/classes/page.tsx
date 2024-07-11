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
    <div>
      <h1>Courses List</h1>
      <ul className='p-2 flex flex-wrap justify-between'>
        {courses.map(course => (
          <li key={course.id} className='w-[48%] p-4 ring-2 my-4 rounded '>
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
