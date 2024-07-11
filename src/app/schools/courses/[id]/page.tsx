'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CourseDetails() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    async function fetchCourse() {
      if (id) {
        const res = await fetch('/data/courses.json');
        const data = await res.json();
        const courseData = data.find(course => course.id === parseInt(id));
        setCourse(courseData);
      }
    }
    fetchCourse();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p><strong>School:</strong> {course.school}</p>
      <p><strong>Instructor:</strong> {course.instructor}</p>
    </div>
  );
}
