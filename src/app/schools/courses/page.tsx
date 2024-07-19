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
    <div className=''>
      <div className='mt-4 border-[2px] py-2 px-3 text-xl bg-gray-100 rounded-lg mb-1 hidden'>Recherchez</div>
      <div className='border-[2px] py-2  text-xl bg-white rounded-lg overflow-x-auto '>
        <div className='inline-flex'>
          <div className='bg-gray-100 h-auto mx-2 py-1 px-3 rounded'> Informatique </div>
          <div className='bg-gray-100 h-auto mx-2 py-1 px-3 rounded'> Robotique </div>
          <div className='bg-gray-100 h-auto mx-2 py-1 px-3 rounded'> Conception </div>
        </div>
      </div>
      <ul className=' flex flex-wrap justify-between'>
        {courses.map(course => (
          <li key={course.id} className='w-[48%] my-3 rounded-xl bg-white text-black '>
            <Link href={`/schools/courses/${course.id}`}>
              <div className='w-[100%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div className='w-[100%] font-semibold my-1'>{course.title}</div>
                  <div className='flex justify-between'>
                    <div>{course.school}</div>
                    <div>{course.instructor}</div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      
    </div>
    </div>
  );
}
