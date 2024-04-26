import React from 'react'; // Import the 'React' module
import { useState } from 'react';
import { motion } from 'framer-motion';
import question from '../../assets/welcome/question.jpeg';
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonGrid,
  IonItem,
  IonRow
} from '@ionic/react';
import incomingStudents from "@assets/question.jpeg"
import currentStudents from "@assets/currentStudents.jpeg"
import alumini  from "@assets/alumini.jpeg"


import "./css/templatemo-scholar.css"
import { image } from 'ionicons/icons';

export const SingleCard = ({title, description, image}) => (
  <motion.div
    initial={{ opacity: 0, y: -100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ease: 'easeOut', duration: 0.8 }}
    className='relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96'
  >
    <div className='relative h-64 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500'>
      <img
        src={image}
        alt='card-image'
        className='object-cover w-full h-full'
      />
    </div>
    <div className='p-6 bg-blue-gray-900 bg-opacity-90 backdrop-filter backdrop-blur-lg text-white'>
      <h5 className='block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
        {title}
      </h5>
      <p className='block font-sans text-base antialiased font-light leading-relaxed'>
        {description}
      </p>
    </div>
    <div className='p-6 pt-0'></div>
  </motion.div>
);


export const RoadMap = () => (
  <motion.div
  initial={{ opacity: 0, y: 100 }} // Initial opacity and y position below the screen
  animate={{ opacity: 1, y: 0, scale: 1.1 }} // Animation to fully visible, original y position, and slight scale increase
  transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.8 }} // Spring animation with bounce effect
  className='mt-20 px-14 mb-20' // Add margin-top and space between the steps
>
<div className='w-full px-4 sm:px-14 py-2 relative'>
    <div className='relative flex items-center justify-between w-full'>
      <motion.div
        className='absolute left-0 top-2/4 h-0.5 w-full bg-gray-300'
        animate={{ scaleX: 1 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <motion.div
        className='absolute left-0 top-2/4 h-0.5 w-full bg-gray-900 transition-all duration-500'
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
        <div className='absolute -bottom-[4.5rem] w-max text-center'>
          <h6 className='block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700'>
            You
          </h6>
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
            d='M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495'
          ></path>
        </svg>
        <div className='absolute -bottom-[4.5rem] w-max text-center'>
          <h6 className='block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900'>
            Unisala
          </h6>
        </div>
      </motion.div>
      <motion.div
        className='relative z-10 grid w-10 h-10 font-bold text-gray-900 transition-all duration-300 bg-gray-300 rounded-full place-items-center'
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
        <div className='absolute -bottom-[4.5rem] w-max text-center'>
          <h6 className='block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700'>
            Best University
          </h6>
        </div>
      </motion.div>
    </div>
  </div>
</motion.div>

);



export const FAQ = () => {
  // Define state to keep track of the active collapse
  const [activeCollapse, setActiveCollapse] = useState(null);

  // Function to handle click on a collapse item
  const handleCollapse = (index) => {
    // If the clicked item is already active, deactivate it
    setActiveCollapse((prevIndex) => (prevIndex === index ? null : index));
  };

  // Data for the FAQ items
  const faqData = [
    {
      question: 'What is Material Tailwind?',
      answer:
        "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
    },
    {
      question: 'How to use Material Tailwind?',
      answer:
        "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
    },
    {
      question: 'What can I do with Material Tailwind?',
      answer:
        "We're not always in the position that we want to be at. We're constantly growing. We're constantly making mistakes. We're constantly trying to express ourselves and actualize our dreams.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }} // Initial opacity and y position below the screen
      animate={{ opacity: 1, y: 0, scale: 1.1 }} // Animation to fully visible, original y position, and slight scale increase
      transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 0.8 }} // Spring animation with bounce effect
      className='mt-20 px-14 mb-20'
    >
      {faqData.map((item, index) => (
        <div className="relative mb-3" key={index}>
          <h6 className="mb-0">
            <button
              className={`relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-1 group text-dark-500 ${activeCollapse === index ? 'bg-gray-300' : ''}`}
              onClick={() => handleCollapse(index)} // Call handleCollapse function on click
              data-collapse-target={`animated-collapse-${index + 1}`}
            >
              <span>{item.question}</span>
              <span className="absolute right-0 pt-1 text-base font-semibold">{activeCollapse === index ? '-' : '+'}</span>
            </button>
          </h6>
          <div
            data-collapse={`animated-collapse-${index + 1}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              activeCollapse === index ? 'h-auto' : 'h-0'
            }`}
          >
            <div className="p-4 text-sm leading-normal text-blue-gray-500/80">{item.answer}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );

};
export const UnisalaLandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cardContent =  [
    {
      title: "Incoming Student 🤔",
      description: "🌟✈️ Imagine stepping into your future today. On Unisala, connect with someone who's living your dream. 🌈 They were once where you are now, navigating decisions just like yours. Let their journey inspire and guide yours, helping you to see beyond the horizon to what’s possible.",
      image:incomingStudents
    },
    {
      title: "Current Student 🧑‍🎓",
      description: "Find classmates 🤝 across the nation, team up for groundbreaking projects, or share your own innovations. 💡 Here, you’re not just earning a degree; you’re expanding your network and finding mentors who can turn your vision into reality.",
      image:currentStudents

    },
    {
      title: "Alumni 🎓",
      description: "Remember the feeling of home 🏠? Reconnect with it on Unisala. Meet local graduates from your own university or from your homeland. 🌍 Whether you shared the same campus or the same roots, you’ll find community and continuity. 🤝 Share your hard-earned insights and experiences, and keep the cycle of learning and support alive.",
      image:alumini

    }
  ];

  return (
    <IonGrid>
      <IonRow>
        {
          cardContent.map((content, index) => (
            <IonCol key={index}>
              <SingleCard title={content.title} description={content.description} image={content.image} />
            </IonCol>
          ))
        }
      </IonRow>
      <IonItem />
      <IonRow>
        <IonCol>
          <RoadMap />
        </IonCol>
      </IonRow>
      <IonItem />

      <IonRow>
        <FAQ />
      </IonRow>
    </IonGrid>
  );
};
