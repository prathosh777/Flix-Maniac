import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/homepages/HomePage";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import DeveloperPage from "./pages/DeveloperPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import Navbar from "./components/Navbar";
import PersonPage from "./pages/PersonPage";

const App = () => {
  const { user, authCheck, isCheckingAuth } = useAuthStore();
  // console.log("Auth user is here", user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen ">
        <div className="flex justify-center items-center  bg-black h-full">
          <Loader className="animate-spin  text-red-600 size-10"></Loader>
        </div>{" "}
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/login"
          element={!user ? <LogInPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/history"
          element={user ? <SearchHistoryPage /> : <Navigate to={"/"} />}
        />
         <Route
          path="/person/:id"
          element={user ? <PersonPage /> : <Navigate to={"/"} />}
        />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/watch/" element={<NotFoundPage />} />

        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
