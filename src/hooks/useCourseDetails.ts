// hooks/useCourseDetails.ts
import { useEffect, useState } from 'react';

interface Course {
  id: number;
  title: string;
  prerequisite: string;
  price: number;
  description: string;
  max_modules: string; // e.g., '2 months', '3 weeks'
  instructor: string;
  school: string;
  startDate: string; // e.g., '2024-07-01'
  endDate: string; // e.g., '2024-09-01'
  syllabus: string[]; // List of topics or modules covered
  format: string; // e.g., 'Online', 'In-Person'
  category: string; // e.g., 'Technology', 'Science'
  enrollmentStatus: string; // e.g., 'Open', 'Closed'
  ratings: number; // Average rating out of 5
  reviews: Review[]; // Array of review objects
  picture1: string; // URL to an image representing the course
}
interface Review {
  userId: number;
  rating: number;
  comment: string;
  date: string; // e.g., '2024-07-01'
}

export const useCourseDetails = (courseId: number) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const storedCourses = localStorage.getItem('courses');
        
        if (storedCourses) {
          const parsedStoredCourses: Course[] = JSON.parse(storedCourses);
          const storedCourse = parsedStoredCourses.find(c => c.id === courseId);
          
          if (storedCourse) {
            setCourse(storedCourse);
            setLoading(false);
            return;
          }
        }

        // If course is not found in local storage, fetch from API
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/api/v1/${courseId}/`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch course details from API');
        }

        const fetchedCourse: Course = await res.json();
        setCourse(fetchedCourse);
        
        // Optionally update local storage
        if (storedCourses) {
          const parsedStoredCourses: Course[] = JSON.parse(storedCourses);
          localStorage.setItem('courses', JSON.stringify([...parsedStoredCourses, fetchedCourse]));
        } else {
          localStorage.setItem('courses', JSON.stringify([fetchedCourse]));
        }
      } catch (error) {
        console.error('API call failed:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { course, loading, error };
};