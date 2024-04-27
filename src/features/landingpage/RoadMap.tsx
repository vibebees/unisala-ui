import React from 'react';
import { motion } from 'framer-motion';
import UnisalaLogo from "@assets/icon/Unisala.svg"


export const RoadMap = ({before, after}) => (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0, scale: 1.1 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.8 }}
    className='mt-14 px-8 mb-14'
  >
    <div className='w-full  sm:px-14 py-2 relative'>
      <div className='relative flex items-center justify-between w-full'>
        <motion.div
          className='absolute left-0  h-0.5 w-full bg-red-800' // Red line for initial challenges
          animate={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.div
          className='absolute left-0  h-0.5 w-full bg-green-600 transition-all duration-500' // Green line after Unisala
          animate={{ scaleX: 1 }}
          initial={{ scaleX: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>
        <motion.div
          className='relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            ></path>
          </svg>
          <div className='absolute -bottom-[2.5rem] w-max text-center'>
            <p >
              {before}
            </p>
          </div>
        </motion.div>
        <motion.div
          className='relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 rounded-full place-items-center'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* <svg

            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d= "@assets/icon/Unisala.svg"
            ></path>
          </svg> */}
          <img src={UnisalaLogo} alt="Unisala Logo" className="w-30 h-30"/>
          <div className='absolute -bottom-[2.5rem] w-max text-center'>
            <p >
              Unisala
            </p>
          </div>
        </motion.div>
        <motion.div
          className='relative z-10 grid w-10 h-10 font-bold text-white transition-all duration-300 bg-gray-900 rounded-full place-items-center'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            aria-hidden='true'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z'
            ></path>
          </svg>
          <div className='absolute -bottom-[2.5rem] w-max text-center'>
            <p>
               {after}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.div>
);
