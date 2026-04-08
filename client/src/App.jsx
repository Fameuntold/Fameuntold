import React from 'react'
import Navbar from './component/Navbar'
import { Routes, Route, useLocation } from "react-router-dom";

import Home from './pages/Home';
import OurStory from './pages/OurStory';
import MissionVision from './pages/MissionVision';
import Leadership from './pages/Leadership';
import AimsObjectives from './pages/AimsObjectives';
import MentorshipDiscipleship from './pages/MentorshipDiscipleship';
import WorshipSpiritualFormation from './pages/WorshipSpiritualFormation';
import LeadershipCapacity from './pages/LeadershipCapacity';
import CounsellingSupportPage from './pages/CounsellingSupportPage';
import TalentDevelopmentPage from './pages/TalentDevelopmentPage';
import Workshops from './pages/Workshops';
import MentorshipPage from './pages/MentorshipPage';
import Footer from './component/Footer';
import VolunteerPage from './pages/VolunteerPage';
import EventsPage from './pages/EventsPage';
import MediaPage from './pages/MediaPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import DonatePage from './pages/DonatePage';
import RegisterPage from './pages/RegisterPage';
import FAQPage from './pages/FAQPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './pages/routes/AdminRoutes';
import LoginPage from "./pages/LoginPage";
import AccountPage from './pages/AccountPage';


const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div>
      {/* ✅ Show Navbar only if NOT admin */}
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/mission" element={<MissionVision />} />
        <Route path="/leader" element={<Leadership />} />
        <Route path="/objectives" element={<AimsObjectives />} />
        <Route path="/mentorship" element={<MentorshipDiscipleship />} />
        <Route path="/worship" element={<WorshipSpiritualFormation />} />
        <Route path="/leadershipcapacity" element={<LeadershipCapacity />} />
        <Route path="/counselling" element={<CounsellingSupportPage />} />
        <Route path="/talent" element={<TalentDevelopmentPage />} />
        <Route path="/workshop" element={<Workshops />} />
        <Route path="/mentorpage" element={<MentorshipPage />} />
        <Route path="/volunteer-page" element={<VolunteerPage />} />
        <Route path="/event-page" element={<EventsPage />} />
        <Route path="/media-page" element={<MediaPage />} />
        <Route path="/get-involved" element={<GetInvolvedPage />} />
        <Route path="/donation" element={<DonatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/faq-page" element={<FAQPage />} />
        <Route path="/career-page" element={<CareersPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/blog-page" element={<BlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account-page" element={<AccountPage />} />

        {/* 🔐 Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      {/* ✅ Show Footer only if NOT admin */}
      {!isAdminPage && <Footer />}
    </div>
  )
}

export default App;