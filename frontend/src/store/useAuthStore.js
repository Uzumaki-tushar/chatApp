import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import {toast} from "react-hot-toast";
import { data } from "react-router-dom";


export const useAuthStore= create((set)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,

    checkAuth: async()=>{
        try{
            const res= await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        }
        catch(error){
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async(data)=>{
        set({isSigningUp:true});
        try{
            const res=await axiosInstance.post("/auth/signup",data);
            toast.success("Account created successfully");
            set({authUser:res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp:false});
        }
    },

    logout: async()=>{
        try{
            const res=await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true});
        try{
            const res=await axiosInstance.post("/auth/login",data);
            toast.success("Loggged in successfully");
            set({authUser:res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isLoggingIn:false});
        }
    },

    updateProfile: async(data)=>{
        set({isUpdatingProfile:true});
        try{
            const res= await axiosInstance.put("/auth/update-profile",data);
            set({authUser:res.data});
            toast.success("Profile updated successfully");
        }
        catch(error){
            console.log("error in update profile:",error);
            toast.error(error.response.data.message);
        }
        finally{
            set({isUpdatingProfile:false});
        }
    }


}))