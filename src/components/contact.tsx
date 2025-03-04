import { FaRegClock } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoMdPin } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";

export default function Contact() {
  return (
    <div className="md:flex md:scale-100 scale-90 grid grid-cols-2 justify-center lg:mx-20 mt-10 text-white">
      <div className="flex m-9 flex-col items-center space-y-3.5 max-w-56">
        <IoMdPin size={50} style={{ color: "oklch(0.714 0.203 305.504)" }} />
        <h1 className="font-medium text-gray-700">Endereco</h1>
        <h1 className="text-gray-600 text-center">
          Avenida Alameda das Travessas, nº 111, apto. 2222 - Bairro dos Barris.
          CEP: 40000-000
        </h1>
      </div>
      <div className="flex m-9 flex-col items-center space-y-3.5 max-w-56">
        <MdOutlineEmail
          size={50}
          style={{ color: "oklch(0.714 0.203 305.504)" }}
        />
        <h1 className="font-medium text-gray-700">Email</h1>
        <h1 className="text-gray-600 text-center">kaua@teste.com</h1>
      </div>
      <div className="flex m-9 flex-col items-center space-y-3.5 max-w-56">
        <FiPhone size={50} style={{ color: "oklch(0.714 0.203 305.504)" }} />
        <h1 className="font-medium text-gray-700">Telefone</h1>
        <h1 className="text-gray-600 text-center">(11)90000-0000</h1>
      </div>
      <div className="flex m-9 flex-col items-center space-y-3.5 max-w-56">
        <FaRegClock size={50} style={{ color: "oklch(0.714 0.203 305.504)" }} />
        <h1 className="font-medium text-gray-700">Endereco</h1>
        <h1 className="text-gray-600 text-center">
          Mon - Fri: 10am - 6pm Sat - Sun: 10am - 6pm
        </h1>
      </div>
    </div>
  );
}
