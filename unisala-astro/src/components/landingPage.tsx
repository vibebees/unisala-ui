
import React, { useState, useEffect } from 'react';

// Define the interface for University props
interface University {
  name: string;
  rating: number;
  coa: string;
  internationalSupport: string;
}

// UniversityCard component
const UniversityCard: React.FC<University> = ({
  name,
  rating,
  coa,
  internationalSupport
}) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md min-w-[200px] mx-2'>
      <h3 className='text-lg font-semibold'>{name}</h3>
      <p className='text-sm'>Rating: {rating}</p>
      <p className='text-sm'>COA: {coa}</p>
      <p className='text-sm'>International Support: {internationalSupport}</p>
    </div>
  );
};

// Header component
const Header2: React.FC = () => (
  <section className='text-gray-600 body-font'>
    <div className='container px-5 py-24 mx-auto'>
      <div className='flex flex-col text-center w-full mb-20'>
        <h2 className='text-xs text-indigo-500 tracking-widest font-medium title-font mb-1'>
          EDUCATION
        </h2>
        <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
          Top Favorable Universities for Computer Science
        </h1>
        <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
          Discover the best universities for Computer Science in the USA. Learn
          about their programs, costs, and support for international students to
          make an informed decision about where to apply.
        </p>
      </div>
      <div className='flex flex-wrap'>
        <div className='xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60'>
          <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>
            MIT
          </h2>
          <p className='leading-relaxed text-base mb-4'>
            MIT is renowned for its cutting-edge research and outstanding
            Computer Science programs.
          </p>
          <a className='text-indigo-500 inline-flex items-center'>
            Learn More
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-2'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
        <div className='xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60'>
          <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>
            Stanford
          </h2>
          <p className='leading-relaxed text-base mb-4'>
            Stanford University offers a top-tier Computer Science program with
            numerous research opportunities.
          </p>
          <a className='text-indigo-500 inline-flex items-center'>
            Learn More
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-2'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
        <div className='xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60'>
          <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>
            UC Berkeley
          </h2>
          <p className='leading-relaxed text-base mb-4'>
            UC Berkeley's Computer Science program is highly ranked and known
            for its strong emphasis on innovation.
          </p>
          <a className='text-indigo-500 inline-flex items-center'>
            Learn More
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-2'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
        <div className='xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60'>
          <h2 className='text-lg sm:text-xl text-gray-900 font-medium title-font mb-2'>
            Carnegie Mellon
          </h2>
          <p className='leading-relaxed text-base mb-4'>
            Carnegie Mellon University is well-known for its rigorous Computer
            Science curriculum and research facilities.
          </p>
          <a className='text-indigo-500 inline-flex items-center'>
            Learn More
            <svg
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              className='w-4 h-4 ml-2'
              viewBox='0 0 24 24'
            >
              <path d='M5 12h14M12 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
      </div>
      <button className='flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
        Explore All Universities
      </button>
    </div>
  </section>
);

const computerScienceData = {
  title: "Explore Computer Science",
  description: "Dive into the world of Computer Science and discover the limitless opportunities it offers. Learn about cutting-edge technologies and innovative solutions.",
  buttonLabel: "Intrested",
  imageUrl: "https://merakiui.com/images/full-logo.svg",
  logoUrl: "https://merakiui.com/images/components/Catalogue-pana.svg"
};

const csJobs = {
  "Software Development": [
    {
      "title": "Software Developer",
      "description": "Develop applications and software solutions.",
      "salary": "$70,000 - $110,000"
    },
    {
      "title": "Web Developer",
      "description": "Design and create websites.",
      "salary": "$50,000 - $85,000"
    },
    {
      "title": "Mobile App Developer",
      "description": "Develop applications for mobile devices.",
      "salary": "$70,000 - $115,000"
    },
    {
      "title": "Frontend Developer",
      "description": "Build the user interface and client-side of web applications.",
      "salary": "$60,000 - $90,000"
    },
    {
      "title": "Backend Developer",
      "description": "Focus on server-side web application logic and integration.",
      "salary": "$70,000 - $120,000"
    },
    {
      "title": "Full Stack Developer",
      "description": "Work on both the frontend and backend parts of applications.",
      "salary": "$75,000 - $120,000"
    },
    {
      "title": "DevOps Engineer",
      "description": "Manage server deployments and scalability issues.",
      "salary": "$95,000 - $140,000"
    },
    {
      "title": "Software Architect",
      "description": "Create high-level software design and architecture.",
      "salary": "$100,000 - $150,000"
    },
    {
      "title": "QA Engineer",
      "description": "Ensure software functionality through testing.",
      "salary": "$55,000 - $90,000"
    }
  ],
  "Data Science": [
    {
      "title": "Data Scientist",
      "description": "Analyze complex data to help inform business decisions.",
      "salary": "$85,000 - $120,000"
    },
    {
      "title": "Machine Learning Engineer",
      "description": "Design and develop AI algorithms and machine learning systems.",
      "salary": "$80,000 - $130,000"
    },
    {
      "title": "Data Analyst",
      "description": "Interpret data and turn it into information.",
      "salary": "$60,000 - $90,000"
    },
    {
      "title": "Data Engineer",
      "description": "Develop, construct, test, and maintain architectures.",
      "salary": "$90,000 - $130,000"
    },
    {
      "title": "Business Intelligence Analyst",
      "description": "Use data to help companies make better business decisions.",
      "salary": "$70,000 - $115,000"
    }
  ],
  "Networking": [
    {
      "title": "Network Administrator",
      "description": "Manage networks to ensure they run efficiently.",
      "salary": "$55,000 - $85,000"
    },
    {
      "title": "Systems Analyst",
      "description": "Analyze and improve computer systems for companies.",
      "salary": "$60,000 - $90,000"
    },
    {
      "title": "Network Engineer",
      "description": "Design and implement computer networks.",
      "salary": "$70,000 - $105,000"
    },
    {
      "title": "Network Security Engineer",
      "description": "Protect networks from threats and breaches.",
      "salary": "$80,000 - $120,000"
    }
  ],
  "Security": [
    {
      "title": "Information Security Analyst",
      "description": "Protect organizations from cyber attacks.",
      "salary": "$75,000 - $110,000"
    },
    {
      "title": "Cybersecurity Specialist",
      "description": "Monitor, detect, investigate, analyze, and respond to security events.",
      "salary": "$85,000 - $130,000"
    },
    {
      "title": "Penetration Tester",
      "description": "Simulate attacks to identify security weaknesses.",
      "salary": "$80,000 - $120,000"
    }
  ],
  "Database Management": [
    {
      "title": "Database Administrator",
      "description": "Manage databases to store and retrieve company data effectively.",
      "salary": "$70,000 - $95,000"
    },
    {
      "title": "Database Developer",
      "description": "Design and implement database solutions.",
      "salary": "$75,000 - $110,000"
    }
  ],
  "Cloud Computing": [
    {
      "title": "Cloud Solutions Architect",
      "description": "Design cloud-based solutions and architecture.",
      "salary": "$100,000 - $150,000"
    },
    {
      "title": "Cloud Engineer",
      "description": "Implement, maintain, and support cloud infrastructure.",
      "salary": "$85,000 - $125,000"
    }
  ],
  "UX/UI Design": [
    {
      "title": "UX/UI Designer",
      "description": "Design user interfaces and experiences.",
      "salary": "$65,000 - $100,000"
    },
    {
      "title": "Interaction Designer",
      "description": "Focus on creating engaging web interfaces with logical and thought out behaviors.",
      "salary": "$70,000 - $100,000"
    }
  ]
}


// MajorPage component
const MajorPage: React.FC = ({  }) => {
  const [ universities, setUniversities ] = useState<University[]>([]);
  const [ selectedStates, setSelectedStates ] = useState<string[]>([]);

  const { title, description, buttonLabel, imageUrl, logoUrl } = computerScienceData;

  const majorName = "params.slug";
  const urlFriendlyMajor = majorName.replace('-', ' ').toLowerCase(); // "computer-science"

  // Fetch universities data from the API
  useEffect(() => {
    // Replace with your API endpoint
    fetch(
      `/api/universities?major=Computer Science&states=${selectedStates.join(
        ','
      )}`
    )
      .then((response) => response.json())
      .then((data) => setUniversities(data));
  }, [ selectedStates ]);

  // Handle state filter change
  const handleStateFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const options = Array.from(event.target.options);
    const selectedValues = options
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedStates(selectedValues);
  };


  const TEST = () => (
    <section className='bg-white dark:bg-gray-900 my-50 mx-100'>
      <div className='container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
          From the blog
        </h1>

        <div className='grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2'>
          <div className='lg:flex'>
           <img
              className='object-cover w-full h-56 rounded-lg lg:w-64'
              src='https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
              width={256}
              height={224}
              layout='responsive'
            />

            <div className='flex flex-col justify-between py-6 lg:mx-6'>
              <a
                href='#'
                className='text-xl font-semibold text-gray-800 hover:underline dark:text-white '
              >
                How to use sticky note for problem solving
              </a>

              <span className='text-sm text-gray-500 dark:text-gray-300'>
                On: 20 October 2019
              </span>
            </div>
          </div>

          <div className='lg:flex'>
           <img
              className='object-cover w-full h-56 rounded-lg lg:w-64'
              src='https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
              width={256}
              height={224}
              layout='responsive'
            />

            <div className='flex flex-col justify-between py-6 lg:mx-6'>
              <a
                href='#'
                className='text-xl font-semibold text-gray-800 hover:underline dark:text-white '
              >
                How to use sticky note for problem solving
              </a>

              <span className='text-sm text-gray-500 dark:text-gray-300'>
                On: 20 October 2019
              </span>
            </div>
          </div>

          <div className='lg:flex'>
           <img
              className='object-cover w-full h-56 rounded-lg lg:w-64'
              src='https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
              width={736}
              height={480}
            />

            <div className='flex flex-col justify-between py-6 lg:mx-6'>
              <a
                href='#'
                className='text-xl font-semibold text-gray-800 hover:underline dark:text-white '
              >
                Morning routine to boost your mood
              </a>

              <span className='text-sm text-gray-500 dark:text-gray-300'>
                On: 25 November 2020
              </span>
            </div>
          </div>

          <div className='lg:flex'>
           <img
              className='object-cover w-full h-56 rounded-lg lg:w-64'
              src='https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80'
              alt=''
              width={736}
              height={480}
            />

            <div className='flex flex-col justify-between py-6 lg:mx-6'>
              <a
                href='#'
                className='text-xl font-semibold text-gray-800 hover:underline dark:text-white '
              >
                All the features you want to know
              </a>

              <span className='text-sm text-gray-500 dark:text-gray-300'>
                On: 30 September 2020
              </span>
            </div>
          </div>

          <div className='lg:flex'>
           <img
              className='object-cover w-full h-56 rounded-lg lg:w-64'
              src='https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80'
              alt=''
              width={736}
              height={480}
            />

            <div className='flex flex-col justify-between py-6 lg:mx-6'>
              <a
                href='#'
                className='text-xl font-semibold text-gray-800 hover:underline dark:text-white '
              >
                Minimal workspace for your inspirations
              </a>

              <span className='text-sm text-gray-500 dark:text-gray-300'>
                On: 13 October 2019
              </span>
            </div>
          </div>

          <div className='lg:flex'>
           <img
              className='object-cover w-full h-56 rounded-lg lg:w-64'
              src='https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
              alt=''
              width={736}
              height={480}
            />

            <div className='flex flex-col justify-between py-6 lg:mx-6'>
              <a
                href='#'
                className='text-xl font-semibold text-gray-800 hover:underline dark:text-white '
              >
                What do you want to know about Blockchane
              </a>

              <span className='text-sm text-gray-500 dark:text-gray-300'>
                On: 20 October 2019
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => {
    let footer = {
      title: "Join Unisala.com Today!",
      description: "Explore a global platform dedicated to helping students navigate their university journey. Connect with alumni, discover extensive resources, and tailor your educational path with Unisala.com.",
      buttons: [
        {
          text: "Sign Up for Free",
          link: "/signup",
          bgColor: "bg-gray-900",
          hoverColor: "hover:bg-gray-700"
        },
      ]
    }
    return ((
      <section className='bg-white dark:bg-gray-900'>
        <div className='container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row'>
          <div className='flex justify-center xl:w-1/2'>
           <img
              className='h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full'
              src='https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
              alt='Unisala.com - Connecting Students Worldwide'
              width={736}
              height={480}
            />
          </div>

          <div className='flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0'>
            <h2 className='text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
              {footer.title}
            </h2>

            <p className='block max-w-2xl mt-4 text-gray-500 dark:text-gray-300'>
              {footer.description}
            </p>

            <div className='mt-6 sm:-mx-2'>
              <a
                href='/signup'
                className='inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80'
              >
                <svg className='w-5 h-5 mx-2 fill-current' viewBox='0 0 512 512'>
                  {/* SVG icon for a university cap */}
                </svg>
                <span className='mx-2'>Sign Up for Free</span>
              </a>

              <a
                href='/learn-more'
                className='inline-flex items-center justify-center w-full px-4 text-sm py-2.5 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80'
              >
                <svg className='w-5 h-5 mx-2 fill-current' viewBox='0 0 512 512'>
                  {/* SVG icon for information */}
                </svg>
                <span className='mx-2'>Learn More</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    ))
  }


  const Header = () => (
    <section className='bg-white dark:bg-gray-900 mt-1'>
      <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
        <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>

          <span className='text-blue-500'> {urlFriendlyMajor}</span>
        </h2>

        <p className='max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum quidem
          officiis reprehenderit, aperiam veritatis non, quod veniam fuga
          possimus hic explicabo laboriosam nam. A tempore totam ipsa nemo
          adipisci iusto!
        </p>

        <div className='inline-flex w-full mt-6 sm:w-auto'>
          <a
            href='#'
            className='inline-flex items-center justify-center w-full px-6 py-2 text-white duration-300 bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80'
          >
            Sign Up
          </a>
        </div>
      </div>
    </section>
  );
  const Testimonials = () => (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          <div className='lg:w-1/3 lg:mb-0 mb-6 p-4'>
            <div className='h-full text-center'>
             <img
                alt='testimonial'
                className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
                src='https://dummyimage.com/300x300'
                width={736}
                height={480}
              />
              <p className='leading-relaxed'>
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className='inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4'></span>
              <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm'>
                ALPER KAMU
              </h2>
              <p className='text-gray-500'>UI Develeoper</p>
            </div>
          </div>
          <div className='lg:w-1/3 lg:mb-0 mb-6 p-4'>
            <div className='h-full text-center'>
             <img
                alt='testimonial'
                className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
                src='https://dummyimage.com/300x300'
              />
              <p className='leading-relaxed'>
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className='inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4'></span>
              <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm'>
                ALPER KAMU
              </h2>
              <p className='text-gray-500'>UI Develeoper</p>
            </div>
          </div>
          <div className='lg:w-1/3 lg:mb-0 p-4'>
            <div className='h-full text-center'>
             <img
                alt='testimonial'
                className='w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100'
                src='https://dummyimage.com/305x305'
                width={736}
                height={480}
              />
              <p className='leading-relaxed'>
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className='inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4'></span>
              <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm'>
                HENRY LETHAM
              </h2>
              <p className='text-gray-500'>CTO</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const WhoCanStudy = () => {
    let data = [
      {
        "iconPath": "M12 2C8.134 2 5 5.134 5 9c0 6 7 13 7 13s7-7 7-13c0-3.866-3.134-7-7-7z",
        "title": "Who Can Study Computer Science?",
        "description": "Anyone with a passion for technology and problem-solving. Typically, a background in mathematics or science is recommended.",
        "linkText": "Eligibility Details"
      },
      {
        "iconPath": "M12 5v14M5 12h14",
        "title": "Admission Requirements",
        "description": "Requirements vary by university but generally include standardized test scores (GRE, SAT), letters of recommendation, and a strong academic record.",
        "linkText": "Learn More About Admission"
      },
      {
        "iconPath": "M17 1l-1.5 5h5L15 10l1.5 5L10 10l-6.5 5L5 10 1 6h5L3 1l6.5 5L17 1z",
        "title": "Studying in the USA",
        "description": "The USA offers cutting-edge technology and research opportunities in CS, with access to industry connections and potential for innovation.",
        "linkText": "Why Study in the USA?"
      },
      {
        "iconPath": "M5 12l7 7 7-7",
        "title": "Career Opportunities",
        "description": "Graduates can pursue careers in software engineering, cybersecurity, artificial intelligence, and more.",
        "linkText": "Explore Careers"
      }
    ]

    return(
      <section className="text-gray-600 body-font">
    <div className="container px-5 py-24 mx-auto">
          {data?.map(({title, description}) => (
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
          <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div className="flex-grow text-left text-center mt-6 sm:mt-0">
                <h2 className="text-gray-900 text-lg title-font">{title}</h2>
                <p className="leading-relaxed text-base">{ description}</p>

          </div>
        </div>
       ))}
    </div>
  </section>
    )
  }
  const Content23 = () => (
    <section className="text-gray-600 body-font bg-white border">
  <div className="container px-5 py-24 mx-auto">
    <div className="text-center mb-20">
      <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Raw Denim Heirloom Man Braid</h1>
      <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
    </div>
    <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Authentic Cliche Forage</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Kinfolk Chips Snackwave</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Coloring Book Ethical</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Typewriter Polaroid Cray</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">Pack Truffaut Blue</span>
        </div>
      </div>
      <div className="p-2 sm:w-1/2 w-full">
        <div className="bg-gray-100 rounded flex p-4 h-full items-center">
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
            <path d="M22 4L12 14.01l-3-3"></path>
          </svg>
          <span className="title-font font-medium">The Catcher In The Rye</span>
        </div>
      </div>
    </div>
    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>
  )
const CSJobs = () => {
  const csCategories = {
    "Software Development": [
      {
        "title": "Software Developer",
        "description": "Develop applications and software solutions.",
        "salary": "$70,000 - $110,000"
      },
      {
        "title": "Web Developer",
        "description": "Design and create websites.",
        "salary": "$50,000 - $85,000"
      },
      {
        "title": "Mobile App Developer",
        "description": "Develop applications for mobile devices.",
        "salary": "$70,000 - $115,000"
      },
      {
        "title": "Frontend Developer",
        "description": "Build the user interface and client-side of web applications.",
        "salary": "$60,000 - $90,000"
      },
      {
        "title": "Backend Developer",
        "description": "Focus on server-side web application logic and integration.",
        "salary": "$70,000 - $120,000"
      },
      {
        "title": "Full Stack Developer",
        "description": "Work on both the frontend and backend parts of applications.",
        "salary": "$75,000 - $120,000"
      },
      {
        "title": "DevOps Engineer",
        "description": "Manage server deployments and scalability issues.",
        "salary": "$95,000 - $140,000"
      },
      {
        "title": "Software Architect",
        "description": "Create high-level software design and architecture.",
        "salary": "$100,000 - $150,000"
      },
      {
        "title": "QA Engineer",
        "description": "Ensure software functionality through testing.",
        "salary": "$55,000 - $90,000"
      }
    ],
    "Data Science": [
      {
        "title": "Data Scientist",
        "description": "Analyze complex data to help inform business decisions.",
        "salary": "$85,000 - $120,000"
      },
      {
        "title": "Machine Learning Engineer",
        "description": "Design and develop AI algorithms and machine learning systems.",
        "salary": "$80,000 - $130,000"
      },
      {
        "title": "Data Analyst",
        "description": "Interpret data and turn it into information.",
        "salary": "$60,000 - $90,000"
      },
      {
        "title": "Data Engineer",
        "description": "Develop, construct, test, and maintain architectures.",
        "salary": "$90,000 - $130,000"
      },
      {
        "title": "Business Intelligence Analyst",
        "description": "Use data to help companies make better business decisions.",
        "salary": "$70,000 - $115,000"
      }
    ],
    "Networking": [
      {
        "title": "Network Administrator",
        "description": "Manage networks to ensure they run efficiently.",
        "salary": "$55,000 - $85,000"
      },
      {
        "title": "Systems Analyst",
        "description": "Analyze and improve computer systems for companies.",
        "salary": "$60,000 - $90,000"
      },
      {
        "title": "Network Engineer",
        "description": "Design and implement computer networks.",
        "salary": "$70,000 - $105,000"
      },
      {
        "title": "Network Security Engineer",
        "description": "Protect networks from threats and breaches.",
        "salary": "$80,000 - $120,000"
      }
    ],
    "Security": [
      {
        "title": "Information Security Analyst",
        "description": "Protect organizations from cyber attacks.",
        "salary": "$75,000 - $110,000"
      },
      {
        "title": "Cybersecurity Specialist",
        "description": "Monitor, detect, investigate, analyze, and respond to security events.",
        "salary": "$85,000 - $130,000"
      },
      {
        "title": "Penetration Tester",
        "description": "Simulate attacks to identify security weaknesses.",
        "salary": "$80,000 - $120,000"
      }
    ],
    "Database Management": [
      {
        "title": "Database Administrator",
        "description": "Manage databases to store and retrieve company data effectively.",
        "salary": "$70,000 - $95,000"
      },
      {
        "title": "Database Developer",
        "description": "Design and implement database solutions.",
        "salary": "$75,000 - $110,000"
      }
    ],
    "Cloud Computing": [
      {
        "title": "Cloud Solutions Architect",
        "description": "Design cloud-based solutions and architecture.",
        "salary": "$100,000 - $150,000"
      },
      {
        "title": "Cloud Engineer",
        "description": "Implement, maintain, and support cloud infrastructure.",
        "salary": "$85,000 - $125,000"
      }
    ],
    "UX/UI Design": [
      {
        "title": "UX/UI Designer",
        "description": "Design user interfaces and experiences.",
        "salary": "$65,000 - $100,000"
      },
      {
        "title": "Interaction Designer",
        "description": "Focus on creating engaging web interfaces with logical and thought out behaviors.",
        "salary": "$70,000 - $100,000"
      }
    ]
  }


  return (
    <section className="text-gray-600 body-font bg-white border">
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Careers in Computer Science</h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Explore a range of dynamic and exciting career opportunities in the field of Computer Science, from software development to data analysis.</p>
        </div>
        <div className="flex flex-wrap -m-4">
          {Object.keys(csCategories).map((category) => (
            <div className="p-4 lg:w-1/3 md:w-1/2 w-full">
              <div className="border-2 border-gray-200 p-6 rounded-lg">
                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">{category}</h2>
                {csCategories[category].map((job, index) => (
                  <div key={index} className="p-2">
                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <div>
                        <span className="title-font font-medium">{job.title}</span>
                        <p className="text-gray-500">{job.description}</p>
                        <p className="text-gray-700">{job.salary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Explore More</button>
      </div>
    </section>
  );
};


const FAQSection = () => {
  let faqData = {
    "faqTitle": "Introduction to Computer Science",
    "faqs": [
      {
        "question": "What is Computer Science?",
        "icon": "minus",
        "response": "At its core, Computer Science is the study of computers and computational systems. Unlike electrical and computer engineers, computer scientists deal mostly with software and software systems; this includes their theory, design, development, and application."
      },
      {
        "question": "What areas can I study in Computer Science?",
        "icon": "minus",
        "response": "Computer Science encompasses a variety of topics that relate to computation, from abstract analysis of algorithms and formal grammars to subjects like programming languages, software, and hardware."
      },
      {
        "question": "Why is programming important?",
        "icon": "plus",
        "response": "Programming is a fundamental skill in Computer Science. It involves creating a set of instructions to tell a computer how to perform a task. It can be used to develop software, solve mathematical problems, or even control robots."
      },
      {
        "question": "Why should I study Computer Science?",
        "icon": "plus",
        "response": "Studying Computer Science helps in developing problem-solving skills, fosters creativity and innovation, and opens a wide range of career opportunities in fields like software development, data science, and systems analysis."
      },
      {
        "question": "What cutting-edge technologies will I learn about?",
        "icon": "plus",
        "response": "You will encounter technologies such as artificial intelligence (AI), machine learning, robotics, and virtual reality. These are shaping the future and offer exciting opportunities for prepared individuals."
      },
      {
        "question": "How can I get started with Computer Science?",
        "icon": "plus",
        "response": "Start by taking introductory courses at youtube, udemy, participate in coding clubs or camps, and try online courses. Tools like Scratch or Python are excellent for beginners."
      },
      {
        "question": "What can I expect from a career in Computer Science?",
        "icon": "plus",
        "response": "A career in Computer Science is dynamic and fulfilling, offering the chance to work on meaningful projects that can have a significant impact on society and the digital world."
      }
    ]
  }

  const [isOpen, setIsOpen] = useState(Array(faqData.faqs.length).fill(false));

  // Function to toggle FAQ item
  const toggleFAQ = index => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-12 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
          {faqData.faqTitle}
        </h1>

        <div className="mt-8 space-y-8 lg:mt-12">
          {faqData.faqs.map((faq, index) => (
            <div key={index} className="p-8 bg-gray-100 rounded-lg dark:bg-gray-800">
              <button className="flex items-center justify-between w-full" onClick={() => toggleFAQ(index)}>
                <h1 className="font-semibold text-gray-700 dark:text-white">
                  {faq.question}
                </h1>

                <span className="rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen[index] ? 'M18 12H6' : 'M12 6v6m0 0v6m0-6h6m-6 0H6'} />
                  </svg>
                </span>
              </button>
              {isOpen[index] && (
                <p className="mt-6 text-sm text-gray-500 dark:text-gray-300">
                  {faq.response}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};










  const Jobs = () => {
    const csJobs = [
      { title: "Software Developer", description: "Develop applications and software solutions." },
      { title: "Systems Analyst", description: "Analyze and improve computer systems for companies." },
      { title: "Web Developer", description: "Design and create websites." },
      { title: "Database Administrator", description: "Manage databases to store and retrieve company data effectively." },
      { title: "Information Security Analyst", description: "Protect organizations from cyber attacks." },
      { title: "Machine Learning Engineer", description: "Design and develop AI algorithms and machine learning systems." },
      { title: "Data Scientist", description: "Analyze complex data to help inform business decisions." },
      { title: "Network Administrator", description: "Manage networks to ensure they run efficiently." },
      { title: "UX/UI Designer", description: "Design user interfaces and experiences." },
      { title: "Cloud Solutions Architect", description: "Design cloud-based solutions and architecture." }
    ];

    return (
      <section className="text-gray-600 body-font bg-white border">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Careers </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Explore a range of dynamic and exciting career opportunities in the field of Computer Science, from software development to data analysis.</p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {csJobs.map((job, index) => (
              <div key={index} className="p-2 sm:w-1/2 w-full">
                <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                  <span className="title-font font-medium">{job.title}</span>
                  {/* <p className="ml-4">{job.description}</p> */}
                </div>
              </div>
            ))}
          </div>
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Explore More</button>
        </div>
      </section>
    );
  }
  const HeaderTest3 = () => (
    <div>
      <div className="relative bg-white dark:bg-gray-900">
        <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <a href="/">
             <img className="w-auto h-6 sm:h-7" src="https://merakiui.com/images/full-logo.svg" alt="Meraki UI Logo" width={100} height={100}/>
            </a>
          </div>
        </div>
      </div>

      <div className="container px-6 py-16 mx-auto">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Best place to choose <br/> your <span className="text-blue-500">clothes</span></h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro beatae error laborum ab amet sunt recusandae? Reiciendis natus perspiciatis optio.</p>
              <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Shop Now</button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
           <img className="w-full h-full lg:max-w-3xl" src="https://merakiui.com/images/components/Catalogue-pana.svg" alt="Catalogue Display" width={100} height={100}/>
          </div>
        </div>
      </div>
    </div>
  );

  const HeaderTest13 = () => {
    const { title, description, buttonLabel, imageUrl, logoUrl } = computerScienceData;

    return (
      <div>
        <div className="relative bg-white dark:bg-gray-900">
          <div className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
            <div className="flex items-center justify-between">
              <a href="/">
               <img
                  className="w-auto h-6 sm:h-7"
                  src={imageUrl}
                  alt="Computer Science Logo"
                  width={100}
                  height={100}
                />
              </a>
            </div>
          </div>
        </div>

        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  {title}
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  {description}
                </p>
                <button className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  {buttonLabel}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
             <img
                className="w-full h-full lg:max-w-3xl"
                src={logoUrl}
                alt="Computer Science Illustration"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const CategoryJobs = ({ category }) => {
    const jobs = csJobs[category];

    return (
      <section className="text-gray-600 body-font bg-white border w-full" >
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Careers in {category}</h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">Explore a range of dynamic and exciting career opportunities in {category}.</p>
          </div>
          <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            {jobs.map((job, index) => (

              <div key={index} className="p-2 sm:w-1/3 w-full">

             <div key={index} className="p-2">
                    <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <path d="M22 4L12 14.01l-3-3"></path>
                      </svg>
                      <div>
                        <span className="title-font font-medium">{job.title}</span>
                        {/* <p className="text-gray-500 text-sm">{job.description}</p> */}
                        <p className="text-gray-700 text-xs">{job.salary}</p>
                      </div>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }





const CustomerSection = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      // Dummy data for jobs
      const csJobs = [
          { company: "Google", role: "Software Developer", about: "Develop cutting-edge applications.", status: "Hiring", licenseUse: "N/A", users: "Global" },
          { company: "Amazon", role: "Data Scientist", about: "Analyze large datasets to improve services.", status: "Hiring", licenseUse: "N/A", users: "Global" },
          { company: "Facebook", role: "Network Engineer", about: "Maintain and improve network infrastructure.", status: "Hiring", licenseUse: "N/A", users: "Global" },
          { company: "Apple", role: "Machine Learning Engineer", about: "Create predictive models for product features.", status: "Hiring", licenseUse: "N/A", users: "Global" },
          { company: "Microsoft", role: "Cloud Solutions Architect", about: "Design cloud infrastructure solutions.", status: "Hiring", licenseUse: "N/A", users: "Global" }
      ];
      setJobs(csJobs);
  }, []);

  const handleSearch = (event) => {
      setSearchTerm(event.target.value);
  };

  const filteredJobs = jobs.filter(job =>
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <section className="container px-4 mx-auto">
          <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                  <div className="flex items-center gap-x-3">
                      <h2 className="text-lg font-medium text-gray-800 dark:text-white">Customers</h2>
                      <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">240 vendors</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">These companies have purchased in the last 12 months.</p>
              </div>

              <div className="flex items-center mt-4 gap-x-3">
                  <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 dark:border-gray-700">
                      <span>Import</span>
                  </button>

                  <button className="flex items-center justify-center px-5 py-2 text-sm text-white transition-colors duration-200 bg-blue-500 rounded-lg gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
                      <span>Add vendor</span>
                  </button>
              </div>
          </div>

          <div className="mt-6 md:flex md:items-center md:justify-between">
              <div className="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
                  <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
                      View all
                  </button>
                  <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                      Monitored
                  </button>
                  <button className="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
                      Unmonitored
                  </button>
              </div>

              <div className="relative flex items-center mt-4 md:mt-0">
                  <input type="text" placeholder="Search jobs" value={searchTerm} onChange={handleSearch} className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
          </div>

          <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                  <tr>
                                      <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Company</th>
                                      <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Role</th>
                                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">About</th>
                                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Users</th>
                                      <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">License use</th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                  {filteredJobs.map((job, index) => (
                                      <tr key={index}>
                                          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">{job.company}</td>
                                          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">{job.role}</td>
                                          <td className="px-4 py-4 text-sm whitespace-nowrap">{job.about}</td>
                                          <td className="px-4 py-4 text-sm whitespace-nowrap">{job.status}</td>
                                          <td className="px-4 py-4 text-sm whitespace-nowrap">{job.users}</td>
                                          <td className="px-4 py-4 text-sm whitespace-nowrap">{job.licenseUse}</td>
                                      </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
};

const JobsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Flattened jobs data for easier search and display


  const allJobs = Object.values(csJobs).flat();

  const filteredJobs = allJobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <section className="container px-4 mx-auto">
          <div className="relative flex items-center my-4">
              <input
                  type="text"
                  placeholder="Search jobs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
          </div>
          <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                      <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job Title
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Salary
                          </th>
                      </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                      {filteredJobs.map((job, idx) => (
                          <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {job.title}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {job.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {job.salary}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </section>
  );
};

  return (
    <>
      <HeaderTest13 />
      <FAQSection />

     <main className="flex min-h-screen flex-col items-center justify-between">

        <Jobs />

        {/* <JobsTable/> */}
        {/* {Object.keys(csJobs).map((category, index) => (
        <CategoryJobs key={index} category={category} />
      ))} */}
      {/* <CSJobs/> */}
        <CustomerSection />
        <WhoCanStudy />

      <Header2 />
      <TEST />



      <Testimonials />
      <Footer />
      </main>
    </>
  );
};

export default MajorPage;
