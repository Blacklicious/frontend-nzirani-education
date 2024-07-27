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
    router.push('/dashboard/students/registration/history');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black/10 w-[100%] h-[100%]">
      <h1 className="text-3xl font-bold mb-4">Informations sur les parents</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item  name="parent_name">
          <Input placeholder="Nom et Prénom du Parent" name="parent_name" value={formData.parent_name} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item name="parent_relationship">
          <Select placeholder='Relation avec le Parent' onChange={(value) => handleChange({ target: { name: 'parent_relationship', value } })} style={{ width: '100%', height: '40px' }}>
            <Option value="father">Père</Option>
            <Option value="mother">Mère</Option>
            <Option value="step-father">Beau-Père</Option>
            <Option value="step-mother">Belle-Mère</Option>
            <Option value="brother">Frère</Option>
            <Option value="sister">Sœur</Option>
            <Option value="half-brother">Demi-Frère</Option>
            <Option value="half-sister">Demi-Sœur</Option>
            <Option value="uncle">Oncle</Option>
            <Option value="aunt">Tante</Option>
            <Option value="god-father">Parrain</Option>
            <Option value="god-mother">Marraine</Option>
          </Select>
        </Form.Item>
        <div className='flex gap-2 mb-4'>
          <Select placeholder='Indicatif du Pays' onChange={(value) => handleChange({ target: { name: 'parent_phone_code', value } })} style={{ width: '40%', height: '40px' }}>
            <Option value="+223">Mali</Option>
            <Option value="+224">Guinée</Option>
            <Option value="+225">Côte d'Ivoire</Option>
            <Option value="+226">Burkina Faso</Option>
            <Option value="+227">Niger</Option>
            <Option value="+228">Togo</Option>
            <Option value="+229">Bénin</Option>
          </Select>
          <Input placeholder="Téléphone du Parent" name="parent_phone" value={formData.parent_phone} onChange={handleChange} style={{ width: '55%', height: '40px' }} />
        </div>
        <Form.Item name="parent_email">
          <Input placeholder="Email du Parent" name="parent_email" value={formData.parent_email} onChange={handleChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Suivant
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RelativesPage;