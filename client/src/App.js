/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
// Redux
import { useDispatch } from "react-redux";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/routing/PrivateRoute";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";

const App = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/create-profile" element={<CreateProfile />} />
          <Route exact path="/edit-profile" element={<EditProfile />} />
          <Route exact path="/add-experience" element={<AddExperience />} />
          <Route exact path="/add-education" element={<AddEducation />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};
export default App;
