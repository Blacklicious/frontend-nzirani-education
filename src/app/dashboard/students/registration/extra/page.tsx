'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Input, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
  
const { TextArea } = Input;

const ExtraDetailsPage = () => {
  const [formData, setFormData] = useState({
    clubs: '',
    achievements: '',
    notes: '',
    termsAccepted: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setFormData((prevData) => ({ ...prevData, termsAccepted: e.target.checked }));
  };
  
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/student/extra/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="container mx-auto px-2 py-8 bg-black/10 w-[100%]">
      <h1 className="text-3xl font-bold mb-4">Extra Details</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Clubs" name="clubs">
          <TextArea name="clubs" value={formData.clubs} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Achievements" name="achievements">
          <TextArea name="achievements" value={formData.achievements} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <TextArea name="notes" value={formData.notes} onChange={handleChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Checkbox checked={formData.termsAccepted} onChange={handleCheckboxChange}>
            I agree to the terms and conditions
          </Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ExtraDetailsPage;