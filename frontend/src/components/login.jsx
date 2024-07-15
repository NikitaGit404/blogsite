import React from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useGlobalStore } from "../zustand/store";

const Login = () => {
  const [openModal, setOpenModal] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useGlobalStore((state) => state);

  function onCloseModal() {
    setOpenModal(false);
    setUser("");
    setPassword("");
  }

  const handleLogin = async () => {
    const res = await fetch(process.env.REACT_APP_BASE_API_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    });

    if (res.status === 200) {
      setIsLoggedIn(true);
      sessionStorage.setItem("user", user);
      alert("Login successful");
    } else if (res.status === 201) {
      setIsLoggedIn(true);
      sessionStorage.setItem("user", user);
      alert("Sign up successful");
    } else if (res.status === 401) {
      setIsLoggedIn(false);
      sessionStorage.setItem("user", "");
      alert("Incorrect Password");
    } else {
      setIsLoggedIn(false);
      sessionStorage.setItem("user", "");
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.setItem("user", "");
    alert("Logged out");
  };

  return (
    <>
      {!isLoggedIn ? (
        <Button onClick={() => setOpenModal(true)}>Log In</Button>
      ) : (
        <Button onClick={() => handleLogout()}>Log Out</Button>
      )}

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to BlogSite
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="user" value="Your User Name" />
              </div>
              <TextInput
                id="user"
                placeholder="John Doe"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                type="password"
                required
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setUser("");
                  handleLogin();
                }}
              >
                Log in / Sign up
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
