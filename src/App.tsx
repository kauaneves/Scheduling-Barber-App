import Clients from "./components/clients";
import Header from "./components/header";
import Service from "./components/service";
import Contact from "./components/contact";
import Logo from "./assets/Logo.svg";
import { useQuery } from "@tanstack/react-query";

interface DataProps {
  id: number;
  name: string;
  description: string;
}

export default function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
  });

  async function fetchServices() {
    const response = await fetch("http://localhost:3000/getServices");
    if (response.ok) {
      return response.json();
    }
  }

  return (
    <div className="bg-gray-300">
      <Header />
      <div id="home" className="m-10 flex justify-center">
        <img width={700} src={Logo} />
      </div>
      <div id="services" className="bg-gray-200">
        <div className="flex flex-col items-center p-10">
          <h1 className="text-purple-400 text-2xl">Confira</h1>
          <h1 className="text-gray-900 text-5xl font-medium">Serviços</h1>
        </div>
        <div className="flex flex-wrap justify-center items-center lg:mx-20 mt-10 text-white">
          {isLoading ? (
            <h1>Carreagando...</h1>
          ) : (
            <>
              {data.map((service: DataProps) => {
                return (
                  <Service
                    key={service.id}
                    name={service.name}
                    description={service.description}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="bg-gray-300">
        <div className="flex flex-col items-center p-10">
          <h1 className="text-purple-400 text-2xl">O que as pessoas falam</h1>
          <h1 className="text-gray-900 text-5xl font-medium">Feedbacks</h1>
        </div>
        <div className="sm:flex flex flex-wrap justify-center lg:mx-20 mt-10 text-white">
          <Clients />
        </div>
      </div>
      <div id="contact" className="bg-gray-200">
        <div className="flex flex-col items-center p-10">
          <h1 className="text-purple-400 text-2xl">Informações</h1>
          <h1 className="text-gray-900 text-5xl font-medium">Contato</h1>
        </div>
        <Contact />
      </div>
    </div>
  );
}
