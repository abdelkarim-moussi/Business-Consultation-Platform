import { motion } from 'framer-motion';
import OnlineConsultation from "../assets/images/dialogue.png";
import Blogs from "../assets/images/blogging.png";
import Ressource from "../assets/images/resource.png";
import Solution from "../assets/images/solution.png";
import Monitize from "../assets/images/video.png";
import Graph from "../assets/images/graph.png";
import Client from "../assets/images/costumer.png";
import SectionTitle from "./SectionTitle";

export const ServicesSection = () => {
  const consultantServices = [
    {
      title: "online consultation",
      image: OnlineConsultation,
    },
    {
      title: "rich & informational blogs",
      image: Blogs,
    },
    {
      title: "online resources",
      image: Ressource,
    },
    {
      title: "personalized solutions",
      image: Solution,
    },
  ];

  const EntrepreneurServices = [
    {
      title: "monetize expertise ",
      image: Monitize,
    },
    {
      title: "share blogs ",
      image: Blogs,
    },
    {
      title: "enhance visibility ",
      image: Graph,
    },
    {
      title: "get more clients ",
      image: Client,
    },
  ];

  return (
    <section className="py-10">
      <div>
        <SectionTitle
          text="For Entrepreneurs / Startups"
          classes="text-center mb-5"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-4 justify-around my-5"
        >
          {consultantServices.map((service) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <img src={service.image} alt="" className="w-[80px] h-[80px] border-2 p-2 rounded-full object-cover" />
                <h3 className="text-center">{service.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-10">
        <SectionTitle
          text="For Consultants / Experts"
          classes="text-center mb-5"
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-around gap-4 my-5"
        >
          {EntrepreneurServices.map((service) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-4"
              >
                <img src={service.image} alt="" className="w-[80px] h-[80px] border-2 p-2 rounded-full object-cover" />
                <h3 className="text-center">{service.title}</h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
