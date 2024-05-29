import { Typography } from '@components/defaults';
import { ReportBody } from './reportBody';

export const ReportAverage = ({ allProps }) => {
  const { useGradeColor, report, useGrade } = allProps;
  return (
    <>
      <div className='relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row'>
        <div className='p-6'>
          <div
            style={{
              background: useGradeColor(report?.average)
            }}
            className='report'
          >
            <h1 style={{ fontSize: '35px' }}>{useGrade(report?.average)}</h1>
          </div>

          <h4 className='block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center'>
            Average{' '}
          </h4>
          <ReportBody allProps={allProps} />
        </div>
      </div>


    </>
  );
};
