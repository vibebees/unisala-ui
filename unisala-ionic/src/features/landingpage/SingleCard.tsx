import React from 'react';
import { motion } from 'framer-motion';
import { RoadMap } from './RoadMap';
import { IonItem } from '@ionic/react';


export const SingleCard = ({ title, description, image }) => (
  <motion.div
    initial={{ opacity: 0, y: -100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ease: 'easeOut', duration: 0.8 }}
    className='relative flex flex-col mt-10 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96'
  >

    <div className='relative h-64 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500'>
      <img
        src={image}
        alt='card-image'
        className='object-cover w-full h-full' />
    </div>
    <div className='p-6 bg-blue-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg text-white'>
      <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900  text-center underline'>
        {title}
      </h5>

      <p className='block font-sans text-base antialiased font-light leading-relaxed'>
        {description}
      </p>
    </div>
    <div >
      <IonItem/>
    </div>
  </motion.div>
);
