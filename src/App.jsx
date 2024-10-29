import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import VenueCreatingPage from './Pages/VenueCreatingPage';
import VenuePage from './Pages/VenuePage';
import DashboardPage from './Pages/DashboardPage';
import SignUpPage from './Pages/SignUpPage';
import SignInPage from './Pages/SignInPage';
import PaymentSuccessPage from './Pages/PaymentSuccessPage';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import createStore from 'react-auth-kit/createStore';
import Venues from './Components/Dashboard/Venues';
import Profile from './Components/Dashboard/Profile';
import Bookings from './Components/Dashboard/Bookings';
import VenueSettings from './Components/Dashboard/VenueSettings';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as bootstrap from 'bootstrap'
import DashboardSummary from './Components/Dashboard/DashboardSummary';
import PaymentAccounts from './Components/Dashboard/PaymentAccounts';

const store = createStore({
  debug: false,
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
})

function App() {

  return (
    <AuthProvider
      store={store}
    >
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/venue/:id" element={<VenuePage />} />
            <Route path="/create-venue" element={<VenueCreatingPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />

            {/* <Route element={<AuthOutlet fallbackPath='/sign-in' />}>
              <Route index path="/dashboard" element={<DashboardPage/>} />
              <Route path="/venues" element={<Venues/>} />
            </Route> */}
            <Route element={<AuthOutlet fallbackPath='/sign-in' />} >
              <Route path="/dashboard/" element={<DashboardPage />}>
                <Route path="" element={<DashboardSummary />} />
                <Route path="venues/" element={<Venues />} />
                <Route path="venues/:id" element={<VenueSettings />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="venues" element={<Venues />} />
                <Route path="payment-accounts" element={<PaymentAccounts />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;