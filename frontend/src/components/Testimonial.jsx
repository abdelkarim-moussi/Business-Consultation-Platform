export default function Testimonial ({profile,name,job,testimonial}){
  return (
    <div className="flex flex-col gap-2 px-3 py-5 shadow-xl rounded-lg">
      <div className="flex items-center gap-5">
        <img src={profile} alt="profile" className="w-[50px] text-xs rounded-full object-fill" />
        <div>
            <h5 className="text-sm">{name}</h5>
            <h5 className="text-sm font-semibold">{job}</h5>
        </div>
      </div>
      <p className="text-xs">
        {testimonial}
      </p>
    </div>
  )
}

