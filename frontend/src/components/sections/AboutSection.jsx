import { motion } from 'framer-motion';
import PlayBtn from "../../assets/images/icon-jouer.png";
import SectionTitle from "../SectionTitle";

const AboutSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full flex-col gap-5 flex items-center justify-center py-10 h-[300px] text-center text-white bg-[#4F46E5]"
    >
      <SectionTitle text="BusConsult ?"/>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="md:w-[80%] text-[0.9rem]"
      >
        busConsult is an platform that offers entrepreneurs and startups an
        opportunity to find and contact experts in their domain of activity and
        take an online consultations
      </motion.p>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        type="button"
        className='border border-white rounded-full p-2 flex items-center justify-center'
      >
        <img src={PlayBtn} alt="play-btn" className="w-[40px] h-[40px] mx-auto" />
      </motion.button>
    </motion.div>
  );
};

export default AboutSection;
