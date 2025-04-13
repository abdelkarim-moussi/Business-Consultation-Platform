import React from 'react'
import PageHead from '../components/PageHead'
import HeadImage from "../assets/images/head.png"
import SecondaryButton from '../components/SecondaryButton'
import InputButton from '../components/InputButton'

const Consultants = () => {
  return (
    <>
    <PageHead title="Find The Consultant you need" image={HeadImage}/>
    <section className='flex items-center justify-around my-10'>
    <div className='flex gap-5 items-center'>
        <h3>Filter By</h3>
          <select name="industry" id="industry" className="border-2 text-sm border-[#D9E0A4] px-6 py-1 capitalize transition hover:border-[#19485F] rounded-md cursor-pointer">
            <option disabled>industry</option>
            <option value="tech">tech</option>
            <option value="finance">finance</option>
            <option value="sells">sells</option>
            <option value="marketing">marketing</option>
          </select>
          <select name="experience" id="experience" className="border-2 text-sm border-[#D9E0A4] px-6 py-1 capitalize transition hover:border-[#19485F] rounded-md cursor-pointer">
            <option disabled>experience</option>
            <option value="2">2 years</option>
            <option value="5">5 years</option>
            <option value="10">10 years</option>
            <option value="20">20 years</option>
          </select>
      </div>

      <InputButton type="search" placeholder="...Search" buttonType="button" buttonText="Search"/>
    </section>
    </>
  )
}

export default Consultants
