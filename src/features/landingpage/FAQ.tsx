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
  }







  // Add more FAQ entries here
];
/*

{
    question: 'How can current students benefit from Unisala?',
    answer: 'Current students can utilize Unisala to enhance their academic and social experiences. The platform offers access to study resources, the ability to join or create student groups, and opportunities for networking with peers and alumni globally. Additionally, students can participate in mentorship programs, collaborate on projects, and share their own experiences to assist fellow and future students.'
  },
  {
    question: 'Can current students participate in cultural events through Unisala?',
    answer: 'Yes, current students are encouraged to participate in and even organize cultural and social events through Unisala. The platform helps promote these events, making it easier to gather interest and facilitate participation from the student community.'
  },
  {
    question: 'How can alumni contribute to Unisala?',
    answer: 'Alumni can contribute by sharing their experiences and advice through the platform’s forums, participating in mentorship programs, and helping to create a supportive network for new students.'
  },
  {
    question: 'Is there a way for current students to track their academic progress on Unisala?',
    answer: 'Unisala offers tools for students to track their academic progress, including features that allow them to set educational goals, monitor achievements, and assess their performance over time. This helps students stay on track and make adjustments to their study plans as needed.'
  },
  {
    question: 'Who created the platform?',
    answer: 'Unisala was developed by a team of experienced educators and technology professionals with a deep understanding of the challenges faced by international students. The team is passionate about providing solutions that ease the educational and cultural transition for students studying abroad.'
  },
  {
    question: 'Is there a fee to use Unisala?',
    answer: 'Unisala offers both free and premium subscription options. The free version includes access to basic features, while the premium subscription offers enhanced tools and resources for a more comprehensive support system.'
  }

*/

// Rendering logic
return (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    className="my-8"
  >
    {faqData.map((item, index) => (
      <div key={index} className="mb-4">
        <h6 className="mb-0">
          <button
            className="relative flex items-center w-full p-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer border-slate-100 text-slate-700 rounded-t-lg group"
            onClick={() => handleCollapse(index)}
          >
            <h5>{item.question}</h5>
            <i className={`absolute right-0 pt-1 text-xs fa ${activeCollapse === index ? 'fa-minus' : 'fa-plus'} transition-opacity duration-300`}></i>
          </button>
        </h6>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${activeCollapse === index ? 'max-h-screen' : 'h-0'}`}
        >
          <div className="p-4 text-sm leading-normal text-gray-600">
            {item.answer.map((part, idx) =>
              Array.isArray(part) ? (
                <ul key={idx} className="list-disc pl-5 space-y-2">
                  {part.map((li, liIdx) => (
                    <li key={liIdx} className="font-bold text-gray-800"> {/* Tailwind classes for bold and darker text */}
                      {li}
                    </li>
                  ))}
                </ul>
              ) : (
                <p key={idx}>{part}</p>
              )
            )}
          </div>
        </div>
      </div>
    ))}
  </motion.div>
);

};
