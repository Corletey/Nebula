import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Divider, Menu } from 'antd';
import LandingPage from './pages/LandingPage';
import StudentDashboard from './pages/StudentDashboard';
import ProjectPortal from './pages/ProjectPortal';
import AdminPanel from './pages/AdminPanel';
import UnlockHint from './pages/UnlockHint';
import ConfigurationPage from './pages/Configuration';

// ant icons
import { DashboardTwoTone, UnlockTwoTone, SettingTwoTone } from '@ant-design/icons';

const App = () => {
  return (
    <Router>
      <div className="menu-container">
        {/* Navigation with Menu */}
        <Menu mode="horizontal" className="menu">
        <Link to="/"><span className="menu-logo" role="img" aria-label="Nebula Logo" style={{color:'grey'}}>🚀 Nebula - dock</span></Link>
          <div className="menu-items">
            
          <Menu.Item key="config">
              <Link to="/config"><SettingTwoTone/> Configurations</Link>
            </Menu.Item>
            <Menu.Item key="student-dashboard" >
              <Link to="/student-dashboard">
                <DashboardTwoTone/> Student Dashboard</Link>
            </Menu.Item>
            {/* <Menu.Item key="project-portal">
              <Link to="/project-portal">Project Portal</Link>
            </Menu.Item>
            <Menu.Item key="admin-panel">
              <Link to="/admin-panel">Admin Panel</Link>
            </Menu.Item> */}
            <Menu.Item key="divider">
              <Divider type="vertical" />
            </Menu.Item>
            <Menu.Item key="unlock-hint" style={{color:'grey'}}>
              <Link to="/unlock-hint"><UnlockTwoTone twoToneColor="#eb2f96"/> Unlock A Hint</Link>
            </Menu.Item>
          </div>
        </Menu>
      </div>

        {/* Route configuration */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/project-portal" element={<ProjectPortal />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/unlock-hint" element={<UnlockHint />} />
          <Route path="/config" element={<ConfigurationPage />} />
          {/* Add more routes as needed */}
        </Routes>
    </Router>
  );
};

export default App;
