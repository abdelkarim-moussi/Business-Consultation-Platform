import Dashboard from "../assets/images/Dashboard.png";
import SectionTitle from "./SectionTitle";
import growth from "../assets/images/goal.png"
import graph from "../assets/images/graph.png"
import planning from "../assets/images/planning.png"
export const BenifitsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-between gap-10 my-20">
      <img src={Dashboard} alt="dashboard" className="w-full"/>
      <div className="flex flex-col">
        <SectionTitle text="What you will get as an entrepreneur ?" classes="font-bold leading-[2rem]"/>
        <div className="w-full flex items-center gap-5 mt-5">
            <img src={graph} alt="groath" className="w-[40px]"/>
            <h3 className="text-sm max-w-[80%]">help you grow your business by offering consultations with experts</h3>
        </div>
        <div className="w-full flex items-center gap-5 mt-5">
            <img src={growth} alt="groath" className="w-[40px]"/>
            <h3 className="text-sm max-w-[80%]">achieve your goals</h3>
        </div>
        <div className="w-full flex items-center gap-5 mt-5">
            <img src={planning} alt="groath" className="w-[40px]"/>
            <h3 className="text-sm max-w-[80%]">help you with your project management</h3>
        </div>
      </div>
    </div>
  );
};
