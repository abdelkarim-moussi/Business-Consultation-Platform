const PageHead = ({title,image}) => {
  return (
    <>
    <div className="flex justify-between gap-5 items-center px-5 md:px-10 mb-10 w-full max-h-[80vh] flex-col md:flex-row md:items-start text-center md:text-start">
      <h2 className="text-md mt-40 md:w-[50%] text-[5rem] font-bold leading-[5rem]">{title}</h2>
      <img className="w-full max-h-[300px] object-fit md:w-[50%] mt-40" src={image} alt="header image" />
    </div>
    <div className="w-full h-[1px] bg-[#D9E0A4] my-10"></div>
    </>
  );
};

export default PageHead;
