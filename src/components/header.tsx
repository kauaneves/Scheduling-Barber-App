import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import Logo from "../assets/Logo.svg";

interface VerifyProps {
  loggedIn: boolean;
  message: string;
  user: {
    email: string;
    isAdm: boolean;
    name: string;
    phone: string;
    user_id: number;
  };
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stateVerify, setStateVerify] = useState(false || true);
  const [isAdm, setIsAdm] = useState(false);
  const navigate = useNavigate();

  function handleButton() {
    if (isAdm) {
      navigate("/portal");
    } else {
      navigate("/scheduling");
    }
  }

  async function handleLogout() {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }

  useEffect(() => {
    if (window.location.pathname === "/scheduling") {
    } else {
      async function verifyState() {
        const response = await fetch("http://localhost:3000/verifyToken", {
          credentials: "include",
        });
        const data: VerifyProps = await response.json();
        setStateVerify(data.loggedIn);
        if (data.user) {
          setIsAdm(data.user.isAdm);
        }
      }
      verifyState();
    }
  }, []);

  return (
    <nav className="flex justify-between items-center sm:p-4 px-1 bg-gray-200 drop-shadow-2xl relative z-10">
      <img
        className="hidden sm:block w-24 cursor-pointer"
        style={{ color: "oklch(0.714 0.203 305.504)" }}
        src={Logo}
        onClick={() => navigate("/")}
      />
      <ul className="flex justify-center sm:scale-100 scale-90">
        <li className="m-4 hover:text-gray-500 content-center font-medium text-gray-900 transition-all">
          <Link
            className="cursor-pointer"
            smooth={true}
            duration={500}
            to="home"
            onClick={() => navigate("/")}
          >
            Home
          </Link>
        </li>
        <li className="m-4 hover:text-gray-500 content-center font-medium text-gray-900 transition">
          <Link
            className="cursor-pointer"
            smooth={true}
            duration={500}
            to="services"
            onClick={() => navigate("/")}
          >
            Serviços
          </Link>
        </li>
        <li
          onClick={handleButton}
          className="m-4 hover:text-gray-500 content-center font-medium text-gray-900 transition cursor-pointer"
        >
          Agendamento
        </li>
        <li className="hidden md:block m-4 hover:text-gray-500 content-center font-medium text-gray-900 transition cursor-pointer">
          <Link
            className="cursor-pointer"
            smooth={true}
            duration={1000}
            to="contact"
            onClick={() => navigate("/")}
          >
            Contato
          </Link>
        </li>
      </ul>
      <>
        {!stateVerify ? (
          <div className="space-x-2 sm:scale-100 scale-75 hidden sm:block">
            <button
              onClick={() => navigate("/login")}
              className="p-2 border-purple-400 border-2 font-medium text-gray-900 cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="p-2 border-purple-400 border-2 font-medium text-gray-900 cursor-pointer"
            >
              Registrar-se
            </button>
          </div>
        ) : (
          <div className="space-x-2 sm:scale-100 scale-75 hidden sm:block">
            <button
              onClick={handleLogout}
              className="p-2 border-purple-400 border-2 font-medium text-gray-900 cursor-pointer"
            >
              Logout
            </button>
          </div>
        )}
      </>
      {!stateVerify ? (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white text-3xl sm:hidden"
        >
          {menuOpen ? (
            <BiX
              style={{ color: "oklch(0.21 0.034 264.665)" }}
              className="cursor-pointer"
            />
          ) : (
            <BiMenu
              style={{ color: "oklch(0.21 0.034 264.665)" }}
              className="cursor-pointer"
            />
          )}
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="p-2 border-purple-400 border-2 font-medium text-gray-900 cursor-pointer sm:hidden"
        >
          Logout
        </button>
      )}
      {menuOpen && (
        <ul className="flex flex-col space-y-2 mt-4 rounded sm:hidden absolute top-[60px] left-0 w-full bg-gray-800 z-50 p-4">
          <li>
            <a
              href="login"
              className="block text-white p-2 hover:bg-gray-600 rounded"
            >
              Login
            </a>
          </li>
          <li>
            <a
              href="register"
              className="block text-white p-2 hover:bg-gray-600 rounded"
            >
              Registrar-se
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
