import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

// Tipado del usuario autenticado
type AuthUser = {
  _id: string;
  fullName: string;
  email: string;
  profilePic: string;
  lastConnection?: Date | null;
};

// Tipado para los datos de signup
interface SignUpData {
  fullName: string;
  email: string;
  password: string;
}

interface AuthState {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: AuthUser[];

  signup: (data: SignUpData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  checkAuth:()=>Promise<void>
}

// const BASE_URL = import.meta.env.NODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create<AuthState>((set) => ({
  authUser: {} as AuthUser,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [] as AuthUser[],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data: SignUpData) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      // Tipado adecuado para el error en el bloque catch
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Login failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (data: Partial<AuthUser>) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Profile update failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
