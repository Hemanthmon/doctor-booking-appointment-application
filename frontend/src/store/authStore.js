import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";


const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.withCredentials = true;



export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  verificationEmail : null,
  setVerificationEmail: (email) => set({ verificationEmail: email }), // Function to update email
  clearVerificationEmail: () => set({ verificationEmail: null }), 


  login: (userData) => set({ user: userData }), // Action to set user data
  logout: () => set({ user: null }), // Action to log out the user

  updateUser: (updatedUser) => {
    set((state) => ({
      user: { ...state.user, ...updatedUser }, // Update user in the local store
    }));
  },

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null }); // Start loading
    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, { email, password, name });
      if (!response.data?.success) throw new Error(response.data?.message || "Signup failed");
      
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false, // Stop loading
        error: null,
        verificationEmail: email, // Store email for verification
      });
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || "Error signing up";
      set({
        error: errorMessage,
        isLoading: false, // Stop loading
      });
      throw error; // Pass error for component-level handling
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${backendUrl}/api/auth/verify-email`, { code });
      set({ 
        user: response.data.user,
        isVerified: true,
        isAuthenticated: false
        
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error in verifying email";
      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  


// resendVerificationEmail: async (email) => {
  
//   try {
      
//       if (!user || !user.email) {
//           console.error("❌ Error: User email is missing.");
//           return { success: false, message: "User email is missing. Please log in again." };
//       }

//       console.log("🔍 Email for resending:", user.email);
//       console.log("🔗 API URL:", `${backendUrl}/api/auth/resend-verification-email`);

//       const response = await axios.post(
//           `${backendUrl}/api/auth/resend-verification-email`,
//           { email: user.email }
//       );

//       console.log("✅ API Response:", response.data);
//       return response.data;
//   } catch (error) {
//       console.error("❌ Resend email error:", error.response?.data || error.message);
//       return { success: false, message: error.response?.data?.message || "Failed to resend verification email." };
//   }
// },
resendVerificationEmail: async (email) => {
  try {
    if (!email) {
      console.error("❌ Error: Email is missing.");
      return { success: false, message: "Email is required for resending verification." };
    }

    console.log("🔍 Email for resending:", email);
    console.log("🔗 API URL:", `${backendUrl}/api/auth/resend-verification-email`);

    const response = await axios.post(
      `${backendUrl}/api/auth/resend-verification-email`,
      { email } // ✅ Use the email parameter
    );

    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Resend email error:", error.response?.data || error.message);
    return { success: false, message: error.response?.data?.message || "Failed to resend verification email." };
  }
},


  
  
  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${backendUrl}/api/auth/check-auth`, { withCredentials: true })
      if(response.data?.user){
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false
      });
    } else {
      set({ isCheckingAuth: false, isAuthenticated: false });
    }
    } catch (error) {
      console.error("Auth check error:", error.response?.data || error.message);
      set({ error: null, 
        isCheckingAuth: false, 
        isAuthenticated: false })
    }
  },

  // login: async (email, password) => {
  //   set({ isLoading: true, error: null }); // Reset loading and error state

  //   try {
  //     // Ensure API_URL is correctly defined
  //     const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
  //     console.log(response.data);

  //     set({
  //       isAuthenticated: true,
  //       user: response.data.user, // Ensure backend sends `user` field
  //       error: null,
  //       isLoading: false,
  //     });
  //     await loadUserProfileData();
  //     return response.data; // Optionally return data if needed
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.message || "Error in logging in. Please try again.";

  //     console.error("Login Error:", error); // Log error for debugging

  //     set({
  //       error: errorMessage, // Update error message in state
  //       isLoading: false,
  //     });

  //     // Optionally handle error with additional logic if needed
  //     // Example: Log errors to a monitoring service
  //   }
  // },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
  
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
        
      });
  
      await loadUserProfileData();
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error in logging in. Please try again.";
  
      console.error("Login Error:", error);
  
      set({ error: errorMessage, isLoading: false });
  
      // Check if error message includes "email not verified"
      if (errorMessage.toLowerCase().includes("email not verified")) {
        set({ verificationEmail: email }); // ✅ Store email for verification
        return { unverified: true }; // This flag triggers redirection in the UI
      }
    }
  },
  

  loadUserProfileData: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/get-profile`)
      if (data.success) {
        set({ user: data.userData, isAuthenticated: true, isLoading: false })
      } else {
        set({ isLoading: false });
        toast.error(data.error.message || "Failed to load user profile data.")
      }
      console.log("User Image:", user?.image);
      console.log("Profile Pic:", assets.profile_pic);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error loading user profile data.";

      console.error("Error Loading user profile:", error);
      set({
        isLoading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
      throw error;
    }
  },

  updateUserProfile: async (updatedData) => {
    set({ isLoading: true, error: null }); // Indicate loading state
     // ✅ Debug Log
    const formData = new FormData();

  // Append the profile fields to the FormData object
  formData.append('name', updatedData.name);
  formData.append('phone', updatedData.phone);
  formData.append('address', JSON.stringify(updatedData.address));
  formData.append('gender', updatedData.gender || "Not Selected");
  formData.append('dob', updatedData.dob);
  formData.append('bloodGroup', updatedData.bloodGroup || "Unknown");  // ✅ Add blood group


   // If an image file exists, append it to the FormData object
  if (updatedData.image) {
    formData.append('image', updatedData.image);
  }

    try {
      const response = await axios.put(`${backendUrl}/api/auth/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Make sure the server knows it's FormData
        },
      } )
      if (response.data.success) {
        set((state)=> ({
          user: { ...state.user, ...response.data.updatedUser }, 
          isLoading: false,
        }))

        toast.success('Profile updated successfully!');
      } else {
        set({ isLoading: false });
        toast.error(response.data.message || 'Failed to update profile.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error updating profile.';
      console.error('Error updating profile:', error);
      set({
        isLoading: false,
        error: errorMessage,
      });
      toast.error(errorMessage);
      throw error; // Rethrow error if needed for further handling
    }
  },

  logout: async () => {
    set({ isloading: true, error: null });
    try {
      await axios.post(`${backendUrl}/api/auth/logout`)
      set({ 
        user: null, 
        isAuthenticated: false, 
        isCheckingAuth: false, // ✅ Ensure user is unauthenticated
        verificationEmail: null, // ✅ Clear verification email state
        appointmentsFetched: false,
        error: null, 
        isLoading: false 
      });
      set({ appointmentsFetched: false }); 
    } catch (error) {
      set({ error: "Error in logging Out", isloading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${backendUrl}/api/auth/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false })
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error in sending reset password email"
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${backendUrl}/api/auth/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error?.response?.data?.message || "Error resetting password",

      });
      throw error;
    }

  },
  clearError: () => set({ error: null })

}));
