'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Form, Button, Select } from 'antd';

const { Option } = Select;

const RelativesPage = () => {
  const [formData, setFormData] = useState({
    parent_name: '',
    parent_relationship: '',
    parent_phone_code: '+223',  // Default country code for Mali
    parent_phone: '',
    parent_email: '',
    parent_status: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target || e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    // Store data in sessionStorage to be used in next steps
    sessionStorage.setItem('studentRelatives', JSON.stringify(formData));
    router.push('/student/education-details');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black/10 w-[100%] h-[100%]">
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Parent Name" name="parent_name">
          <Input placeholder="Parent Name" name="parent_name" value={formData.parent_name} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item label="Parent Relationship" name="parent_relationship">
          <Select placeholder='Parent Relationship' onChange={(value) => handleChange({ target: { name: 'parent_relationship', value } })} style={{ width: '100%', height: '40px' }}>
            <Option value="father">Father</Option>
            <Option value="mother">Mother</Option>
            <Option value="step-father">Step-Father</Option>
            <Option value="step-mother">Step-Mother</Option>
            <Option value="brother">Brother</Option>
            <Option value="sister">Sister</Option>
            <Option value="half-brother">Half-Brother</Option>
            <Option value="half-sister">Half-Sister</Option>
            <Option value="uncle">Uncle</Option>
            <Option value="aunt">Aunt</Option>
            <Option value="god-father">God-Father</Option>
            <Option value="god-mother">God-Mother</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Parent Phone" name="parent_phone">
          <Input placeholder="Parent Phone" name="parent_phone" value={formData.parent_phone} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item label="Parent Email" name="parent_email">
          <Input placeholder="Parent Email" name="parent_email" value={formData.parent_email} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item label="Parent Status" name="parent_status">
          <Input placeholder="Parent Status" name="parent_status" value={formData.parent_status} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
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

export default RelativesPage;