const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-base-100 shadow rounded-xl p-4 flex items-center gap-4">
      <div className={`text-2xl p-4 rounded-full text-secondary ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
