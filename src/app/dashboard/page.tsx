'use client';

import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = sessionStorage.getItem('access_token');
        console.log('Access Token:', accessToken); // Debugging line
        if (!accessToken) {
          console.log('No access token found'); // Debugging line
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log('User data fetched successfully:', userData); // Debugging line
          setUser(userData);
        } else {
          console.log('Failed to fetch user data, response status:', response.status); // Debugging line
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <div className='px-4 w-[100%] flex justify-between'>
            <div className='bg-gray-300 p-2 rounded w-[70%]'>
              <div className='flex items-center'>
                <div className='text-lg mr-2'>Salut </div><div className='text-xl'>👋🏾 ,</div>
              </div>
              <div className='text-xl font-bold'> {user.full_name}</div>
            </div>
            <div className='px-2 w-[28%] bg-gray-300 rounded flex justify-between text-4xl items-center'>
              <div>🛍️</div>
              <div>🔔</div>
            </div>
          </div>
          <div className='p-4 flex justify-between'>
            <div className='bg-gray-300 rounded-lg py-2 px-4 w-[100%] mr-2'>
              Quel cours recherchez vous ? 
            </div>
            <div className='bg-gray-300 rounded-lg py-2 px-4 w-[50px]'>
              | | 
            </div>
          </div>
          <div>
            <div className='px-4 pb-2 text-xl font-bold'>Vos cours </div>
            <div className='overflow-x-scroll ml-4'>
              <div className='inline-flex whitespace-nowrap h-[110px]'>
                <div className='bg-white/80 h-[100%] w-[250px] rounded-xl mr-4'>1</div>
                <div className='bg-white/80 h-[100%] w-[250px] rounded-xl mr-4'>2</div>
                <div className='bg-white/80 h-[100%] w-[250px] rounded-xl mr-4'>3</div>
                <div className='bg-white/80 h-[100%] w-[250px] rounded-xl mr-4'>4</div>
              </div>
            </div>
          </div>
          <div className='px-4 pt-4'>
            <div className='text-xl font-bold'>Categories</div>
            <div className='overflow-x-scroll mt-2'>
                <div className='inline-flex whitespace-nowrap h-[100%]'>
                  <div className='bg-white/80 h-[100%] w-[100%] rounded-xl mr-4 px-4 py-2'>Programmation</div>
                  <div className='bg-white/80 h-[100%] w-[100%] rounded-xl mr-4 px-4 py-2'>Fabrication</div>
                  <div className='bg-white/80 h-[100%] w-[100%] rounded-xl mr-4 px-4 py-2'>Conception</div>
                  <div className='bg-white/80 h-[100%] w-[100%] rounded-xl mr-4 px-4 py-2'>4</div>
                </div>
              </div>
            </div>
          <div className='p-4'>
          <div className='text-xl font-bold'>Featured Course</div>
            <div className='flex flex-wrap justify-between space-y-3'>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2 mt-3'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div className='flex justify-between'>
                    <div>14 modules</div>
                    <div>price</div>
                  </div>
                </div>
              </div>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div>14 modules</div>
                  <div>price</div>
                </div>
              </div>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div>14 modules</div>
                  <div>price</div>
                </div>
              </div>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div>14 modules</div>
                  <div>price</div>
                </div>
              </div>
            </div>

          </div>
          <div>
            list de toute les cours
            <div className='flex flex-wrap justify-between space-y-3'>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2 mt-3'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div className='flex justify-between'>
                    <div>14 modules</div>
                    <div>price</div>
                  </div>
                </div>
              </div>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-3 text-sm'>
                  <div>title</div>
                  <div>14 modules</div>
                  <div>price</div>
                </div>
              </div>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div>14 modules</div>
                  <div>price</div>
                </div>
              </div>
              <div className='w-[49%] bg-white h-[100%] rounded-xl p-2'>
                <div className='bg-gray-100 shadow-md h-[140px] rounded-lg'></div>
                <div className='px-1 py-2 text-sm'>
                  <div>title</div>
                  <div>14 modules</div>
                  <div>price</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;