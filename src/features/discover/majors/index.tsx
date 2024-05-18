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

// MajorPage component
const MajorPage: React.FC = () => {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

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
  }, [selectedStates]);

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
  const Header3 = () => (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container px-6 py-10 mx-auto'>
        <h1 className='text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white'>
          From the blog
        </h1>

        <div className='mt-8 lg:-mx-6 lg:flex lg:items-center'>
          <img
            className='object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96'
            src='https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
            alt=''
          />

          <div className='mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 '>
            <p className='text-sm text-blue-500 uppercase'>category</p>

            <a
              href='#'
              className='block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white'
            >
              All the features you want to know
            </a>

            <p className='mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              veritatis sint autem nesciunt, laudantium quia tempore delect
            </p>

            <a
              href='#'
              className='inline-block mt-2 text-blue-500 underline hover:text-blue-400'
            >
              Read more
            </a>

            <div className='flex items-center mt-6'>
              <img
                className='object-cover object-center w-10 h-10 rounded-full'
                src='https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                alt=''
              />

              <div className='mx-4'>
                <h1 className='text-sm text-gray-700 dark:text-gray-200'>
                  Amelia. Anderson
                </h1>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Lead Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

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

  const Test2 = () => (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container flex flex-col items-center px-4 py-12 mx-auto xl:flex-row'>
        <div className='flex justify-center xl:w-1/2'>
          <img
            className='h-80 w-80 sm:w-[28rem] sm:h-[28rem] flex-shrink-0 object-cover rounded-full'
            src='https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
            alt=''
          />
        </div>

        <div className='flex flex-col items-center mt-6 xl:items-start xl:w-1/2 xl:mt-0'>
          <h2 className='text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
            Download our free mobile app
          </h2>

          <p className='block max-w-2xl mt-4 text-gray-500 dark:text-gray-300'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut
            corporis esse dolorum, illum, consectetur earum provident alias
            dolore omnis quis tempore voluptatum excepturi ea numquam? Aperiam
            fugiat consequuntur nostrum odio.{' '}
          </p>

          <div className='mt-6 sm:-mx-2'>
            <a
              href='#'
              className='inline-flex items-center justify-center w-full px-4 text-sm py-2.5 overflow-hidden text-white transition-colors duration-300 bg-gray-900 rounded-lg shadow sm:w-auto sm:mx-2 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80'
            >
              <svg
                className='w-5 h-5 mx-2 fill-current'
                xmlns:xlink='http://www.w3.org/1999/xlink'
                x='0px'
                y='0px'
                viewBox='0 0 512 512'
                xmlSpace='preserve'
              >
                <g>
                  <g>
                    <path d='M407,0H105C47.103,0,0,47.103,0,105v302c0,57.897,47.103,105,105,105h302c57.897,0,105-47.103,105-105V105C512,47.103,464.897,0,407,0z M482,407c0,41.355-33.645,75-75,75H105c-41.355,0-75-33.645-75-75V105c0-41.355,33.645-75,75-75h302c41.355,0,75,33.645,75,75V407z'></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d='M305.646,123.531c-1.729-6.45-5.865-11.842-11.648-15.18c-11.936-6.892-27.256-2.789-34.15,9.151L256,124.166l-3.848-6.665c-6.893-11.937-22.212-16.042-34.15-9.151h-0.001c-11.938,6.893-16.042,22.212-9.15,34.151l18.281,31.664L159.678,291H110.5c-13.785,0-25,11.215-25,25c0,13.785,11.215,25,25,25h189.86l-28.868-50h-54.079l85.735-148.498C306.487,136.719,307.375,129.981,305.646,123.531z'></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d='M401.5,291h-49.178l-55.907-96.834l-28.867,50l86.804,150.348c3.339,5.784,8.729,9.921,15.181,11.65c2.154,0.577,4.339,0.863,6.511,0.863c4.332,0,8.608-1.136,12.461-3.361c11.938-6.893,16.042-22.213,9.149-34.15L381.189,341H401.5c13.785,0,25-11.215,25-25C426.5,302.215,415.285,291,401.5,291z'></path>
                  </g>
                </g>
                <g>
                  <g>
                    <path d='M119.264,361l-4.917,8.516c-6.892,11.938-2.787,27.258,9.151,34.15c3.927,2.267,8.219,3.345,12.458,3.344c8.646,0,17.067-4.484,21.693-12.495L176.999,361H119.264z'></path>
                  </g>
                </g>
              </svg>

              <span className='mx-2'>Get it on the App Store</span>
            </a>

            <a
              href='#'
              className='inline-flex items-center justify-center w-full px-4 text-sm py-2.5 mt-4 overflow-hidden text-white transition-colors duration-300 bg-blue-600 rounded-lg shadow sm:w-auto sm:mx-2 sm:mt-0 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80'
            >
              <svg
                className='w-5 h-5 mx-2 fill-current'
                viewBox='-28 0 512 512.00075'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='m432.320312 215.121094-361.515624-208.722656c-14.777344-8.53125-32.421876-8.53125-47.203126 0-.121093.070312-.230468.148437-.351562.21875-.210938.125-.421875.253906-.628906.390624-14.175782 8.636719-22.621094 23.59375-22.621094 40.269532v417.445312c0 17.066406 8.824219 32.347656 23.601562 40.878906 7.390626 4.265626 15.496094 6.398438 23.601563 6.398438s16.214844-2.132812 23.601563-6.398438l361.519531-208.722656c14.777343-8.53125 23.601562-23.8125 23.601562-40.878906s-8.824219-32.347656-23.605469-40.878906zm-401.941406 253.152344c-.21875-1.097657-.351562-2.273438-.351562-3.550782v-417.445312c0-2.246094.378906-4.203125.984375-5.90625l204.324219 213.121094zm43.824219-425.242188 234.21875 135.226562-52.285156 54.539063zm-6.480469 429.679688 188.410156-196.527344 54.152344 56.484375zm349.585938-201.835938-80.25 46.332031-60.125-62.714843 58.261718-60.773438 82.113282 47.40625c7.75 4.476562 8.589844 11.894531 8.589844 14.875s-.839844 10.398438-8.589844 14.875zm0 0'></path>
              </svg>

              <span className='mx-2'>Get it on Google Play</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );

  const Header = () => (
    <section className='bg-white dark:bg-gray-900 mt-1'>
      <div className='container flex flex-col items-center px-4 py-12 mx-auto text-center'>
        <h2 className='max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white'>
          Bring your Business to the{' '}
          <span className='text-blue-500'>next level.</span>
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
                src='https://dummyimage.com/302x302'
              />
              <p className='leading-relaxed'>
                Edison bulb retro cloud bread echo park, helvetica stumptown
                taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee
                ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut
                adaptogen squid fanny pack vaporware.
              </p>
              <span className='inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4'></span>
              <h2 className='text-gray-900 font-medium title-font tracking-wider text-sm'>
                HOLDEN CAULFIELD
              </h2>
              <p className='text-gray-500'>Senior Product Designer</p>
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

  const Content1 = () => (
    <section className="text-gray-600 body-font">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      </div>
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">Shooting Stars</h2>
        <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
        <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
    <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">The Catalyzer</h2>
        <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
        <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <circle cx="6" cy="6" r="3"></circle>
          <circle cx="6" cy="18" r="3"></circle>
          <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
        </svg>
      </div>
    </div>
    <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
      <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="sm:w-16 sm:h-16 w-10 h-10" viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>
      <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-gray-900 text-lg title-font font-medium mb-2">The 400 Blows</h2>
        <p className="leading-relaxed text-base">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine.</p>
        <a className="mt-3 text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
    <button className="flex mx-auto mt-20 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>
  )
  const Content2 = () => (
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
  return (
    <>
      <Header />
      <Content2/>

      <Header3 />

      <Header2 />
      <TEST />
      <div className='p-4'>
        <div className='major-overview mb-6'>
          <h1 className='text-3xl font-bold mb-4'>Computer Science</h1>
          <p className='mb-4'>
            Computer Science is a dynamic field that focuses on the development
            of software and hardware systems. This major offers exciting career
            opportunities in various sectors including technology, finance,
            healthcare, and more.
          </p>
          <h2 className='text-2xl font-semibold mb-2'>Key Considerations</h2>
          <ul className='list-disc list-inside'>
            <li>Department Reputation and Research Opportunities</li>
            <li>Cost of Attendance (COA)</li>
            <li>Support for International Students</li>
          </ul>
        </div>

        <div className='filters mb-6'>
          <label htmlFor='state-filter' className='block mb-2'>
            State:
          </label>
          <select
            id='state-filter'
            multiple
            onChange={handleStateFilterChange}
            className='w-full p-2 border rounded mb-4'
          >
            {/* Add state options here */}
            <option value='CA'>California</option>
            <option value='TX'>Texas</option>
            <option value='NY'>New York</option>
            {/* More states */}
          </select>

          <label htmlFor='coa-filter' className='block mb-2'>
            Cost of Attendance:
          </label>
          <select id='coa-filter' className='w-full p-2 border rounded mb-4'>
            <option value='low-to-high'>Low to High</option>
            <option value='high-to-low'>High to Low</option>
          </select>

          <label htmlFor='rating-filter' className='block mb-2'>
            Department Rating:
          </label>
          <select id='rating-filter' className='w-full p-2 border rounded'>
            <option value='high-to-low'>High to Low</option>
            <option value='low-to-high'>Low to High</option>
          </select>
        </div>

        <div className='major-list'>
          <div className='major-row mb-4'>
            <h3 className='text-xl font-semibold mb-2'>
              Top Universities for Computer Science
            </h3>
            <div className='university-cards flex overflow-x-auto space-x-4'>
              {universities.map((university, index) => (
                <UniversityCard
                  key={index}
                  name={university.name}
                  rating={university.rating}
                  coa={university.coa}
                  internationalSupport={university.internationalSupport}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Content1 />


      <Testimonials />
      <Test2 />
    </>
  );
};

export default MajorPage;
