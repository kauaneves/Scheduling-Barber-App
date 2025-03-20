import Header from "../components/header";
import { MdCalendarMonth } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";
import { IoMdPeople } from "react-icons/io";
import { ImScissors } from "react-icons/im";
import { TbCalendarClock } from "react-icons/tb";
import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

interface VerifyProps {
  loggedIn: boolean;
  user: {
    name: string;
    user_id: number;
    isAdm: boolean;
    email: string;
    phone: string;
  };
}

interface ServiceProps {
  id: number;
  name: string;
  price: string;
  duration: number;
}

interface EmployeesProps {
  id: number;
  name: string;
  phone: string;
}

interface Appointment {
  id: number;
  user_id: number;
  service_id: number;
  employee_id: number;
  appointment_time: string;
}

export default function Scheduling() {
  const [stateVerify, setStateVerify] = useState(true);
  const [data, setData] = useState({} as VerifyProps);
  const [employees, setEmployees] = useState([] as EmployeesProps[]);
  const [selectedEmployee, setSelectedEmployee] = useState(0);
  const [date, setDate] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setselectedHour] = useState("");
  const [employeeServiceData, setemployeeServiceData] = useState(
    [] as ServiceProps[]
  );
  const [selectedService, setSelectedService] = useState("");
  const [hours, setHours] = useState<string[]>([]);

  useEffect(() => {
    async function Appointment() {
      if (employeeServiceData.length === 0) {
        return;
      }
      const service: ServiceProps[] = employeeServiceData.filter(
        (item: { name: string }) => item.name === selectedService
      );
      const [date, month] = selectedDate.split("/");
      const inicio = new Date(`2025-${month}-${date}T08:00:00`);
      const fim = new Date(`2025-${month}-${date}T18:00:00`);

      const response = await fetch("http://localhost:3000/getAppointments");
      const agendados = await response.json().then((data) =>
        data.map((hours: Appointment) => {
          return {
            start: new Date(hours.appointment_time),
            duration: service[0].duration,
          };
        })
      );

      function gerarHorariosDisponiveis(inicio: Date, fim: Date) {
        const horarios = [];
        const horaAtual = new Date(inicio);

        while (horaAtual <= fim) {
          horarios.push(new Date(horaAtual));
          horaAtual.setMinutes(horaAtual.getMinutes() + 10);
        }
        return horarios;
      }

      function filtrarHorariosDisponiveis(
        horarios: Date[],
        agendados: { start: Date; duration: number }[]
      ) {
        return horarios
          .filter((horario) => {
            return !agendados.some((agendado) => {
              const agendamentoFim = new Date(agendado.start);
              agendamentoFim.setMinutes(
                agendamentoFim.getMinutes() + agendado.duration
              );
              return horario >= agendado.start && horario < agendamentoFim;
            });
          })
          .map((hour) => {
            const horas = String(hour.getHours()).padStart(2, "0");
            const minutos = String(hour.getMinutes()).padStart(2, "0");
            return `${horas}:${minutos}`;
          });
      }

      const horarios = gerarHorariosDisponiveis(inicio, fim);
      const horariosDisp = filtrarHorariosDisponiveis(horarios, agendados);
      setHours(horariosDisp);
    }
    Appointment();
  }, [selectedDate]);

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

    function getDates() {
      const dates = [];
      const date1 = new Date();
      date1.setDate(date1.getDate() + 1);
      const date2 = new Date();
      date2.setDate(date2.getDate() + 2);
      const date3 = new Date();
      date3.setDate(date3.getDate() + 3);
      dates.push(
        new Date().toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
        }),
        date1.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        date2.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        date3.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })
      );
      setDate(dates);
    }

    verifyState();
    getEmployees();
    getDates();
  }, []);

  async function handleSchedule() {
    if (
      data.user.user_id &&
      selectedService &&
      selectedEmployee &&
      selectedHour
    ) {
      const [day, month] = selectedDate.split("/");
      const appointment_time = `2025-${month}-${day}T${selectedHour}:00`;
      await fetch("http://localhost:3000/registerAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: data.user.user_id,
          service_id: employeeServiceData.filter(
            (item) => item.name === selectedService
          )[0].id,
          employee_id: selectedEmployee,
          appointment_time,
        }),
      });
      toast.success("Agendamento Realizado com sucesso");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("Preencha todos os campos.");
    }
  }

  return (
    <>
      {!stateVerify ? (
        <div className="bg-gray-200">
          <Header />
          <div className="flex flex-col">
            <ToastContainer autoClose={1500} />
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
                        <option value={0} disabled hidden>
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
                        <option value={""} disabled hidden>
                          Selecione o(s) serviços
                        </option>
                        {employeeServiceData.map((info: ServiceProps) => {
                          return (
                            <option key={info.id} value={info.name}>
                              {info.name + " R$" + info.price}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  {selectedService ? (
                    <div className="flex space-x-3">
                      {date.map((date) => {
                        return (
                          <button
                            key={date}
                            value={date}
                            onClick={() => setSelectedDate(date)}
                            className={`bg-gray-300 text-gray-500 flex flex-col justify-center items-center p-2 rounded-lg cursor-pointer transition-colors border-2 ${
                              selectedDate === date
                                ? "border-purple-400"
                                : "border-gray-300"
                            } hover:border-purple-400`}
                          >
                            <MdCalendarMonth
                              size={30}
                              className="text-gray-500"
                            />
                            <h1>{date}</h1>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    ""
                  )}
                  {selectedDate ? (
                    <div className="flex items-center space-x-2">
                      <FaArrowDown
                        size={30}
                        className="text-gray-500 animate-bounce"
                      />
                      <h1 className="text-gray-500">Horários Abaixo</h1>
                    </div>
                  ) : (
                    ""
                  )}
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
                      {selectedDate && selectedHour
                        ? selectedDate + " ás " + selectedHour
                        : "Data e Horário"}
                      <TbCalendarClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    </h1>
                  </div>
                  <button
                    onClick={handleSchedule}
                    className="bg-purple-400 rounded p-5 mt-3 text-gray-200 font-medium cursor-pointer hover:bg-purple-500 transition-colors"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            </div>
            {selectedDate ? (
              <div className="bg-gray-200 m-6 sm:p-11 p-5 rounded-2xl drop-shadow-md">
                <h2 className="font-medium text-gray-700">Confira os</h2>
                <h1 className="font-medium text-3xl text-purple-400">
                  Horários
                </h1>
                <h2 className="font-medium text-gray-700 mt-4">
                  {selectedDate}
                </h2>
                <div className="flex flex-wrap space-x-2 mt-4">
                  {hours.map((hour) => {
                    return (
                      <div
                        key={hour}
                        className="bg-gray-200 mb-2 rounded-2xl space-y-3 drop-shadow-md p-4 flex flex-col items-center"
                      >
                        <h1 className="text-2xl text-gray-900">{hour}</h1>
                        <button
                          value={hour}
                          onClick={(e) =>
                            setselectedHour(e.currentTarget.value)
                          }
                          className={`bg-gray-300 border-2 rounded-2xl drop-shadow-md p-2 transition-all text-gray-900 hover:bg-gray-400 cursor-pointer ${
                            hour === selectedHour
                              ? "border-purple-400"
                              : "border-gray-300"
                          }`}
                        >
                          Selecionar
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div> Verificando Autenticação... </div>
      )}
    </>
  );
}
