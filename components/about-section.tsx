"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';


export default function AboutSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <section id="about" className="py-12 px-4 sm:px-6 lg:px-8 mx-auto relative overflow-hidden">
      {/* Modern elegant background */}
      <div className="absolute inset-0 bg-blue-950"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 25px 25px, #052ba0 1px, transparent 2px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">

          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Us
          </motion.h2>
          <motion.p 
            className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Discover our journey, values, and the vision that drives us forward.
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <motion.div variants={cardVariants}>
            <div className="bg-white/10 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Mission</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Empower businesses through innovative solutions that transform challenges into opportunities for growth.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <div className="bg-white/10 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Vision</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Leading catalyst for positive change, uniting technology and human potential for sustainable communities.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <div className="bg-white/10 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Goal</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Achieve excellence in every project with highest standards of quality, integrity, and customer satisfaction.
              </p>
            </div>
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <div className="bg-white/10 backdrop-blur-sm border-2 border-yellow-500 rounded-xl p-6 h-full hover:bg-white/20 transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Objectives</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100 text-sm">Deliver innovative solutions</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100 text-sm">Foster long-term partnerships</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100 text-sm">Maintain sustainable growth</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-blue-100 text-sm">Contribute to community</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Modern animated buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
        <Link href="/about/history" passHref>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
          >
            History
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          </Link>

          <Link href="/about/drrmc-council" passHref>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
          >
            The Council
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          </Link>
          
          <Link href="/about/mdrrmo-personnel" passHref>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-3 bg-yellow-500 text-blue-900 font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
          >
            MDRRMO Personnel
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
