import { useEffect, useState } from "react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import { FiFilter } from "react-icons/fi";

interface EmployeesProps {
  id: number;
  name: string;
  phone: string;
}

interface AppointmentsProps {
  appointment_id: number;
  user_name: string;
  service_name: string;
  employee_name: string;
  appointment_time: string;
  status: string;
}

interface UserProps {
  name: string;
  user_id: number;
  isAdm: boolean;
  email: string;
  phone: string;
}

export default function Portal() {
  const [user, setUser] = useState({} as UserProps);
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function VerifyState() {
      const response = await fetch("http://localhost:3000/verifyToken", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data.user);

      if (!data.loggedIn) {
        navigate("/login");
      } else if (data.user.isAdm === false) {
        navigate("/");
      }
    }

    async function GetAppointment() {
      const response = await fetch("http://localhost:3000/getAppointments");
      const data = await response.json();
      const newData = data.map((item: AppointmentsProps) => {
        item.appointment_time = new Date(
          item.appointment_time
        ).toLocaleString();
        return item;
      });
      setAppointments(newData);
    }

    async function GetEmployees() {
      const response = await fetch("http://localhost:3000/getEmployees");
      const data = await response.json();
      setEmployees(data);
    }
    VerifyState();
    GetAppointment();
    GetEmployees();
  }, []);

  function StatsMenu(id: number) {
    if (!menuIsOpen) {
      setMenuIsOpen(true);
      setSelectedService(id);
    } else {
      setMenuIsOpen(false);
      setSelectedService(0);
    }
  }

  async function handleCancelButton(id: number) {
    await fetch(`http://localhost:3000/deleteAppointments/${id}`, {
      method: "DELETE",
    }).then(() => {
      location.reload();
    });
    setMenuIsOpen(false);
  }

  async function handleServiceFinalished(id: number) {
    await fetch(`http://localhost:3000/deleteAppointments/${id}`, {
      method: "DELETE",
    }).then(() => {
      toast.success("Serviço Concluido.");
    });
    setTimeout(() => location.reload(), 1000);
  }

  return (
    <>
      {Object.keys(user).length > 0 && user.isAdm === true ? (
        <div>
          {menuIsOpen ? (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-gray-100 p-6 rounded-xl shadow-xl flex flex-col items-center space-y-3">
                <div className="flex items-center">
                  <IoIosWarning color={"oklch(0.21 0.034 264.665)"} size={30} />
                  <h1 className="text-xl text-gray-900 font-bold">
                    Confirmação de Cancelamento
                  </h1>
                </div>
                <div>
                  <p className="text-gray-900">
                    Você tem certeza de que deseja cancelar este serviço?
                  </p>
                  <p className="text-gray-500 text-xs">
                    Essa ação resultará na exclusão permanente do serviço.
                  </p>
                </div>
                <div className="space-x-3">
                  <button
                    onClick={() => handleCancelButton(selectedService)}
                    className="py-1 px-3 rounded-lg hover:bg-green-400 cursor-pointer transition-colors"
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => setMenuIsOpen(false)}
                    className="bg-red-300 py-1 px-3 rounded-lg hover:bg-red-400 cursor-pointer transition-colors"
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <Header />
          <div>
            <ToastContainer autoClose={1500} />
            <div className="bg-gray-200 m-6 sm:p-11 p-5 rounded-2xl drop-shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-medium text-gray-700">Confira os</h2>
                  <h1 className="font-medium text-3xl text-purple-400">
                    Horários
                  </h1>
                </div>
                <div className="flex items-center text-gray-500 transition-colors cursor-pointer hover:text-gray-900">
                  <FiFilter size={20} />
                  <h1>Filtrar</h1>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-wrap p-4 sm:space-x-4 space-x-2">
                  {appointments.map((data: AppointmentsProps) => {
                    return (
                      <div
                        key={data.appointment_id}
                        className="text-gray-900 bg-gray-300 p-3 rounded-md flex flex-col sm:mt-4 mt-2"
                      >
                        <div>
                          <h1 className="text-xs text-gray-500">nome:</h1>
                          <h1 className="text-base">{data.user_name}</h1>
                        </div>
                        <div>
                          <h1 className="text-xs text-gray-500">
                            Profissional:
                          </h1>
                          <h1 className="text-base">{data.employee_name}</h1>
                        </div>
                        <div>
                          <h1 className="text-xs text-gray-500">serviço:</h1>
                          <h1>{data.service_name}</h1>
                        </div>
                        <div>
                          <h1 className="text-xs text-gray-500">
                            data e horário:
                          </h1>
                          <h1>{data.appointment_time}</h1>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => StatsMenu(data.appointment_id)}
                            className="rounded-4xl px-2 font-medium mt-3 transition-colors cursor-pointer hover:bg-purple-400"
                          >
                            Cancelar Serviço
                          </button>
                          <button
                            onClick={() =>
                              handleServiceFinalished(data.appointment_id)
                            }
                            className="rounded-full px-2 font-medium mt-3 transition-colors cursor-pointer hover:bg-green-400"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => navigate("/scheduling")}
                  className="bg-purple-400 rounded p-5 mt-3 text-gray-200 font-medium cursor-pointer hover:bg-purple-500 transition-colors"
                >
                  Criar Agendamento
                </button>
              </div>
            </div>
            <div className="bg-gray-200 m-6 p-11 rounded-2xl drop-shadow-md">
              <h2 className="font-medium text-gray-700">Confira os</h2>
              <h1 className="font-medium text-3xl text-purple-400">
                Profissionais
              </h1>
              <div className="flex flex-col space-y-2 mt-4">
                <div className="flex flex-wrap p-4 space-x-2 space-y-2">
                  {employees.map((employee: EmployeesProps) => {
                    return (
                      <div
                        key={employee.id}
                        className="text-gray-900 bg-gray-300 p-3 rounded-md flex flex-col"
                      >
                        <div>
                          <h1 className="text-xs text-gray-500">nome:</h1>
                          <h1 className="text-base">{employee.name}</h1>
                        </div>
                        <div>
                          <h1 className="text-xs text-gray-500">telefone:</h1>
                          <h1>{employee.phone}</h1>
                        </div>
                        <button className="rounded-4xl px-2 font-medium mt-3 transition-colors cursor-pointer hover:bg-purple-400">
                          Editar
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button className="bg-purple-400 rounded p-5 mt-3 text-gray-200 font-medium cursor-pointer hover:bg-purple-500 transition-colors">
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Verificando Autenticação</div>
      )}
    </>
  );
}
