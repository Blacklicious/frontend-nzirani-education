'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Input } from 'antd';

const { TextArea } = Input;

const MedicalRecordPage = () => {
  const [formData, setFormData] = useState({
    medical_conditions: '',
    allergies: '',
    emergency_contact: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/student/medical/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/student/extra');
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="container mx-auto px-2 py-8 bg-black/10 w-[100%]">
      <h1 className="text-3xl font-bold mb-4">Medical Record</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Medical Conditions" name="medical_conditions">
          <TextArea name="medical_conditions" value={formData.medical_conditions} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Allergies" name="allergies">
          <TextArea name="allergies" value={formData.allergies} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Emergency Contact" name="emergency_contact">
          <Input name="emergency_contact" value={formData.emergency_contact} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Next
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MedicalRecordPage;