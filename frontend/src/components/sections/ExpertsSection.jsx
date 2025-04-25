import { motion } from "framer-motion";
import PrimaryButton from "../buttons/PrimaryButton";
import ProfileCard from "../ProfileCard";
import { useEffect, useState } from "react";
import axios from "axios";

export const ExpertsSection = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://127.0.0.1:8000/api/consultants"
        );
        setConsultants(response.data.consultants || []);
        setLoading(false);
      } catch (error) {
        console.log("error fetching consultants", error);
        setLoading(false);
      }
    };

    fetchConsultants();
  }, []);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="py-5 text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-[6rem] md:text-[8em] leading-[7rem] font-bold mb-20"
      >
        Find the
        <br /> right <span className="text-[#19485F]">expert</span> for you
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="my-10 grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:px-5 md:px-10"
      >
        {consultants.map((consultant) => {
          return (
            consultant.id < 3 && (
              <motion.div
                key={consultant.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ProfileCard consultant={consultant} />
              </motion.div>
            )
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <PrimaryButton link="/consultants" text="View More" />
      </motion.div>
    </motion.div>
  );
};
