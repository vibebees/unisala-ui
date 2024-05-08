import React, { FC } from 'react';

import {
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonText
} from '@ionic/react';
import ImageWithLoader from '../reusable/Image/ImageWithLoader';
import { Card, Col, Grid, Row } from '../../defaults';
import { location, schoolOutline } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { defaultUniImages } from './default.images';
import { MoneyIcon } from '../icons/money';
import { CheckIcon } from '../icons/check';
import { SadIcon, SimleyIcon } from '../icons/face';

interface IUniversityProps {
  post: IPost;
}
const colors = [
  'bg-red-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-yellow-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-orange-500'
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};
export const University: FC<IUniversityProps> = ({ post }) => {
  const { elevatorInfo } = post;
  const {pictures} = elevatorInfo;
  const { studentCharges } = post;
  const formattedAddress = `${elevatorInfo.address.city}, ${elevatorInfo.address.stateAbbreviation}, ${elevatorInfo.address.streetAddressOrPOBox}`;
  const universityInfo = {
    name: elevatorInfo.name,
    address: formattedAddress,
    ownType: elevatorInfo.ownType,
    tags: elevatorInfo?.tags?.join(', '),
    fees: [
      {
        label: 'Graduate Application Fee',
        value: studentCharges?.graduateApplicationFee ?? 'N/A',
        color: 'text-red-600'
      },
      {
        label: 'Undergraduate Application Fee',
        value: studentCharges?.undergraduateApplicationFee ?? 'N/A',
        color: 'text-blue-600'
      }
    ],
    tuition: [
      {
        label: 'Graduate In State Tuition',
        value: studentCharges?.graduate?.inState?.tuition ?? 'N/A',
        color: 'text-green-600'
      },
      {
        label: 'Undergraduate In State Tuition',
        value: studentCharges?.undergraduate?.inState?.tuition ?? 'N/A',
        color: 'text-yellow-500'
      }
    ]
  };
  const history = useHistory()

  return (
    <>
      <div className='relative flex flex-col bg-white bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem]' >
        <div className='flex gap-2'>
          <div className='relative grid select-none items-center whitespace-nowrap rounded-lg bg-green-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white'>
            <span className=''>Suggested University</span>
          </div>
        </div>

        <div className='relative w-full m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0'>
         {pictures?.length > 0 && <img
            src={pictures[0]}
            alt='card-image'
            className='object-cover w-full h-full'
            onClick={() => history.push('/university/' + elevatorInfo.name)}
            />}
        </div>

        <div className='p-6'
          onClick={() => history.push('/university/' + elevatorInfo.name)}
        >
          <div className='flex items-center justify-between mb-3'>
            <h4 className='block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900'>
              {elevatorInfo.name}
            </h4>
          </div>

          <p className='text-xs antialiased font-light leading-relaxed text-gray-700'>
            {formattedAddress}
          </p>
          <div className='flex gap-2 mt-5'>
            {elevatorInfo?.tags?.map((tag, index) => (
              // add random color tags
              <div
                key={index}
                className={`relative grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 font-sans text-xs font-bold uppercase text-white ${getRandomColor()}`}
              >
                <span className=''>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='p-6'>
          <div className='my-2 flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700'>
            {universityInfo?.fees?.map((fee) => (
              <>
                <div className='group flex w-full items-center rounded-none p-3 py-1.5 px-3 text-start text-sm font-normal text-blue-gray-700 outline-none transition-all hover:bg-blue-500 hover:bg-opacity-80 hover:text-white focus:bg-blue-500 focus:bg-opacity-80 focus:text-white active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'>
                  <div className='grid mr-4 place-items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3'
                      ></path>
                    </svg>
                  </div>
                  {fee.label}
                  <div className='grid ml-auto place-items-center justify-self-end'>
                    <div className='relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10 group-hover:bg-white/20 group-hover:text-white'>
                      <span className=''>${fee.value}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
              {universityInfo.tuition.map((tuition) => (
              <>
                <div className='group flex w-full items-center rounded-none p-3 py-1.5 px-3 text-start text-sm font-normal text-blue-gray-700 outline-none transition-all hover:bg-blue-500 hover:bg-opacity-80 hover:text-white focus:bg-blue-500 focus:bg-opacity-80 focus:text-white active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'>
                  <div className='grid mr-4 place-items-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-4 h-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3'
                      ></path>
                    </svg>
                  </div>
                  {tuition.label}
                  <div className='grid ml-auto place-items-center justify-self-end'>
                    <div className='relative grid items-center px-2 py-1 font-sans text-xs font-bold text-gray-900 uppercase rounded-full select-none whitespace-nowrap bg-gray-900/10 group-hover:bg-white/20 group-hover:text-white'>
                      <span className=''>${tuition.value}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className='p-6'>
          <div className='my-2 flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700'>

          </div>
        </div>


        <div className='p-6 pt-0 space-x-10'>
          <button
            className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-green-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
            type='button'
          >
          <SimleyIcon />
          </button>


          <button
            className='align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-700 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none'
            type='button'
          >
            <SadIcon />
          </button>
        </div>
      </div>
    </>
  );
};
