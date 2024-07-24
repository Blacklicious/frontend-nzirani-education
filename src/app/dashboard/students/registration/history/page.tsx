// Fixed version of EducationDetailsSection.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Input, DatePicker } from 'antd';
import moment from 'moment';

const EducationDetailsPage = () => {
  const [formData, setFormData] = useState({
    kindergarten: [],
    primary_school: [],
    middle_school: [],
    high_school: [],
    professional_school: [],
    college: [],
    university: [],
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target || e;
    const [field, index, subfield] = name.split('_');

    if (subfield) {
      setFormData((prevData) => {
        const updatedField = [...(prevData[field] || [])];
        updatedField[Number(index) - 1] = {
          ...updatedField[Number(index) - 1],
          [subfield]: value
        };
        return {
          ...prevData,
          [field]: updatedField
        };
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDateChange = (date: any, dateString: string, name: string) => {
    const [field, index, subfield] = name.split('_');

    setFormData((prevData) => {
      const updatedField = [...(prevData[field] || [])];
      updatedField[Number(index) - 1] = {
        ...updatedField[Number(index) - 1],
        [subfield]: dateString
      };
      return {
        ...prevData,
        [field]: updatedField
      };
    });
  };

  const handleSubmit = async () => {
    const personalInfo = JSON.parse(sessionStorage.getItem('studentInfo') || '{}');
    const relativesInfo = JSON.parse(sessionStorage.getItem('studentRelatives') || '{}');
    const fullFormData = { ...personalInfo, ...relativesInfo, ...formData };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register/student/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullFormData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        // Navigate to success or profile page
        router.push('/student/success');
      } else {
        console.error('Registration failed:', response.statusText);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const addYear = (level: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [level]: [...prevData[level], { school: '', start_month: '', end_month: '', average_grade: '' }],
    }));
  };

  const removeYear = (level: string, index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      [level]: prevData[level].filter((_, i) => i !== index),
    }));
  };

  const educationLevels = [
    { key: 'kindergarten', label: "Jardin d'enfants" },
    { key: 'primary_school', label: 'Premier Cycle' },
    { key: 'middle_school', label: 'Second Cycle' },
    { key: 'high_school', label: 'Lycée' },
    { key: 'professional_school', label: 'École professionnelle' },
    { key: 'college', label: 'Cours Préparatoire' },
    { key: 'university', label: 'Études universitaires' },
  ];

  return (
    <div className="container mx-auto px-2 py-8 bg-black/10 w-[100%]">
      <h1 className="text-3xl font-bold mb-4">Education Details</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        {educationLevels.map(({ key, label }) => (
          <div key={key} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{label}</h3>
            {formData[key].map((_, index) => (
              <div key={`${key}_year_${index + 1}`} className="mb-4">
                <h4 className="text-md font-medium mb-2">{`Year ${index + 1}`}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item name={`${key}_${index + 1}_start_month`}>
                    <DatePicker
                      picker="month"
                      placeholder="Start Month"
                      value={formData[key]?.[index]?.start_month ? moment(formData[key][index].start_month) : null}
                      onChange={(date, dateString) => handleDateChange(date, dateString, `${key}_${index + 1}_start_month`)}
                      style={{ width: '100%', height: '40px' }}
                    />
                  </Form.Item>
                  <Form.Item name={`${key}_${index + 1}_end_month`}>
                    <DatePicker
                      picker="month"
                      placeholder="End Month"
                      value={formData[key]?.[index]?.end_month ? moment(formData[key][index].end_month) : null}
                      onChange={(date, dateString) => handleDateChange(date, dateString, `${key}_${index + 1}_end_month`)}
                      style={{ width: '100%', height: '40px' }}
                    />
                  </Form.Item>
                  <Form.Item name={`${key}_${index + 1}_school`} className="col-span-2">
                    <Input
                      placeholder="School"
                      name={`${key}_${index + 1}_school`}
                      value={formData[key]?.[index]?.school || ''}
                      onChange={handleChange}
                      style={{ width: '100%', height: '40px' }}
                    />
                  </Form.Item>
                  <Form.Item name={`${key}_${index + 1}_average_grade`} className="col-span-2 md:col-span-1">
                    <Input
                      placeholder="Average Grade"
                      name={`${key}_${index + 1}_average_grade`}
                      value={formData[key]?.[index]?.average_grade || ''}
                      onChange={handleChange}
                      style={{ width: '100%', height: '40px' }}
                    />
                  </Form.Item>
                  <Button type="primary" danger onClick={() => removeYear(key, index)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="dashed" onClick={() => addYear(key)} className="w-full">
              Add Year
            </Button>
          </div>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EducationDetailsPage;