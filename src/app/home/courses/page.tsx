// pages/courses.tsx
'use client';
import Link from 'next/link';
import { useCourses } from '../../../hooks/useCourses'; // Adjust the path as needed
import Image from 'next/image';

export default function Courses() {
  const { courses, loading, error } = useCourses();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className=''>
        <div className='mt-4 border-[2px] py-2 px-3 text-xl bg-gray-100 rounded-lg mb-1 hidden'>Recherchez</div>
        <div className='border-[2px] py-2 text-xl bg-white rounded-lg overflow-x-auto'>
          <div className='inline-flex text-[18px]'>
            <div className='bg-gray-100 h-auto mx-2 py-1 px-3 rounded'>Informatique</div>
            <div className='bg-gray-100 h-auto mx-2 py-1 px-3 rounded'>Robotique</div>
            <div className='bg-gray-100 h-auto mx-2 py-1 px-3 rounded'>Conception</div>
          </div>
        </div>
        <ul className='flex flex-wrap justify-between'>
          {courses.map((course) => (
            <li key={course.id} className='w-[48%] my-3 rounded-xl bg-white text-black'>
              <Link href={`/schools/courses/${course.id}`}>
                <div className='w-[100%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[200px] rounded-lg overflow-hidden relative'>
                  <Image
                    src={course.img1}
                    alt={course.title}
                    layout="fill"
                    objectFit="cover"
                    className='rounded-lg'
                  />
                  </div>
                  <div className='px-1 pt-2 text-sm'>
                    <div className='w-[100%] font-semibold my-1'>{course.title}</div>
                    <div className='flex-col justify-between'>
                      <div>{course.duration} semaines</div>
                      <div>maximum {course.max_students} élèves</div>
                      <div className='font-bold text-[17px] py-1'>{course.price} fcfa</div>
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