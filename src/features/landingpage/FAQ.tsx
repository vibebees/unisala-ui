import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';



export const FAQ = () => {
  // Define state to keep track of the active collapse
  const [ activeCollapse, setActiveCollapse ] = useState(null);

  // Function to handle click on a collapse item
  const handleCollapse = (index) => {
    // If the clicked item is already active, deactivate it
    setActiveCollapse((prevIndex) => (prevIndex === index ? null : index));
  };

  // Data for the FAQ items
  const faqData = [
    {
      "question": "What is Unisala?",
      "answer": "Unisala is your comprehensive platform for navigating the U.S. university journey with ease. From finding the right university to settling in abroad, Unisala is your trusted companion every step of the way."
    },
    {
      "question": "What's included in the platform?",
      "answer": "Unisala offers a range of features and services, including university search and comparison, visa assistance, accommodation recommendations, cultural integration tips, and a community forum for connecting with other students."
    },
    {
      "question": "Who can use the platform?",
      "answer": "Unisala is designed for students who are considering studying in the United States. Whether you're a high school student exploring your options, a college student looking to transfer, or an international student seeking opportunities in the U.S., Unisala is here to help."
    },
    {
      "question": "Who created the platform?",
      "answer": "Unisala was created by a team of dedicated individuals passionate about making the university application process easier and more accessible. Our team includes experienced educators, technology experts, and international students who have firsthand experience navigating the challenges of studying abroad."
    }
  ]


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
            className={`overflow-hidden transition-all duration-300 ease-in-out ${activeCollapse === index ? 'h-auto' : 'h-0'}`}
          >
            <div className="p-4 text-sm leading-normal text-blue-gray-500/80">{item.answer}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );

};
