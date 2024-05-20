import { Card, Typography } from '@components/defaults';
import { IonSpinner } from '@ionic/react';
import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
const TopSpaces = lazy(  () => import("@components/packages/TopSpaces/TopSpaces"));

export const Spaces = () => (
  <Card className='overflow-y-auto justify-center my-3 max-h-[348px] ion-no-padding ion-no-margin BorderCard'>
    <Typography
      variant='h6'
      color='dark'
      className='text-center w-full my-2 font-semibold sticky top-0 bg-white z-10'
    >
      Spaces
    </Typography>

    <Suspense fallback={<IonSpinner></IonSpinner>}>
      <TopSpaces />
    </Suspense>

    {/* // send user to search?q=test&tab=space */}
    <Link to='/search?q=computer science&tab=space' style={{ marginTop: '120px' }}>
      <Typography className='max-w-[250px] py-4 text-[#3880FF] text-center  font-semibold'>
        Browse More Spaces
      </Typography>
    </Link>
  </Card>
);
