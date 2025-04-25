import { motion } from 'framer-motion';
import Dashboard from "../../assets/images/Dashboard.png";
import SectionTitle from "../SectionTitle";
import growth from "../../assets/images/goal.png"
import graph from "../../assets/images/graph.png"
import planning from "../../assets/images/planning.png"

export const BenifitsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 items-start justify-between gap-10 my-20"
    >
      <motion.img
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        src={Dashboard} alt="dashboard" className="w-full"
      />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col"
      >
        <SectionTitle text="What you will get as an entrepreneur ?" classes="font-bold leading-[2rem]"/>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex items-center gap-5 mt-5"
        >
          <img src={graph} alt="groath" className="w-[40px]"/>
          <h3 className="text-sm max-w-[80%]">help you grow your business by offering consultations with experts</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full flex items-center gap-5 mt-5"
        >
          <img src={growth} alt="groath" className="w-[40px]"/>
          <h3 className="text-sm max-w-[80%]">achieve your goals</h3>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="w-full flex items-center gap-5 mt-5"
        >
          <img src={planning} alt="groath" className="w-[40px]"/>
          <h3 className="text-sm max-w-[80%]">help you with your project management</h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
