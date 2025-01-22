// import CreateSpace from "./createSpace/CreateSpace"
import React from 'react';
import { Content, Text, Button, Row } from '../components/defaults';

let NewPage = () => (
  <>
    <section className='bg-white dark:bg-gray-900 '>
    <div className='container flex items-center justify-center min-h-screen px-6 py-12 mx-auto'>
      <div className='w-full '>
        <div className='flex flex-col items-center max-w-lg mx-auto text-center'>
            <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
            </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
            We lost this page
          </h1>
          <p className='mt-4 text-gray-500 dark:text-gray-400'>
            We searched high and low, but couldn’t find what you’re looking
            for.Let’s find a better place for you to go.
          </p>

          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <Button onClick={(e) => window.history.back()}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>
              <span>Go back</span>
            </Button>

            <Button className='' routerLink='/home'>
              Take me home
            </Button>
          </div>
        </div>
      </div>
    </div>
    </section>

  </>

);
const OldPage = () => (
  <Content>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
      }}
    >
      <Text color='dark'>
        <h1
          style={{
            fontSize: '2.5rem'
          }}
        >
          Oops!
        </h1>
      </Text>
      <br />
      <Text color='dark'>
        <h6>{msg}</h6>
      </Text>
      <br />
      <Button routerLink='/home'>Go Home</Button>
    </div>
  </Content>
);
const PageNotFound = ({ msg }) => {
  return <NewPage />;
};

export const SpaceNotFound = () => {
  return (
    <Content color='light'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}
      >
        <Text>
          <h1 className='text-2xl font-semibold'>
            Oops! The space is not available
          </h1>
        </Text>

        <Text>
          <h5 className='text-lg font-medium'>But, you can make your own 😃</h5>
        </Text>

        <Row className='mt-4'>{/* <CreateSpace /> */}</Row>
      </div>
    </Content>
  );
};

export default PageNotFound;
