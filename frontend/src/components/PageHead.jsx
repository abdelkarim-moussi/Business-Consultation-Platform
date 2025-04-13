const PageHead = ({ title, image }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between gap-5 items-center px-5 md:px-10 mb-10 w-full max-h-[80vh] flex-col md:flex-row md:items-start text-center md:text-start">
        <h2 className="text-md mt-40 md:w-[50%] text-[3rem] leading-[3rem] md:text-[5rem] font-bold md:leading-[5rem]">
          {title}
        </h2>
        <img
          className="max-h-[300px] object-fit w-[400px] min-w-[200px] mt-10 md:mt-40"
          src={image}
          alt="header image"
        />
      </div>
      <div className="w-full h-[1px] bg-[#D9E0A4] my-10"></div>
    </div>
  );
};

export default PageHead;
