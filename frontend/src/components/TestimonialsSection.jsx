import React from 'react'
import SectionTitle from './SectionTitle'
import Testimonial from './Testimonial'

export default function TestimonialsSection (){
  return (
    <div className='my-20'>
      <SectionTitle text="What people says ?" classes="text-center"/>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5 mt-5'>
        <Testimonial profile="../assets/images/profile.jpg" name="Jhane Doe" job="Finance coach" testimonial="“ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an “"/>
        <Testimonial profile="../assets/images/profile.jpg" name="Jhane Doe" job="Finance coach" testimonial="“ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an “"/>
        <Testimonial profile="../assets/images/profile.jpg" name="Jhane Doe" job="Finance coach" testimonial="“ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an “"/>
      </div>
      <div className='flex gap-2 items-center justify-center mb-5'>
        <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
        <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
        <div className='w-2 h-2 bg-gray-400 rounded-full'></div>
      </div>
    </div>
  )
}

