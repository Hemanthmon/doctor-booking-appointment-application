import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContest';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const {setAToken, backendUrl} = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try{
         if(state === 'Admin'){
             const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
             if(data.success) {
               localStorage.setItem('aToken', data.token)
                setAToken(data.token)
                toast.success('Login successful!');
             }
          else {
             toast.error(data.message || 'Login Failed');
          }
         } else {
              const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
              if(data.success){
                localStorage.setItem('dToken', data.token)
                setDToken(data.token)
                console.log(data.token)
                toast.success('Login successful!')
              } else {
                toast.error(data.message || 'Login Failed')
        }
      }
    }catch{
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  }
  return (
    <form className="min-h-[80vh] flex items-center"
    onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-[384px] border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-purple-700">{state}</span> Login
        </p>
        <div className="w-full">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-700"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-700 text-white w-full py-2 rounded-md text-base hover:bg-purple-800 transition"
        >
          Login
        </button>
        {state === 'Admin' ? (
          <p className="text-center w-full">
            Doctor Login?{' '}
            <span
              className="text-purple-700 underline cursor-pointer"
              onClick={() => setState('Doctor')}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-center w-full">
            Admin Login?{' '}
            <span
              className="text-purple-700 underline cursor-pointer"
              onClick={() => setState('Admin')}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
