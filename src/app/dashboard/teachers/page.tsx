'use client';

import { useState } from 'react';

const TeacherRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    teacher_id: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    subject: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/teacher/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Teacher Registration</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className="w-full p-2 border rounded" />
        <input type="text" name="employeeID" value={formData.employeeID} onChange={handleChange} placeholder="Employee ID" className="w-full p-2 border rounded" />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" className="w-full p-2 border rounded" />
        <input type="text" name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" className="w-full p-2 border rounded" />
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Register</button>
      </form>
    </div>
  );
};

export default TeacherRegistration;