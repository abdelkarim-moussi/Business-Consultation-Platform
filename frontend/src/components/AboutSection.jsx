import PlayBtn from "../assets/images/playbtn.png";
const AboutSection = () => {
  return (
    <div className="w-full flex-col gap-5 flex items-center justify-center py-10 h-[300px] text-center text-white bg-[#19485F] ">
      <h3 className="text-[2rem]">BusConsult ?</h3>
      <p className="md:w-[80%] text-[0.9rem]">
        busConsult is an platform that offers entrepreneurs and startups an
        opportunity to find and contact experts in their domain of activity and
        take an online consultations
      </p>
      <button type="button">
        <img src={PlayBtn} alt="play-btn" className="w-[50px] h-[50px]" />
      </button>
    </div>
  );
};

export default AboutSection;
