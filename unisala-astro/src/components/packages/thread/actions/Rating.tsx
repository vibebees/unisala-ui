import React from 'react';
import CircleRating from '@/components/packages/circleRating';
import { DocumentIcon } from '@/components/packages/icons/document';
import { MoneyIcon } from '@/components/packages/icons/money';
import { UniversityIcon } from '@/components/packages/icons/university';
import { CallIcon } from '@/components/packages/icons/call';
import { GraduatesIcon } from '@/components/packages/icons';
import { trackEvent } from '@/components/packages/analytics';

const Rating = ({
  label,
  rating,
  ratingKey
}: {
  label: string;
  ratingKey: string;
  rating?: number | null;
}) => {
  if (!rating) return null;

  const icons = {
    financialAidAndScholarshipRating: <MoneyIcon />,
    admissionAndApplicationRating: <DocumentIcon />,
    academicProgramsAndDepartmentRating: <UniversityIcon />, // Corrected the typo
    studentLifeAndServiceRating: <CallIcon />,
    careerAndAlumniResourceRating: <GraduatesIcon />
  };

  const selectedIcon = icons[ratingKey] || null; // Retrieve icon based on ratingKey or return null if key does not exist

  return (
    <>
      <div className='my-2 flex min-w-[240px] flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700' onClick={() => {
        trackEvent({
          action: label + '_rating_clicked',
          category: 'engagement',
          label: label
        })
      }}>
        <div className='group flex w-full items-center rounded-none p-3 py-1.5 px-3 text-start text-sm font-normal text-blue-gray-700 outline-none transition-all hover:bg-blue-500 hover:bg-opacity-80 hover:text-white focus:bg-blue-500 focus:bg-opacity-80 focus:text-white active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900'>
          <div className='grid mr-4 place-items-center'>{selectedIcon}</div>
          {label}
          <div className='grid ml-auto place-items-center justify-self-end '>
            <div className='w-7 h-7 relative'>
              <CircleRating rating={rating} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rating;
