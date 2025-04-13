import React from 'react'
import SectionTitle from './SectionTitle'
import Testimonial from './Testimonial'

export default function TestimonialsSection (){
  return (
    <div>
      <SectionTitle text="What people says ?" classes="text-center"/>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5 my-5'>
        <Testimonial profile="../assets/images/profile.jpg" name="Jhane Doe" job="Finance coach" testimonial="“ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an “"/>
        <Testimonial profile="../assets/images/profile.jpg" name="Jhane Doe" job="Finance coach" testimonial="“ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an “"/>
        <Testimonial profile="../assets/images/profile.jpg" name="Jhane Doe" job="Finance coach" testimonial="“ Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an “"/>
      </div>
    </div>
  )
}

