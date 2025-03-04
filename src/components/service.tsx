import { ImScissors } from "react-icons/im";

export default function Service({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="border-2 border-purple-400 p-10 sm:m-6 flex flex-col items-center scale-75 max-h-[337px] max-w-[300px] space-y-2 sm:scale-100">
      <ImScissors style={{ color: "oklch(0.714 0.203 305.504)" }} size={70} />
      <a className="text-3xl font-medium text-gray-700 text-nowrap">{name}</a>
      <a className="text-center text-gray-600">{description}</a>
    </div>
  );
}
