export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white p-2 rounded-lg shadow flex items-center">
      <div className="mr-4 bg-blue-100 p-2 rounded-full text-xs">{icon}</div>
      <div>
        <h3 className="text-xs font-medium text-gray-500">{title}</h3>
        <p className="text-s font-bold">{value}</p>
      </div>
    </div>
  );
}
