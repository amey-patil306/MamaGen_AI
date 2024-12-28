import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { AuthProvider, useAuth } from './components/AuthContext';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import ExerciseRecommender from './pages/ExerciseRecommender';
import HRDashboard from './pages/HRDashboard';
import ResourceLibrary from './pages/ResourceLibrary';
import CommunicationHub from './pages/CommunicationHub';
import PregnancyDashboard from './pages/PregnancyDashboard';
import ErgonomicAdvice from './pages/ErgonomicAdvice';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      {isAuthenticated && <Navigation />}
      <div className="container mx-auto px-4 py-8">
        {isAuthenticated && (
          <header className="mb-8 text-center">
            <Activity className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-800">Pregnancy Wellness Hub</h1>
            <p className="text-xl text-gray-600 mt-2">Supporting healthy pregnancies in the workplace</p>
          </header>
        )}
        
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={
            <ProtectedRoute>
              <ExerciseRecommender />
            </ProtectedRoute>
          } />
          <Route path="/hr-dashboard" element={
            <ProtectedRoute>
              <HRDashboard />
            </ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute>
              <ResourceLibrary />
            </ProtectedRoute>
          } />
          <Route path="/communication" element={
            <ProtectedRoute>
              <CommunicationHub />
            </ProtectedRoute>
          } />
          <Route path="/ergonomics" element={
            <ProtectedRoute>
              <ErgonomicAdvice />
            </ProtectedRoute>
          } />
          <Route path="/pregnancyDashboard" element={
            <ProtectedRoute>
              <PregnancyDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;