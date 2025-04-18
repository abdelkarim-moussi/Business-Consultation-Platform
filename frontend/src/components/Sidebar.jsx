export default function Sidebar({active}) {
  const menuItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "Consultations", icon: "💬" },
    { name: "Blogs", icon: "📝" },
    { name: "Create New Blog", icon: "➕" },
    { name: "Payment", icon: "💳" },
    { name: "Messages", icon: "✉️" },
    { name: "Help", icon: "❓" },
  ];

  return (
    <aside className="w-64 bg-[#19485F] shadow-sm p-4">
      <h2 className="text-2xl font-bold text-white mb-8">
        <span className="text-[#D9E0A4]">Bus</span>Consult
      </h2>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`w-full text-left text-white px-4 py-2 rounded-lg hover:bg-[#D9E0A4] ${
              item.name === active ? "bg-[#D9E0A4] font-semibold" : ""
            }`}
          >
            <span className="mr-2">{item.icon}</span> {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
