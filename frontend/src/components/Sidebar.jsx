import { Link } from "react-router-dom";

export default function Sidebar({active}) {
  const menuItems = [
    { name: "dashboard", icon: "📊" },
    { name: "Consultations", icon: "💬" },
    { name: "Blogs", icon: "📝" },
    { name: "createarticle", icon: "➕" },
    { name: "Payment", icon: "💳" },
    { name: "Messages", icon: "✉️" },
    { name: "Help", icon: "❓" },
  ];

  return (
    <aside className="w-64 bg-[#19485F] shadow-sm p-4">
      <h2 className="text-2xl font-bold text-white mb-8">
        <span className="text-[#D9E0A4]">Bus</span>Consult
      </h2>
      <nav className="space-y-4 flex flex-col">
        {menuItems.map((item) => (
          <Link to={'../'+item.name}
            key={item.name}
            className={`w-full text-left text-white px-4 py-2 rounded-lg hover:bg-[#D9E0A4] ${
              item.name === active ? "bg-[#D9E0A4]" : ""
            }`}
          >
            <span className="mr-2">{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
