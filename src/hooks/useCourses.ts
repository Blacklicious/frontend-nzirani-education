// hooks/useCourses.ts
import { useEffect, useState } from 'react';

interface Review {
  userId: number;
  rating: number;
  comment: string;
  date: string;
}

interface Course {
  id: number;
  title: string;
  prerequisite: string;
  price: number;
  description: string;
  duration: string;
  instructor: string;
  school: string;
  startDate: string;
  endDate: string;
  syllabus: string[];
  format: string;
  category: string;
  enrollmentStatus: string;
  ratings: number;
  reviews: Review[];
  picture1: string;
}


export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAndCompareCourses = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/courses/api/v1/`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch courses from API');
        }

        const fetchedData = await res.json();
        const storedData = localStorage.getItem('courses');

        if (storedData) {
          const parsedStoredData = JSON.parse(storedData);

          if (JSON.stringify(fetchedData) !== JSON.stringify(parsedStoredData)) {
            localStorage.setItem('courses', JSON.stringify(fetchedData));
            setCourses(fetchedData);
          } else {
            setCourses(parsedStoredData);
          }
        } else {
          localStorage.setItem('courses', JSON.stringify(fetchedData));
          setCourses(fetchedData);
        }
      } catch (error) {
        console.error('API call failed:', error.message);
        setError(error.message);
        const storedData = localStorage.getItem('courses');

        if (storedData) {
          setCourses(JSON.parse(storedData));
        } else {
          console.error('No courses data available in local storage');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAndCompareCourses();
  }, []);

  return { courses, loading, error };
};