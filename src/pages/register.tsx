import { FaKey } from "react-icons/fa";
import Header from "../components/header";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import Logo from "../assets/Logo.svg";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmP, setConfirmP] = useState("");

  async function handleRegister() {
    if (email.includes("@") && email.includes(".com")) {
      if (password === confirmP && password.length > 0) {
        await fetch("http://localhost:3000/registerUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        });
        window.location.href = "/";
      } else {
        alert("As senhas não são semelhantes.");
      }
    } else {
      alert("Email inserido de forma inválida.");
    }
  }

  return (
    <div className="bg-gray-200">
      <Header />
      <div className="flex">
        <img
          className="mt-10 hidden md:block lg:w-[550px] mx-10 md:w-[350px]"
          src={Logo}
        />
        <div className="bg-gray-200 w-full m-6 p-11 rounded-2xl drop-shadow-md">
          <h2 className="font-medium text-gray-700">Bem-Vindo</h2>
          <h1 className="font-medium text-3xl text-purple-400">BarberShop</h1>
          <div className="flex flex-col space-y-7 mt-4">
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Nome"
                required
              />
              <HiIdentification className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Email"
                required
              />
              <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Telefone"
                required
              />
              <MdOutlinePhoneAndroid className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Senha"
                required
              />
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative bg-gray-300 rounded drop-shadow-md">
              <input
                onChange={(e) => setConfirmP(e.target.value)}
                type="password"
                className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                placeholder="Confirmar Senha"
                required
              />
              <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button
              onClick={handleRegister}
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
