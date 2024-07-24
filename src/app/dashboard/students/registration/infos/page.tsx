'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Form, Button, DatePicker, Select, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd';

const { Option } = Select;

const InfosPage = () => {
  const [formData, setFormData] = useState({
    date_of_birth: '',
    gender: '',
    address: '',
    img_profile1: '',
    img_profile2: '',
    img_profile3: '',
    img_profile4: '',
    img_profile5: '',
    img_profile6: '',
  });

  const [fileLists, setFileLists] = useState<Record<string, UploadFile[]>>({
    img_profile1: [],
    img_profile2: [],
    img_profile3: [],
    img_profile4: [],
    img_profile5: [],
    img_profile6: [],
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
    const { name, value } = e.target || e;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date: any, dateString: string) => {
    setFormData((prevData) => ({ ...prevData, date_of_birth: dateString }));
  };

  
  const handleUploadChange = (key: string): UploadProps['onChange'] => ({ fileList: newFileList }) => {
    setFileLists((prevFileLists) => ({ ...prevFileLists, [key]: newFileList }));
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      setFormData((prevData) => ({ ...prevData, [key]: newFileList[0].response.url }));
    }
  };

  const handleSubmit = async () => {
    // Store data in sessionStorage to be used in next steps
    sessionStorage.setItem('studentInfo', JSON.stringify(formData));
    router.push('/dashboard/students/registration/relatives');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-black/10 w-[100%]">
      <h1 className="text-3xl font-bold mb-4">Student Information</h1>
      <h1 className="text-3xl font-bold mb-4">Details</h1>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item name="gender">
          <Select placeholder='Sexe' onChange={(value) => handleChange({ target: { name: 'gender', value } })} style={{ width: '100%', height: '40px' }}>
            <Option value="Male">Homme</Option>
            <Option value="Female">Femme</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date_of_birth" className='mt-[-10px]'>
          <DatePicker placeholder="Date de Naissance" onChange={handleDateChange} style={{ width: '100%', height: '40px' }} />
        </Form.Item>
        <Form.Item name="address"className='mt-[-10px] px-2 border-[3px] rounded-lg bg-black/20' >
          <div className='text-lg font-bold text-white my-1'>Adresse de l'eleve</div>
          <div className='mt-[-10px] flex flex-wrap justify-between pb-3'>
          <Select placeholder="Pays" name="country" onChange={(value) => handleChange({ target: { name: 'country', value } })} style={{ width: '49%', height: '40px' }} className='mt-2'>
              <Option value="Mali">Mali</Option>
              <Option value="Burkina Faso" disabled>Burkina Faso</Option>
              <Option value="Niger" disabled>Niger</Option>
              {/* Add more countries as needed */}
            </Select>
            <Select placeholder="Ville" name="city" onChange={(value) => handleChange({ target: { name: 'city', value } })} style={{ width: '49%', height: '40px' }} className='mt-2'>
              <Option value="Bamako">Bamako</Option>
              <Option value="Ougadougou" disabled>Ougadougou</Option>
              <Option value="Niamey" disabled>Niamey</Option>
              {/* Add more cities as needed */}
            </Select>
            <Input placeholder="Commune" name="commune" value={formData.address} 
              onChange={handleChange} style={{ width: '39%', height: '40px' }} 
              className='mt-2'/>
            <Input placeholder="Quatier" name="neighbood" value={formData.address} 
              onChange={handleChange} style={{ width: '59%', height: '40px' }} 
              className='mt-2'/>
            <Input placeholder="Rue" name="street" value={formData.address} 
              onChange={handleChange} style={{ width: '44%', height: '40px' }} 
              className='mt-2' />
            <Input placeholder="Porte" name="door" value={formData.address} 
              onChange={handleChange} style={{ width: '18%', height: '40px' }} 
              className='mt-2' />
            <Input placeholder="Appartement" name="apartement" value={formData.address} 
              onChange={handleChange} style={{ width: '34%', height: '40px' }} 
              className='mt-2' />
          </div>
          </Form.Item>
          <div className='flex flex-wrap justify-around'>
            {['img_profile1', 'img_profile2', 'img_profile3', 'img_profile4', 'img_profile5', 'img_profile6'].map((key) => (
            <Form.Item key={key} name={key}>
              <ImgCrop rotationSlider>
                <Upload
                  action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                  listType="picture-card"
                  fileList={fileLists[key]}
                  onChange={handleUploadChange(key)}
                  className="bg-white rounded-lg font-semibold text-[16px] text-gray-400"
                  onPreview={(file) => {
                    let src = file.url as string;
                    if (!src) {
                      src = URL.createObjectURL(new Blob([file.originFileObj as Blob]));
                    }
                    const imgWindow = window.open(src);
                    imgWindow?.document.write(`<img src="${src}" />`);
                  }}>
                  {fileLists[key].length < 1 && `+ Photo ${key.replace('img_profile', '')}` }
                </Upload>
              </ImgCrop>
            </Form.Item>
          ))}
        </div>
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