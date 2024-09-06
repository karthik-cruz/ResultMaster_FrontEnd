import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store, { persistor } from './redux/store'; // Import persistor here
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


// Pages (Components) -----------------------------------------------------------------
import Layout from './layout/layout';
import Login from './pages/login/login';
import ForgotPassword from './pages/forgotPassword/forgotPassword';
import HomeIndex from './pages/home';
import DashboardIndex from './pages/home/dashboard/index';
import Class from './pages/home/students/students';
import Settings from "./pages/home/Settings/settings"
import AttendanceMarks from './pages/home/dashboard/attendanceMarks';
import ProjectReviewMarks from './pages/home/dashboard/projectReviewMarks';
import AssessmentMarks from './pages/home/dashboard/assessmentMarks';
import ProjectSubmissionMarks from './pages/home/dashboard/projectSubmissionMarks';
import LinkedInPostMarks from './pages/home/dashboard/linkedInPostMarks';
import AddStudents from './pages/home/addStudents/addStudents';
import UploadMarks from './pages/home/uploadMarks/uploadMarks';
import ProtectedRoute from './components/protectedRoute/protectedRoute';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Redirect from root to /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Layout Routes */}
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />

              {/* HomeIndex as the layout for /sideTabs routes */}
              <Route path="/home" element={<ProtectedRoute element={<HomeIndex />} />}>
                {/* Redirect from dashboard and nav tabs */}
                <Route path="dashboard" element={<ProtectedRoute element={<DashboardIndex />} />}>
                  <Route index element={<Navigate to="attendance-marks" />} />
                  <Route path="attendance-marks" element={<ProtectedRoute element={<AttendanceMarks />} />} />
                  <Route path="project-review-marks" element={<ProtectedRoute element={<ProjectReviewMarks />} />} />
                  <Route path="assessment-marks" element={<ProtectedRoute element={<AssessmentMarks />} />} />
                  <Route path="project-submission-marks" element={<ProtectedRoute element={<ProjectSubmissionMarks />} />} />
                  <Route path="linkedIn-post-marks" element={<ProtectedRoute element={<LinkedInPostMarks />} />} />
                </Route>
                <Route path="students" element={<ProtectedRoute element={<Class />} />} />
                <Route path="settings" element={<ProtectedRoute element={<Settings />} />} />
                <Route path="add-students" element={<ProtectedRoute element={<AddStudents />} />} />
                <Route path="upload-marks" element={<ProtectedRoute element={<UploadMarks />} />} />
              </Route>
            </Route>
          </Routes>

          {/* Toast component */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            pauseOnHover={false}
          />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
