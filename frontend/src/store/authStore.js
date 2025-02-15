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
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message || "Error in verifying mail", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${backendUrl}/api/auth/check-auth`, { withCredentials: true })
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false
      });
    } catch (error) {
      console.error("Auth check error:", error.response?.data || error.message);
      set({ error: null, 
        isCheckingAuth: false, 
        isAuthenticated: false })
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null }); // Reset loading and error state

    try {
      // Ensure API_URL is correctly defined
      const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      console.log(response.data);

      set({
        isAuthenticated: true,
        user: response.data.user, // Ensure backend sends `user` field
        error: null,
        isLoading: false,
      });
      await loadUserProfileData();
      return response.data; // Optionally return data if needed
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error in logging in. Please try again.";

      console.error("Login Error:", error); // Log error for debugging

      set({
        error: errorMessage, // Update error message in state
        isLoading: false,
      });

      // Optionally handle error with additional logic if needed
      // Example: Log errors to a monitoring service
    }
  },

  loadUserProfileData: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/get-profile`)
      if (response.data.success) {
        set({ user: data.userData, isAuthenticated: true, isLoading: false })
      } else {
        set({ isLoading: false });
        toast.error(data.error.message || "Failed to load user profile data.")
      }
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

    const formData = new FormData();

  // Append the profile fields to the FormData object
  formData.append('name', updatedData.name);
  formData.append('phone', updatedData.phone);
  formData.append('address', JSON.stringify(updatedData.address));
  formData.append('gender', updatedData.gender);
  formData.append('dob', updatedData.dob);

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
        set({
          user: response.data.updatedUser,
          isLoading: false,
        })

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
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
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

  }

}));
