import { FaGoogle, FaKey } from "react-icons/fa";
import Header from "../components/header";
import { MdEmail } from "react-icons/md";
import Logo from "../assets/Logo.svg";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email.length && password.length != 0) {
      const response = await fetch("http://localhost:3000/getUser", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data: { message: string; status: boolean } = await response.json();
      if (data.status) {
        window.location.href = "/";
      } else {
        toast.error("Email ou Senha incorreto.");
      }
    } else {
      toast.error("Informações inseridas incorretamente");
    }
  }

  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex">
        <ToastContainer autoClose={1500} />
        <img
          className="mt-10 hidden md:block lg:w-[550px] mx-10 md:w-[350px]"
          src={Logo}
        />
        <div className="bg-gray-200 w-full m-6 p-11 rounded-2xl drop-shadow-md">
          <h2 className="font-medium text-gray-700">Bem-Vindo</h2>
          <h1 className="font-medium text-3xl text-purple-400">BarberShop</h1>
          <div className="flex flex-col space-y-7 mt-4">
            <button className="bg-gray-200 drop-shadow-lg rounded py-2 flex items-center justify-center cursor-pointer">
              <FaGoogle
                style={{ color: "oklch(0.714 0.203 305.504)" }}
                className="mr-2"
              />
              Google
            </button>
            <div className="flex items-center space-x-2">
              <div className="flex-grow  border-t border-gray-700"></div>
              <h1 className="text-gray-700">our</h1>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Email"
              />
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Senha"
              />
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              onClick={handleLogin}
              className="bg-purple-400 rounded p-5 mt-3 text-gray-200 font-medium cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
