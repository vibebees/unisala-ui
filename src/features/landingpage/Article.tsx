import React from 'react';
export const Article = ({ imgsrc, tag, title, description }) => {
  return (
    <>
      <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full'>
        <div className='relative w-full m-0 overflow-hidden text-gray-700 bg-white rounded-xl bg-clip-border sm:flex sm:rounded-r-none'>
          <div className='w-full sm:w-3/5'>
            <img
              src={imgsrc}
              alt='Discover Universities on Unisala'
              className='object-cover w-full h-full max-h-64 sm:max-h-full' // Adjusted height for smaller screens
            />
          </div>
          <div className='p-6 sm:w-2/5'>
            <h6 className='block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase'>
              {tag}
            </h6>
            <h4 className='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900'>
              {title}
            </h4>
            <p className='block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700'>
              {description}
            </p>
            <a href='#' className='inline-block'>
              <button
                className='flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20'
                type='button'
              >
                Start Exploring
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  className='w-4 h-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                  ></path>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
