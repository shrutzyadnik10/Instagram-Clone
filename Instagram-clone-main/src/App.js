import Header from "../src/components/Header";
import Login from "./components/Login";
import FontStyle from "../src/font/FontStyle";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { userContext } from "./Context/UserContext";
import Admin from "./components/Admin";
import UserProfile from "./components/UserProfile";
function App() {
  const initialState = {
    phone_number: "",
    name: "",
    username: "",
    password: "",
    profile_image: "",
    followers: [],
    following: [],
    id: null,
  };
  const [data, setData] = useState(initialState);
  return (
    <>
      <FontStyle />
      <userContext.Provider value={{ ...data }}>
        <Routes>
          <Route path="/" element={<Login setData={setData} data={data} />} />
          <Route
            path="/SignUp"
            element={<SignUp setData={setData} data={data} />}
          />
          <Route path="/Home" element={<Header />} />
          <Route path="/Profile" element={<UserProfile/>} />
          <Route path="/Admin" element={<Admin/>} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
