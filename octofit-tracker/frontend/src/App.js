import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navLinks = [
  { to: '/users',      label: 'Users',       icon: '👤' },
  { to: '/teams',      label: 'Teams',       icon: '🏅' },
  { to: '/activities', label: 'Activities',  icon: '🏃' },
  { to: '/workouts',   label: 'Workouts',    icon: '💪' },
  { to: '/leaderboard',label: 'Leaderboard', icon: '🏆' },
];

const quickCards = [
  { to: '/users',       label: 'Users',       icon: '👤', color: 'primary',   desc: 'Manage members'         },
  { to: '/teams',       label: 'Teams',       icon: '🏅', color: 'success',   desc: 'View all teams'         },
  { to: '/activities',  label: 'Activities',  icon: '🏃', color: 'info',      desc: 'Log your activities'    },
  { to: '/workouts',    label: 'Workouts',    icon: '💪', color: 'warning',   desc: 'Browse workout plans'   },
  { to: '/leaderboard', label: 'Leaderboard', icon: '🏆', color: 'danger',    desc: 'Check team standings'   },
];

function Home() {
  return (
    <>
      <div className="hero-section text-center">
        <h1 className="display-5 fw-bold mb-3">Welcome to OctoFit Tracker 🐙</h1>
        <p className="lead mb-4">
          Track fitness activities, compete with your team, and level up your workouts.
        </p>
        <Link className="btn btn-light btn-lg fw-semibold" to="/activities">
          Get Started
        </Link>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-3">
        {quickCards.map(({ to, label, icon, color, desc }) => (
          <div className="col" key={to}>
            <Link to={to} className="text-decoration-none">
              <div className={`card quick-card text-center h-100 border-${color}`}>
                <div className="card-body">
                  <div className="fs-1 mb-2">{icon}</div>
                  <h5 className={`card-title text-${color} fw-semibold mb-1`}>{label}</h5>
                  <p className="card-text text-muted small">{desc}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark octofit-nav shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <img
              src={`${process.env.PUBLIC_URL}/octofitapp-small.png`}
              alt="OctoFit logo"
              className="octofit-logo"
            />
            OctoFit Tracker
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {navLinks.map(({ to, label, icon }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      'nav-link px-3' + (isActive ? ' active fw-semibold' : '')
                    }
                    to={to}
                  >
                    {icon} {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="page-content container mt-4 mb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users"       element={<Users />} />
          <Route path="/teams"       element={<Teams />} />
          <Route path="/activities"  element={<Activities />} />
          <Route path="/workouts"    element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>

      <footer className="octofit-footer text-center py-3">
        &copy; {new Date().getFullYear()} OctoFit Tracker &mdash; Built with GitHub Copilot
      </footer>
    </div>
  );
}

export default App;
