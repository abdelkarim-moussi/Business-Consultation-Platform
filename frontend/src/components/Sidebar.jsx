import { Link } from "react-router-dom";

export default function Sidebar({ active }) {
  const menuItems = [
    { name: "ConsultantDash", icon: "📊", link: "consultantDash" },
    { name: "Consultations", icon: "💬" },
    { name: "Blogs", icon: "📝" },
    { name: "Create Article", icon: "➕", link: "createarticle" },
    { name: "Payment", icon: "💳" },
    { name: "Messages", icon: "✉️" },
    { name: "Help", icon: "❓" },
  ];

  return (
    <aside className="w-64 bg-[#19485F] shadow-sm p-4 h-[100vh] sticky top-0">
      <h2 className="text-2xl font-bold text-white mb-8">
        <span className="text-[#D9E0A4]">Bus</span>Consult
      </h2>
      <nav className="space-y-4 flex flex-col">
        {menuItems.map((item) => (
          <Link
            to={"../" + item.link}
            key={item.name}
            className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#D9E0A4] ${
              item.link === active ? "bg-[#D9E0A4]" : "text-white"
            }`}
          >
            <span className="mr-2">{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
