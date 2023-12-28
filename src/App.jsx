import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import './styles.scss'
import Tasks from './components/Tasks';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import CreateTask from "./components/CreateTask";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token
        }),
      }).then(async (res) => {
        const userData = await res.json()
        setLoggedIn(res.ok)
        setLoggedInUser(userData.userName)
      })
    }
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/createTask" element={<CreateTask loggedIn={loggedIn} setLoggedIn={setLoggedIn} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />} />
        <Route path="/logIn" element={<LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />} />
        <Route path="/SignUp" element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/" element={<Tasks loggedIn={loggedIn} setLoggedIn={setLoggedIn} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} />} />
      </Routes>
    </Router>
  );
}