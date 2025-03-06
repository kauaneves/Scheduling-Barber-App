import Header from "../components/header";
import { MdCalendarMonth } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import { IoMdPeople } from "react-icons/io";
import { ImScissors } from "react-icons/im";
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

interface EmployeesProps {
  id: number;
  name: string;
  phone: string;
}

interface InfoProps {
  id: number;
  name: string;
  price: number;
}

export default function Scheduling() {
  const [stateVerify, setStateVerify] = useState(true);
  const [data, setData] = useState({} as VerifyProps);
  const [employees, setEmployees] = useState([] as EmployeesProps[]);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const [employeeServiceData, setemployeeServiceData] = useState([]);
  const [selectedService, setSelectedService] = useState("");

  function formatDate(date: string) {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    async function getService() {
      const response = await fetch("http://localhost:3000/getServicesSpecify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: selectedEmployee }),
      });

      const data = await response.json();
      setemployeeServiceData(data);
    }

    getService();
  }, [selectedEmployee]);

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

    async function getEmployees() {
      const response = await fetch("http://localhost:3000/getEmployees");
      const data = await response.json();
      setEmployees(data);
    }

    verifyState();
    getEmployees();
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
                  <div className="relative">
                    <IoMdPeople className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <select
                      value={selectedEmployee}
                      onChange={(e) =>
                        setSelectedEmployee(Number(e.target.value))
                      }
                      className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none bg-gray-300 text-gray-500"
                    >
                      <option value={0} disabled selected hidden>
                        Selecione um Profissional
                      </option>
                      {employees.map((employee) => {
                        return (
                          <option key={employee.id} value={employee.id}>
                            {employee.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="relative bg-gray-300 rounded drop-shadow-md">
                  <div className="relative">
                    <ImScissors className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none bg-gray-300 text-gray-500"
                    >
                      <option value={""} disabled selected hidden>
                        Selecione o(s) serviços
                      </option>
                      {employeeServiceData.map((info: InfoProps) => {
                        return (
                          <option key={info.id} value={info.name}>
                            {info.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="relative bg-gray-300 rounded drop-shadow-md">
                  <input
                    type="date"
                    value={date || ""}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-lg w-full font-bold focus:outline-none text-gray-500"
                    placeholder="Data e Horário"
                  />
                  <MdCalendarMonth className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
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
                    {selectedEmployee
                      ? employees.find(
                          (employee) => employee.id === selectedEmployee
                        )?.name
                      : "Profissional"}
                    <IoMdPeople className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </h1>
                </div>
                <div className="relative">
                  <h1 className="pl-10 pr-4 py-2 rounded-lg w-full font-bold text-gray-500 focus:outline-none">
                    {selectedService === "" ? "Serviços" : selectedService}
                    <ImScissors className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  </h1>
                </div>
                <div className="relative">
                  <h1 className="pl-10 pr-4 py-2 rounded-lg w-full font-bold text-gray-500 focus:outline-none">
                    {date ? formatDate(date) : "Data e Horário"}
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
