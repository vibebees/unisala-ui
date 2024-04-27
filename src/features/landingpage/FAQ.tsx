import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';



export const FAQ = () => {
  // Define state to keep track of the active collapse
  const [ activeCollapse, setActiveCollapse ] = useState(0);

  // Function to handle click on a collapse item
  const handleCollapse = (index) => {
    // If the clicked item is already active, deactivate it
    setActiveCollapse((prevIndex) => (prevIndex === index ? null : index));
  };
// Data for the FAQ items
const faqData = [
  {
    question: 'What is Unisala?',
    answer: [
      'Platform crafted to empower students through every phase of their journey in the U.S. 🇺🇸✨',
      [
        'Help in crucial decision-making students, helping them choose the right major, university, and career path. 🎓🔍',
        'Enabling current students to connect with peers, alumini and discover opportunities for collaboration and personal growth. 🤝💡',
        'Supports alumni in staying connected, networking, and mentoring, reinforcing the cycle of success and guidance. 🌟🔄',
        'Dedicated space for vibrant knowledge sharing and collaborative learning. 📖🤝'
      ]
    ]
  },
  {
    question: 'Who can use Unisala?',
    answer: [
      'Unisala is designed for a diverse audience:',
      [
        'International students seeking guidance, and community. 🌍📚',
        'Alumni looking to reconnect and network 🎓🤗',
        'Organizations aiming to support and manage their international constituents. 🏛️🎉'
      ],
      'The platform offers resources and networking opportunities for each stage of the educational journey and includes'
    ]
  },
  {
    question: 'What\'s included in the platform?',
    answer: [
      'Unisala offers a suite of features to support your educational path in the U.S. Here’s what’s available:',
      [
        '🏫 **University Database**: Access detailed profiles of over 6500 U.S. universities covering programs, professors, tuition, and campus life.',
        '🎓 **Personalized Matchmaking**: Find the perfect university that fits your academic and personal preferences.',
        '🗣️ **Community Interaction**: Join a global network for discussions, advice, and connections with students and alumni.',
        '🌐 **Graduates Networks**: Connect with alumni for career insights and professional networking.',
        '🎉 **Cultural & Social Events**: Get involved in events and webinars that enrich your student life.'
      ],
      'With Unisala, step into a portal that prepares you for academic excellence and a promising professional future.'
    ]
  },
  {
    question: 'How can current students benefit from Unisala?',
    answer: [
      'Unisala enhances the academic and social life of students in the U.S. Here’s how:',
      [
        '🤝 **Networking**: Connect with global peers to share ideas and collaborate.',
        '📚 **Resources**: Access a wide range of study materials and tutorials.',
        '🌟 **Mentorship**: Get career and personal development advice from alumni.',
        '🎉 **Events**: Participate in cultural and social events for a well-rounded college experience.',
        '📢 **Share Experiences**: Contribute your own insights and learn from others.'
      ],
      'Unisala prepares you for both academic success and a smooth transition into your career!'
    ]
  },
  {
    question: 'How can alumni contribute to Unisala?',
    answer: [
      'Alumni play a pivotal role in enriching the Unisala community. Here’s how they can make a difference:',
      [
        '🌟 **Mentoring**: Offer guidance and advice to current students, helping them navigate their academic and career paths.',
        '🤝 **Networking**: Engage with students and other alumni to build a strong professional network.',
        '📚 **Resource Contribution**: Share valuable resources, such as lecture notes, career tips, and webinar access.',
        '🎓 **University Reviews**: Provide firsthand insights and reviews about your alma mater to assist prospective students in making informed decisions.',
        '🗣️ **Event Participation**: Participate in or host webinars, workshops, and talks that can benefit the student body.'
      ],
      'Alumni contributions help maintain a vibrant, supportive, and resourceful community at Unisala.'
    ]
  },
  {
    question: 'How can a student organization benefit from Unisala?',
    answer: [
      'Student organizations can significantly enhance their influence and connectivity through Unisala. Here’s how they can harness the platform:',
      [
        '🤝 **Robust Alumni Networks**: Build a strong community by reconnecting with alumni, turning a small current membership into a thriving network of engaged former and current members.',
        '📣 **Event Promotion and Legacy Building**: Use Unisala to host and promote events and webinars, such as the recent computer science webinar by a Southeastern Louisiana University alumnus working at AT&T. This helps maintain a vibrant, active presence that appeals to both current members and alumni.',
        '🌐 **Global and Historical Reach**: Expand your reach by connecting with hundreds or thousands of past members worldwide, showcasing the organization’s broad impact and history.',
        '📚 **Resource and Knowledge Sharing**: Encourage a dynamic exchange of knowledge, with members and alumni contributing educational content, career tips, and more.',
        '🔧 **Enhanced Visibility**: Increase your visibility on Unisala to attract more members and showcase your network’s strength and achievements.'
      ],
      'With Unisala, your organization isn’t just a club; it’s a gateway to lifelong connections and professional opportunities, enriching your educational journey and beyond.'
    ]
  },
  {
    question: 'Who created the platform?',
    answer: [
      "The creators of Unisala were international students 🌍 who roamed the same halls as you might, studying in the U.S. at Southeastern Louisiana University 🎓. They faced the same exciting highs       and daunting lows of studying abroad and wanted to make sure others like them had an easier time.So, they came together and built Unisala, not just as a tool but as a friend to guide future students through their journey, just like they wished they had when they started. 🚀      "
    ]
  }






  // Add more FAQ entries here
];
/*

  {
    question: 'Who created the platform?',
    answer: 'Unisala was developed by a team of experienced educators and technology professionals with a deep understanding of the challenges faced by international students. The team is passionate about providing solutions that ease the educational and cultural transition for students studying abroad.'
  },
  {
    question: 'Is there a fee to use Unisala?',
    answer: 'Unisala offers both free and premium subscription options. The free version includes access to basic features, while the premium subscription offers enhanced tools and resources for a more comprehensive support system.'
  }

*/

  const WhatIsUnisala = () => (
    <div className='mb-4'>
      <h6 className='mb-0'>
        <button
          className='relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group'
          onClick={() => handleCollapse(0)}
        >
          <h5>What is Unisala?</h5>
          <i
            className={`absolute right-0 pt-1 text-xs fa ${
              activeCollapse === 0 ? 'fa-minus' : 'fa-plus'
            } transition-opacity duration-300`}
          ></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          activeCollapse === 0 ? 'max-h-screen' : 'h-0'
        }`}
      >
        <div className='p-4 text-sm leading-normal text-gray-600'>
          <p>
            Platform crafted to empower students through every phase of their
            journey in the U.S. 🇺🇸✨
          </p>
          <ul className='list-disc pl-5 space-y-2'>
            <li className='font-bold text-gray-800'>
              Help in crucial decision-making students, helping them choose the
              right major, university, and career path. 🎓🔍
            </li>
            <li className='font-bold text-gray-800'>
              Enabling current students to connect with peers, alumni and
              discover opportunities for collaboration and personal growth. 🤝💡
            </li>
            <li className='font-bold text-gray-800'>
              Supports alumni in staying connected, networking, and mentoring,
              reinforcing the cycle of success and guidance. 🌟🔄
            </li>
            <li className='font-bold text-gray-800'>
              Dedicated space for vibrant knowledge sharing and collaborative
              learning. 📖🤝
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
  const WhoCanUseUnisala = ({ isActive, onClick }) => (
    <div className="mb-4">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
          onClick={onClick}
        >
          <h5>Who can use Unisala?</h5>
          <i className={`absolute right-0 pt-1 text-xs fa ${isActive ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-screen' : 'h-0'}`}
      >
        <div className="p-4 text-sm leading-normal text-gray-600">
          <p>Unisala is designed for a diverse audience:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-bold text-gray-800">International students seeking guidance, and community. 🌍📚</li>
            <li className="font-bold text-gray-800">Alumni looking to reconnect and network 🎓🤗</li>
            <li className="font-bold text-gray-800">Organizations aiming to support and manage their international constituents. 🏛️🎉</li>
          </ul>
          <p>The platform offers resources and networking opportunities for each stage of the educational journey and includes</p>
        </div>
      </div>
    </div>
  );

  const WhatsIncludedInPlatform = ({ isActive, onClick }) => (
    <div className="mb-4">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
          onClick={onClick}
        >
          <h5>What's included in the platform?</h5>
          <i className={`absolute right-0 pt-1 text-xs fa ${isActive ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-screen' : 'h-0'}`}
      >
        <div className="p-4 text-sm leading-normal text-gray-600">
          <p>Unisala offers a suite of features to support your educational path in the U.S. Here’s what’s available:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-bold text-gray-800">🏫 **University Database**: Access detailed profiles of over 6500 U.S. universities covering programs, professors, tuition, and campus life.</li>
            <li className="font-bold text-gray-800">🎓 **Personalized Matchmaking**: Find the perfect university that fits your academic and personal preferences.</li>
            <li className="font-bold text-gray-800">🗣️ **Community Interaction**: Join a global network for discussions, advice, and connections with students and alumni.</li>
            <li className="font-bold text-gray-800">🌐 **Graduates Networks**: Connect with alumni for career insights and professional networking.</li>
            <li className="font-bold text-gray-800">🎉 **Cultural & Social Events**: Get involved in events and webinars that enrich your student life.</li>
          </ul>
          <p>With Unisala, step into a portal that prepares you for academic excellence and a promising professional future.</p>
        </div>
      </div>
    </div>
  );

  const CurrentStudentsBenefits = ({ isActive, onClick }) => (
    <div className="mb-4">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
          onClick={onClick}
        >
          <h5>How can current students benefit from Unisala?</h5>
          <i className={`absolute right-0 pt-1 text-xs fa ${isActive ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-screen' : 'h-0'}`}
      >
        <div className="p-4 text-sm leading-normal text-gray-600">
          <p>Unisala enhances the academic and social life of students in the U.S. Here’s how:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-bold text-gray-800">🤝 **Networking**: Connect with global peers to share ideas and collaborate.</li>
            <li className="font-bold text-gray-800">📚 **Resources**: Access a wide range of study materials and tutorials.</li>
            <li className="font-bold text-gray-800">🌟 **Mentorship**: Get career and personal development advice from alumni.</li>
            <li className="font-bold text-gray-800">🎉 **Events**: Participate in cultural and social events for a well-rounded college experience.</li>
            <li className="font-bold text-gray-800">📢 **Share Experiences**: Contribute your own insights and learn from others.</li>
          </ul>
          <p>Unisala prepares you for both academic success and a smooth transition into your career!</p>
        </div>
      </div>
    </div>
  );

  const AlumniContribution = ({ isActive, onClick }) => (
    <div className="mb-4">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
          onClick={onClick}
        >
          <h5>How can alumni contribute to Unisala?</h5>
          <i className={`absolute right-0 pt-1 text-xs fa ${isActive ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-screen' : 'h-0'}`}
      >
        <div className="p-4 text-sm leading-normal text-gray-600">
          <p>Alumni play a pivotal role in enriching the Unisala community. Here’s how they can make a difference:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-bold text-gray-800">🌟 **Mentoring**: Offer guidance and advice to current students, helping them navigate their academic and career paths.</li>
            <li className="font-bold text-gray-800">🤝 **Networking**: Engage with students and other alumni to build a strong professional network.</li>
            <li className="font-bold text-gray-800">📚 **Resource Contribution**: Share valuable resources, such as lecture notes, career tips, and webinar access.</li>
            <li className="font-bold text-gray-800">🎓 **University Reviews**: Provide firsthand insights and reviews about your alma mater to assist prospective students in making informed decisions.</li>
            <li className="font-bold text-gray-800">🗣️ **Event Participation**: Participate in or host webinars, workshops, and talks that can benefit the student body.</li>
          </ul>
          <p>Alumni contributions help maintain a vibrant, supportive, and resourceful community at Unisala.</p>
        </div>
      </div>
    </div>
  );
  const StudentOrganizationBenefit = ({ isActive, onClick }) => (
    <div className="mb-4">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
          onClick={onClick}
        >
          <h5>How can a student organization benefit from Unisala?</h5>
          <i className={`absolute right-0 pt-1 text-xs fa ${isActive ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-screen' : 'h-0'}`}
      >
        <div className="p-4 text-sm leading-normal text-gray-600">
          <p>Student organizations can significantly enhance their influence and connectivity through Unisala. Here’s how they can harness the platform:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li className="font-bold text-gray-800">🤝 **Robust Alumni Networks**: Build a strong community by reconnecting with alumni, turning a small current membership into a thriving network of engaged former and current members.</li>
            <li className="font-bold text-gray-800">📣 **Event Promotion and Legacy Building**: Use Unisala to host and promote events and webinars, such as the recent computer science webinar by a Southeastern Louisiana University alumnus working at AT&T. This helps maintain a vibrant, active presence that appeals to both current members and alumni.</li>
            <li className="font-bold text-gray-800">🌐 **Global and Historical Reach**: Expand your reach by connecting with hundreds or thousands of past members worldwide, showcasing the organization’s broad impact and history.</li>
            <li className="font-bold text-gray-800">📚 **Resource and Knowledge Sharing**: Encourage a dynamic exchange of knowledge, with members and alumni contributing educational content, career tips, and more.</li>
            <li className="font-bold text-gray-800">🔧 **Enhanced Visibility**: Increase your visibility on Unisala to attract more members and showcase your network’s strength and achievements.</li>
          </ul>
          <p>With Unisala, your organization isn’t just a club; it’s a gateway to lifelong connections and professional opportunities, enriching your educational journey and beyond.</p>
        </div>
      </div>
    </div>
  );
  const PlatformCreators = ({ isActive, onClick }) => (
    <div className="mb-4">
      <h6 className="mb-0">
        <button
          className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
          onClick={onClick}
        >
          <h5>Who created the platform?</h5>
          <i className={`absolute right-0 pt-1 text-xs fa ${isActive ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
        </button>
      </h6>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-screen' : 'h-0'}`}
      >
        <div className="p-4 text-sm leading-normal text-gray-600">
          <p>The creators of Unisala were international students 🌍 who roamed the same halls as you might, studying in the U.S. at Southeastern Louisiana University 🎓. They faced the same exciting highs and daunting lows of studying abroad and wanted to make sure others like them had an easier time. So, they came together and built Unisala, not just as a tool but as a friend to guide future students through their journey, just like they wished they had when they started. 🚀</p>
        </div>
      </div>
    </div>
  );


// Rendering logic
return (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="my-8"
  >

    <WhatIsUnisala/>
    <WhoCanUseUnisala isActive={activeCollapse === 1} onClick={() => handleCollapse(1)} />
    <WhatsIncludedInPlatform isActive={activeCollapse === 2} onClick={() => handleCollapse(2)} />
    <CurrentStudentsBenefits isActive={activeCollapse === 3} onClick={() => handleCollapse(3)} />
    <AlumniContribution isActive={activeCollapse === 4} onClick={() => handleCollapse(4)} />
    <StudentOrganizationBenefit isActive={activeCollapse === 5} onClick={() => handleCollapse(5)} />
    <PlatformCreators isActive={activeCollapse === 6} onClick={() => handleCollapse(6)} />
  </motion.div>
);

};
