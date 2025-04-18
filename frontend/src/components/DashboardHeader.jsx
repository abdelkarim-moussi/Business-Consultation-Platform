export default function DashboardHeader() {
  return (
    <div className="flex items-center justify-between gap-10 mb-8 bg-[#19485F] text-white p-5">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4 gap-5">
        <div className="w-[350px] h-[40px] bg-gray-200 rounded-lg">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 text-sm w-full h-full bg-transparent outline-none text-gray-600 rounded-lg"
          />
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/30"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-100 text-sm">abdelakrim moussi</span>
        </div>
      </div>
    </div>
  );
}
