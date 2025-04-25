import React from "react";
import { motion } from "framer-motion";
import ProfileCard from "../ProfileCard";

const ConsultantsSection = ({
  data,
  loading,
  currentPage,
  consultantsPerPage,
}) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-[300px]"
      >
        <h1>Loading...</h1>
      </motion.div>
    );
  }

  const indexOfLastConsultant = currentPage * consultantsPerPage;
  const indexOfFirstConsultant = indexOfLastConsultant - consultantsPerPage;
  const currentConsultants = data.slice(
    indexOfFirstConsultant,
    indexOfLastConsultant
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-5 px-5 md:px-10 py-10">
        {currentConsultants.map((consultant, index) => (
          <motion.div
            key={consultant.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ProfileCard consultant={consultant} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ConsultantsSection;
