import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import LoadingSpinner from '../components/LoadingSpinner';

const MyAppointments = () => {
  const { backendUrl, getDoctorsData } = useContext(AppContext);
  const { user, isAuthenticated } = useAuthStore();
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true); // Manage loading state
  const [appointmentsFetched, setAppointmentsFetched] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
 const months = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
 const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-');
    return dateArray[0]+" "+months[Number(dateArray[1])] + " " + dateArray[2];
 }
  if (!isAuthenticated) {
    toast.warn('Please login to book an appointment');
    navigate('/login');
    return null; // Ensure component does not render further
  }

  const getUserAppointments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/appointments`);
      if (data.success) {
        setAppointment(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const cancelAppointment = async (appointmentId) => {
    setLoading(true);
    try {

      console.log(appointmentId);
      const { data } = await axios.post(`${backendUrl}/api/auth/cancel-appointment`, {
        appointmentId,
      });
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const initPay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointmennt Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
           console.log("Razorpay response",response);

           try {
            const { data } = await axios.post(`${backendUrl}/api/auth/verifyRazorpay`, response);
            if (data.success) {
              toast.success(data.message);
              getUserAppointments();
              navigate('/my-appointments');
              
            } else {
              console.log(data.message);  
              toast.error(data.message);
            }
           } catch (error) {
             console.error("Payment verification error",error);
             toast.error(error.response?.data?.message || error,message);
            
           }
      }, 
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#3399cc',
      },
    }
    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      console.error("Payment Failed:", response);
      toast.error("Payment failed. Please try again.");
    });
    rzp.open();
  }

  const appointmentRazorpay = async (appointmentId, fees) => {
    console.log("Initiating payment for Appointment ID:", appointmentId, "Amount:", fees);

    console.log("Appointment ID:", appointmentId);
      console.log("Amount:", fees); // Debug amount
    try {
     
      const {data} = await axios.post(`${backendUrl}/api/auth/payment-razorpay`, {  appointmentId, amount: fees});
      if (data.success) {
        console.log("Order",data.order);
        initPay(data.order);
        } else {
          toast.error(data.message || "Failed to initiate payment.");
        }
    } catch (error) {
      console.error("Error in Payment API:", error);
    toast.error(error.response?.data?.message || "Error initiating payment.");
    }
  }

  useEffect(() => {
    if (user && !appointmentsFetched) {
      getUserAppointments();
      setAppointmentsFetched(true);
    } else if (!user) {
      setAppointmentsFetched(false);
      setAppointment([]); // Clear appointments when user logs out
    }
  }, [user, appointmentsFetched]);

  const parseAddress = (address) => {
    try {
      if (typeof address === 'string') {
        // Replace single quotes with double quotes and clean up JSON string
        const sanitizedAddress = address
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/(\w+):/g, '"$1":'); // Wrap keys in double quotes
        return JSON.parse(sanitizedAddress); // Convert to object
      }
      return address; // Return as is if already an object
    } catch (error) {
      console.log('Invalid address format:', address, error);
      return { line1: 'No address available', line2: '' }; // Fallback
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
      <div>
        {appointment.slice(0, 6).map((item, index) => {
          const address = item.docData && item.docData.address
            ? parseAddress(item.docData.address)
            : { line1: 'No address available', line2: '' };

          return (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >
              <div>
                <img
                  className="w-32 bg-indigo-100"
                  src={item.docData.image || '/placeholder.png'}
                  alt={item.docData.name || 'Doctor'}
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">{item.docData.name || 'Unknown Doctor'}</p>
                <p>{item.docData.speciality || 'General Practitioner'}</p>
                <p className="text-zinc-700 font-medium mt-1 text-[15px]">Address:</p>
                <p>{address.line1}</p>
                <p>{address.line2}</p>
                <p className="text-sm mt-1">
                  <span className="text-sm text-neutral-700 font-medium">
                    Date & Time:
                  </span>
                  {slotDateFormat(item.slotDate)} || {item.slotTime || 'N/A'}
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-white bg-purple-500'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id, item.docData?.fees)} className="text-sm text-stone-500 text-center w-40 sm:min-w-48 py-3 border hover:bg-purple-600 hover:text-white transition-all duration-300">
                  Pay Online
                </button>}
               {!item.cancelled &&  
               !item.isCompleted &&
               <button 
                onClick={() => cancelAppointment(item._id)}
                className="text-sm text-stone-500 text-center w-40 sm:min-w-48 py-3 border hover:bg-red-600 hover:text-white transition-all duration-300">
                  Cancel Appointment
                </button>}
                {item.cancelled && !item.isCompleted &&<button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border borrder-green-500 rounded text-green-500'>Completed</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
