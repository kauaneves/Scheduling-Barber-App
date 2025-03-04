import Header from "../components/header";
import { MdCalendarMonth } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import { IoMdPeople } from "react-icons/io";
import { ImScissors } from "react-icons/im";
import { FaClock } from "react-icons/fa6";
import { TbCalendarClock } from "react-icons/tb";
import { useEffect, useState } from "react";

interface VerifyProps {
  loggedIn: boolean;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function Scheduling() {
  const [stateVerify, setStateVerify] = useState(true);
  const [data, setData] = useState({} as VerifyProps);

  useEffect(() => {
    async function verifyState() {
      const response = await fetch("http://localhost:3000/verifyToken", {
        credentials: "include",
      });
      const data: VerifyProps = await response.json();
      if (!data.loggedIn) {
        window.location.href = "/login";
      } else {
        setStateVerify(false);
        setData(data);
      }
    }

    verifyState();
  }, []);

  return (
    <>
      {!stateVerify ? (
        <div className="bg-gray-200">
          <Header />
          <div className="flex md:flex-row flex-col">
            <div className="bg-gray-200 md:w-full m-6 p-11 rounded-2xl drop-shadow-md">
              <h2 className="font-medium text-gray-700">Realize seu</h2>
              <h1 className="font-medium text-3xl text-purple-400">
                Agendamento
              </h1>
              <div className="flex flex-col space-y-7 mt-4">
                <div className="relative bg-gray-300 rounded drop-shadow-md">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                    placeholder="Profissional"
                  />
                  <IoMdPeople className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="relative bg-gray-300 rounded drop-shadow-md">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                    placeholder="Serviço"
                  />
                  <ImScissors className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="relative bg-gray-300 rounded drop-shadow-md">
                  <input
                    type="date"
                    className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none text-gray-500"
                    placeholder="Data e Horário"
                  />
                  <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <div className="relative bg-gray-300 rounded drop-shadow-md">
                  <input
                    type="text"
                    className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none"
                    placeholder="Horário"
                  />
                  <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="bg-gray-200 md:w-full m-6 p-11 rounded-2xl drop-shadow-md">
              <h2 className="font-medium text-gray-700">Confira suas</h2>
              <h1 className="font-medium text-3xl text-purple-400">
                Informações
              </h1>
              <div className="flex flex-col space-y-2 mt-4">
                <div className="relative">
                  <h1 className="pl-10 pr-4 py-2 rounded-lg w-full font-bold text-gray-500 focus:outline-none">
                    {data.user.name}
                    <HiIdentification className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </h1>
                </div>
                <div className="relative">
                  <h1 className="pl-10 pr-4 py-2 rounded-lg w-full font-bold text-gray-500 focus:outline-none">
                    Profissional
                    <IoMdPeople className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </h1>
                </div>
                <div className="relative">
                  <h1 className="pl-10 pr-4 py-2 rounded-lg w-full font-bold text-gray-500 focus:outline-none">
                    Serviços
                    <ImScissors className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </h1>
                </div>
                <div className="relative">
                  <h1 className="pl-10 pr-4 py-2 rounded-lg w-full font-bold text-gray-500 focus:outline-none">
                    Data e Horário
                    <TbCalendarClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </h1>
                </div>
                <button className="bg-purple-400 rounded p-5 mt-3 text-gray-200 font-medium cursor-pointer hover:bg-purple-500 transition-colors">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div> Verificando Autenticação... </div>
      )}
    </>
  );
}
