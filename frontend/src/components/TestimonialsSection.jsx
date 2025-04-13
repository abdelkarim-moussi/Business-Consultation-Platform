import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import Testimonial from './Testimonial';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      profile: '../assets/images/profile.jpg',
      name: 'Jhane Doe',
      job: 'Finance coach',
      testimonial: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    },
    {
      profile: '../assets/images/profile.jpg',
      name: 'Jhane Doe',
      job: 'Finance coach',
      testimonial: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    },
    {
      profile: '../assets/images/profile.jpg',
      name: 'Jhane Doe',
      job: 'Finance coach',
      testimonial: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    },
    {
      profile: '../assets/images/profile.jpg',
      name: 'Jhane Doe',
      job: 'Finance coach',
      testimonial: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    },
    {
      profile: '../assets/images/profile.jpg',
      name: 'Jhane Doe',
      job: 'Finance coach',
      testimonial: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    },
    {
      profile: '../assets/images/profile.jpg',
      name: 'Jhane Doe',
      job: 'Finance coach',
      testimonial: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an',
    },
  ];

  const totalPages = Math.ceil(testimonials.length / 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="my-20">
      <SectionTitle text="What people says ?" classes="text-center" />
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 mt-5">
          {testimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : index === 1 ? 0 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="transition-all duration-500"
            >
              <Testimonial
                profile={testimonial.profile}
                name={testimonial.name}
                job={testimonial.job}
                testimonial={testimonial.testimonial}
              />
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center items-center space-x-2 mt-5">
          {Array.from({ length: totalPages }, (_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === Math.floor(currentIndex / 3) ? 'bg-gray-800' : 'bg-gray-400'
              }`}
              onClick={() => setCurrentIndex(index * 3)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
