import { CgProfile } from "react-icons/cg";

export default function Clients() {
  return (
    <>
      <div className="sm:border-r-2 border-purple-400 p-10 sm:m-6 flex flex-col items-center scale-75 max-h-[300px] max-w-[300px] space-y-3 sm:scale-100">
        <CgProfile style={{ color: "oklch(0.714 0.203 305.504)" }} size={70} />
        <a className="text-center text-gray-600">
          Adorei o atendimento! O corte ficou impecável e o ambiente é super
          acolhedor. Com certeza voltarei mais vezes!
        </a>
        <a className="text-3xl font-medium text-gray-600">Pedro</a>
      </div>
      <div className="p-10 sm:m-6 flex flex-col items-center scale-75 max-h-[300px] max-w-[300px] space-y-3 sm:scale-100">
        <CgProfile style={{ color: "oklch(0.714 0.203 305.504)" }} size={70} />
        <a className="text-center text-gray-600">
          Profissionais incríveis! Meu cabelo nunca esteve tão bem cuidado.
          Recomendo de olhos fechados!
        </a>
        <a className="text-3xl font-medium text-gray-600">Murilo</a>
      </div>
      <div className="sm:border-l-2 border-purple-400 p-10 sm:m-6 flex flex-col items-center scale-75 max-h-[300px] max-w-[300px] space-y-3 sm:scale-100">
        <CgProfile style={{ color: "oklch(0.714 0.203 305.504)" }} size={70} />
        <a className="text-center text-gray-600">
          Excelente serviço! Fui muito bem atendido e saí com o cabelo do
          jeitinho que queria. Nota 10!
        </a>
        <a className="text-3xl font-medium text-gray-600">Lucas</a>
      </div>
    </>
  );
}
