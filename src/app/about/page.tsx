import React from 'react';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <div>
          <h1 className='text-4xl mb-4'>About Us</h1>
          <p className='text-lg'>
            Welcome to Nzirani Education. Our mission is to facilitate education through advanced technological solutions.
            We offer a variety of courses, expert instructors, and a supportive learning environment. Join us to embark on
            your educational journey and achieve your goals with our comprehensive programs.
          </p>
        </div>
      </div>
    </div>
  );
}
