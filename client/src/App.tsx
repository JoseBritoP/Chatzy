import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  HomePage,
  ProfilePage,
  SettingsPage,
  SignInPage,
  SignUpPage,
} from "./pages";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { Loader } from "lucide-react";

export default function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center gap-x-5 h-screen">
        <Loader className="size-10 animate-spin" />
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/signup'/>} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to='/'/>} />
        <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to='/'/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to='/signup'/>} />
      </Routes>
    </div>
  );
}
