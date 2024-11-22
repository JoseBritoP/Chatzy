import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { HomePage, ProfilePage, SettingsPage, SignInPage, SignUpPage } from "./pages";

export default function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/signin" element={<SignInPage/>}/>
        <Route path="/settings" element={<SettingsPage/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
}
