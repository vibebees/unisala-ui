import React from 'react';
import { Avatar, Card, Col, Typography } from '@components/defaults';
import { useAuth } from '@context/AuthContext';
import UnisalaIntro from '@assets/unisala-intro.png';
import { Orgs } from './orgs';
import { Spaces } from './spaces';

const renderComponent = (componentName) => {
  switch (componentName) {
    case 'Orgs':
      return <Orgs key='orgs' />;
    case 'Spaces':
      return <Spaces key='spaces' />;
    default:
      return null;
  }
};

export const LeftSideBar = ({ order = ['Orgs', 'Spaces'] }) => {
  const { authenticated, user } = useAuth();

  return (
    <Col
      size='auto'
      style={{
        height: '90vh',
        position: 'sticky',
        top: '0px',
        overflow: 'auto',
      }}
      className='profileCard ion-no-margin ion-no-padding'
    >
      {authenticated ? (
        <>
          <Col className='my-0 ion-no-margin ion-no-padding w-full'>
            <Card className='ion-no-margin ion-no-padding BorderCard '>
              <div className='aside-profile pt-20 w-full'>
                <div className='w-24 h-24 rounded-full overflow-hidden !border-[7px] !border-neutral-200'>
                  <Avatar username={user?.username} profilePic={''} />
                </div>
              </div>
              <div className='mt-3 mb-6'>
                <Typography
                  variant='h6'
                  className='text-center text-sm font-bold'
                  color='dark'
                >
                  {user?.firstName + ' ' + user?.lastName}
                </Typography>
                <Typography
                  color='medium'
                  variant='p'
                  className='text-sm text-center font-normal'
                >
                  @{user?.username}
                </Typography>
              </div>
            </Card>
            {order.map(component => renderComponent(component))}
          </Col>
        </>
      ) : (
        <>
          <Card style={{ maxWidth: '250px' }}>
            <img src={UnisalaIntro} alt='unisala' loading='lazy' />
            <h5
              className='black-text'
              style={{
                textAlign: 'center',
                fontSize: '1.2rem',
                lineHeight: '26px',
                padding: '5px',
              }}
            >
              If studying abroad is your dream, making it simple is ours! ✅
            </h5>
          </Card>
        </>
      )}
    </Col>
  );
};
