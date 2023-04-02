import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Error from "./components/Error";
import Profile from "./components/Profile";
import Books from "./components/Books";
import Publishers from "./components/Publishers";
import Members from "./components/Members";
import Book from "./components/Book";
import Member from "./components/Member";
import Issue from "./components/Issue";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SecureRoute from "./components/SecureRoute";
import "./styles.css";

const getUser = () => {
  const user = localStorage.getItem("USER");
  return user;
};

export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(getUser);
  return (
    <BrowserRouter>
      <UserContext.Provider value={[user, setUser]}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navbar />}>
            <Route element={<SecureRoute />}>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/books">
                <Route index element={<Books />} />
                <Route path=":id" element={<Book />} />
              </Route>
              <Route path="/publishers" element={<Publishers />} />
              <Route path="/members">
                <Route index element={<Members />} />
                <Route path=":id" element={<Member />} />
              </Route>
              <Route path="/issue" element={<Issue />} />
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
