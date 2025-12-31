import { Link } from "react-router";

const ActionCard = ({ title, desc, link }) => {
  return (
    <Link
      to={link}
      className="bg-base-100 shadow rounded-xl p-6 hover:shadow-lg transition"
    >
      <h3 className="text-xl font-bold mb-1">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </Link>
  );
};

export default ActionCard;
