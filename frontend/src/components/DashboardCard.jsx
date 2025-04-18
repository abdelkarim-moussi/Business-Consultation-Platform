export default function DashboardCard() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5">
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h2 className="text-2xl font-bold">DH 7.000</h2>
              <p className="text-green-500 text-sm">↑ 2.1% vs last week</p>
              <p className="text-xs text-gray-400">from 1–12 Dec, 2020</p>
            </div>
            <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50">
              View Report
            </button>
          </div>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            📊 Bar Chart Placeholder
          </div>
        </div>
  
        {/* Consultation Time Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Consultation Time</p>
              <p className="text-xs text-gray-400">From 1–6 Dec, 2020</p>
            </div>
            <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50">
              View Report
            </button>
          </div>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            🥧 Pie Chart Placeholder
          </div>
          <div className="mt-4 text-sm text-gray-600 space-y-1">
            <p>🔵 Afternoon - 40%</p>
            <p>🟢 Evening - 32%</p>
            <p>🔴 Morning - 28%</p>
          </div>
        </div>
  
        {/* Blogs & Customers */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Latest Blogs</h3>
            <p className="text-sm text-gray-500 mb-2">
              Lorem ipsum dolor sit amet, consectetur
            </p>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex justify-between">
                <span>The importance of business plan</span>
                <span className="text-gray-400">12/01/2025</span>
              </li>
              <li className="flex justify-between">
                <span>How to increase your revenues</span>
                <span className="text-gray-400">12/01/2025</span>
              </li>
            </ul>
          </div>
  
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold mb-2">Latest Customers</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              {[
                { name: "Jhon radnod", price: "IDR 45.000" },
                { name: "Anna jae", price: "IDR 75.000" },
                { name: "Jakob mark", price: "IDR 45.000" },
                { name: "Kane atba", price: "IDR 45.000" },
              ].map((cust, idx) => (
                <li key={idx} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://i.pravatar.cc/30?img=${idx + 1}`}
                      alt={cust.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{cust.name}</span>
                  </div>
                  <span className="text-gray-500">{cust.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
  
        {/* Consultations Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Consultations</p>
              <h2 className="text-xl font-bold">2,568</h2>
              <p className="text-red-500 text-sm">↓ 2.1% vs last week</p>
              <p className="text-xs text-gray-400">1–6 Dec, 2020</p>
            </div>
            <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50">
              View Report
            </button>
          </div>
          <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            📈 Line Chart Placeholder
          </div>
        </div>
      </div>
    );
  }
  