'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Form, Button, DatePicker, Select } from 'antd';

const { Option } = Select;

const InfosPage = () => {
  const [formData, setFormData] = useState({
    date_of_birth: '',
    gender: '',
    address: '',
    img_profile: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target || e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: any, dateString: string) => {
    setFormData((prevData) => ({ ...prevData, date_of_birth: dateString }));
  };

  const handleSubmit = async () => {
    // Store data in sessionStorage to be used in next steps
    sessionStorage.setItem('studentInfo', JSON.stringify(formData));
    router.push('/student/relatives');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black/10 w-[100%]">
      <h1 className="text-3xl font-bold mb-4">Student Information</h1>
      <h1 className="text-3xl font-bold mb-4">Details</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Gender" name="gender">
          <Select placeholder='Gender' onChange={(value) => handleChange({ target: { name: 'gender', value } })} style={{ width: '100%', height: '40px' }}>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date of Birth" name="date_of_birth">
          <DatePicker placeholder="Date of Birth" onChange={handleDateChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input placeholder="Address" name="address" value={formData.address} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item label="Profile Picture URL" name="img_profile">
          <Input placeholder="Profile Picture URL" name="img_profile" value={formData.img_profile} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
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

export default InfosPage;