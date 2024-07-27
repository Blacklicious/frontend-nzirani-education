'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Button, Input, DatePicker } from 'antd';
import moment from 'moment';

interface EducationYear {
  school: string;
  start_month: string;
  end_month: string;
  average_grade: string;
}

interface FormData {
  kindergarten: EducationYear[];
  primary_school: EducationYear[];
  middle_school: EducationYear[];
  high_school: EducationYear[];
  professional_school: EducationYear[];
  college: EducationYear[];
  university: EducationYear[];
}

const EducationDetailsPage = () => {
  const [formData, setFormData] = useState<FormData>({
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

    setFormData((prevData) => {
      const updatedField = [...(prevData[field as keyof FormData] || [])];
      updatedField[Number(index) - 1] = {
        ...updatedField[Number(index) - 1],
        [subfield]: value
      };
      return {
        ...prevData,
        [field]: updatedField
      };
    });
  };

  const handleDateChange = (date: any, dateString: string, name: string) => {
    const [field, index, subfield] = name.split('_');

    setFormData((prevData) => {
      const updatedField = [...(prevData[field as keyof FormData] || [])];
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
    // Store data in sessionStorage to be used in next steps
    sessionStorage.setItem('studentInfo', JSON.stringify(formData));
    router.push('/dashboard/students/registration/health');
  };
  /*
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
  }; */

  const addYear = (level: keyof FormData) => {
    setFormData((prevData) => ({
      ...prevData,
      [level]: [...prevData[level], { school: '', start_month: '', end_month: '', average_grade: '' }],
    }));
  };

  const removeYear = (level: keyof FormData, index: number) => {
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
    <div className="container mx-auto px-3 py-8 bg-black/10 w-[100%] text-black">
      <h1 className="text-3xl font-bold mb-4">Education Details</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        {educationLevels.map(({ key, label }) => (
          <div key={key} className="mb-4 p-2 bg-black/60 rounded-lg">
            <h3 className="text-lg font-bold px-2 mb-2 bg-white/90 rounded-md">{label}</h3>
            {formData[key as keyof FormData].map((_, index) => (
              <div key={`${key}_year_${index + 1}`} className="my-2 bg-white/20 px-2 py-1 h-[118px] rounded-lg ">
                <div className="text-lg pl-2 pt-1 mb-[7px] text-white font-bold flex justify-between items-center h-[30px]">
                  {`Année ${index + 1}`} 
                  <Button type="link" onClick={() => removeYear(key as keyof FormData, index)} 
                    className="bg-red-500 h-[100%] text-white font-medium">Supprimer</Button>
                </div>
                <div className='flex justify-between w-[100%] h-[30px] mb-[6px]'>
                  <Form.Item name={`${key}_${index + 1}_start_month`} className='w-[49%]'>
                    <DatePicker
                      picker="month"
                      placeholder="Debut de l'année "
                      value={formData[key as keyof FormData][index]?.start_month ? moment(formData[key as keyof FormData][index].start_month) : null}
                      onChange={(date, dateString) => handleDateChange(date, dateString, `${key}_${index + 1}_start_month`)}
                      style={{ width: '100%', height: '30px' }}
                    />
                  </Form.Item>
                  <Form.Item name={`${key}_${index + 1}_end_month`} className='w-[49%]'>
                    <DatePicker
                      picker="month"
                      placeholder="Fin de l'année"
                      value={formData[key as keyof FormData][index]?.end_month ? moment(formData[key as keyof FormData][index].end_month) : null}
                      onChange={(date, dateString) => handleDateChange(date, dateString, `${key}_${index + 1}_end_month`)}
                      style={{ width: '100%', height: '30px' }}
                    />
                  </Form.Item>
                </div>
                <div className='flex justify-between mt-1'>
                  <Form.Item name={`${key}_${index + 1}_school`} className="w-[59%]">
                    <Input
                      placeholder="Nom de l'etaablissement"
                      name={`${key}_${index + 1}_school`}
                      value={formData[key as keyof FormData][index]?.school || ''}
                      onChange={handleChange}
                      style={{ width: '100%', height: '30px' }}
                    />
                    </Form.Item>
                    <Form.Item name={`${key}_${index + 1}_average_grade`} className="w-[39%]">
                      <Input
                        placeholder="Moyenne Générale" 
                        name={`${key}_${index + 1}_average_grade`}
                        value={formData[key as keyof FormData][index]?.average_grade || ''}
                        onChange={handleChange}
                        style={{ width: '100%', height: '30px' }}
                      />
                    </Form.Item>
                </div>
              </div>
            ))}
            <Button type="dashed" onClick={() => addYear(key as keyof FormData)} className="w-full">
              + Ajouter une année scolaire
            </Button>
          </div>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Continuer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EducationDetailsPage;