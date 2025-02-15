import { createContext, useState } from "react";

import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {   
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'): '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dashData, setDashData] = useState(false)

    const getAllDoctors = async() => {
        try {
            const{data} = await axios.post(backendUrl + '/api/admin/all-doctors', {}, {headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
                console.log(error)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    const changeAvailability = async (docId) =>{
        try{
             const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
             if(data.success){
                toast.success(data.message)
                getAllDoctors()
             } else {
                toast.error(data.message)
             }
        } catch(error){
            toast.error(error.message)
        }
    }

    //get all appointments
    const getAllAppointments = async () => {
        try {
            if (!aToken) {
                toast.error('Authentication token is missing');
                return;
            }
    
            console.log('Token:', aToken); // Debug token
            console.log('Backend URL:', backendUrl); // Debug backend URL
    
            const { data } = await axios.get(`${backendUrl}/api/admin/appointments`, {
                headers: { aToken }
            });
    
            console.log('API Response:', data); // Debug API response
    
            if (data.success) {
                setAppointments(data.appointments);
                console.log('Appointments:', data.appointments);
            } else {
                toast.error(data.message || 'Failed to fetch appointments');
                console.log('API Error Message:', data.message);
            }
        } catch (error) {
            toast.error(error?.message || 'Something went wrong!');
            console.error('Error:', error);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try{
         const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointment', {appointmentId}, {headers:{aToken}})
         if(data.success){
            toast.success(data.message)
            getAllAppointments()
         } else {
            toast.error(data.message);
         }

        }catch(error){
            toast.error(error.message)
        }
    }

    const getDashboard = async () => {
        try {
           const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
           if(data.success){
               setDashData(data.dashboardData)
               console.log("Dashboard data", data.dashboardData)
           } else {
               toast.error(data.message)
           }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    const value ={
        aToken,setAToken,
        backendUrl, doctors,
        getAllDoctors, changeAvailability,
        appointments, setAppointments,
        getAllAppointments, cancelAppointment,
        dashData, setDashData,
        getDashboard
    }
    return(<AdminContext.Provider value={value}>
        {props.children}
    </AdminContext.Provider>)
}

export default AdminContextProvider;