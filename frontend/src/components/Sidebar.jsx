import { Link } from "react-router-dom";
import dash from "../assets/images/dashboard-1.png";
import articles from "../assets/images/articles.png";
import messages from "../assets/images/messages.png";
import plus from "../assets/images/plus.png";
import payment from "../assets/images/payment.png";
import consultation from "../assets/images/consultation.png";

export default function Sidebar({ active }) {
  const menuItems = [
    { name: "Dashboard", icon: dash, link: "consultantDash" },
    { name: "Consultations", icon: consultation },
    { name: "Articles", icon: articles, link: "consultantArticles" },
    { name: "Create Article", icon: plus, link: "createarticle" },
    { name: "Payment", icon: payment },
    { name: "Messages", icon: messages },
  ];

  return (
    <aside className="w-64 bg-[#4F46E5] shadow-sm p-4 h-[100vh] sticky top-0">
      <Link to="/">
        <h2 className="text-2xl font-bold text-white mb-8 capitalize">
          <span className="text-[#EEF2FF]">Buz</span>Consult
        </h2>
      </Link>
      <nav className="space-y-4 flex flex-col">
        {menuItems.map((item) => (
          <Link
            to={"../" + item.link}
            key={item.name}
            className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#4338CA] hover:text-[#EEF2FF] flex items-center gap-2 ${
              item.link === active
                ? "bg-[#4338CA] text-[#EEF2FF]"
                : "text-white"
            }`}
          >
            <img src={item.icon} alt="icon" className="w-5 h-5" /> {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
