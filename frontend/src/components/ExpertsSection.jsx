import PrimaryButton from "./PrimaryButton"
import ProfileCard from "./ProfileCard";

export const ExpertsSection = () => {
  return (
    <div className="py-5 text-center">
      <h1 className="text-center text-[6rem] md:text-[8em] leading-[7rem] font-bold mb-20">
        Find the
        <br /> right <span className="text-[#19485F]">expert</span> for you
      </h1>

      <div className="my-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:px-5 md:px-10">
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
      </div>

      <PrimaryButton link="/consultants" text="View More"/>
    </div>
  );
};
