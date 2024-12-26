import React from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/Header/Header';
import Banner from '../assets/images/banner.jpg';

const Home = () => {
  const bannerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.5, ease: 'easeOut' },
    },
  };

  const subtextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 1, ease: 'easeOut' },
    },
  };

  return (
    <>
      <Header />
      <div className="relative w-full h-screen overflow-hidden">
        {/* Animated Banner */}
        <motion.img
          src={Banner}
          alt="Banner"
          className="w-full h-full object-cover"
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
        />
        {/* Overlay Text */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center text-center bg-black bg-opacity-50"
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold"
            variants={textVariants}
            style={{
              color: 'white',
              textShadow: '0 0 1px #0ff, 0 0 3px #0ff, 0 0 5px #0ff', // Further reduced text-shadow
            }}
          >
            Welcome to Book Management
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4"
            variants={subtextVariants}
            style={{
              color: 'white',
              textShadow: '0 0 1px #0ff, 0 0 3px #0ff, 0 0 5px #0ff', // Further reduced text-shadow
            }}
          >
            Manage your collection effortlessly and efficiently
          </motion.p>

        </motion.div>
      </div>
    </>
  );
};
  
export default Home;
