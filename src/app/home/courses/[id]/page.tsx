// pages/courses/[id].tsx
'use client';
import { usePathname } from 'next/navigation';
import { useCourseDetails } from '../../../../hooks/useCourseDetails'; // Adjust the path as needed
import Image from 'next/image';

const CourseDetails = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop(); // Extract the last part of the pathname as the course ID

  if (!id) {
    return <div>Loading...</div>;
  }

  const courseId = parseInt(id, 10);
  const { course, loading, error } = useCourseDetails(courseId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }
  return (
    <div className="">
      <div className='bg-gray-100 shadow-md h-[500px] rounded-lg overflow-hidden relative'>
        <Image
          src={course.img1}
          alt={course.title}
          layout="fill"
          objectFit="cover"
          className='rounded-lg'
        />
      </div>
      <div className=' pb-8'>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg mb-2">Prerequisite: {course.prerequisite}</p>
          <p className="text-lg mb-2">Prix: {course.price} fcfa</p>
          <p className="text-lg mb-2">{course.max_modules} modules</p>
          <p className="text-lg mb-2">Instructor: {course.instructor}</p>
          <p className="text-lg mb-2">School: {course.school}</p>
          <div className='px-2'>
            classes
            <p className="text-xl mb-2">Start Date: {course.startDate}</p>
            <p className="text-xl mb-2">End Date: {course.endDate}</p>
          </div>
          <p className="text-xl mb-2">Format: {course.format}</p>
          <p className="text-xl mb-2">Category: {course.category}</p>
          <p className="text-xl mb-2">Enrollment Status: {course.enrollmentStatus}</p>
          <p className="text-xl mb-2">Ratings: {course.ratings}</p>
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p>{course.description}</p>
        </div>
      </div> 
      {/*<div className="bg-white p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
        <ul className="list-disc pl-5">
          {course.syllabus.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {course.reviews.map((review, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold">{review.comment}</p>
            <p>Rating: {review.rating}</p>
            <p>Date: {review.date}</p>
          </div>
        ))}
      </div>*/}
    </div>
  );
};


export default CourseDetails;