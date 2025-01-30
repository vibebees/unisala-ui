import React from 'react';
import Space from '../features/space/index';
import Layout from '../layouts/FixedLayout';
import { FamousUniversities } from '@components/packages/famousUniversites';
import { LeftSideBar } from '@components/packages/spacesAndOrgs';
import CreateASpace from '@components/packages/createSpace/CreateSpace';
import { Spaces } from '@components/packages/spacesAndOrgs/spaces';
export default function SpacePage() {
  return (
    <Layout
      leftSidebar={<LeftSideBar order={['Spaces']} />}
      rightSidebar={
        <>
          <CreateASpace />
        </>
      }
    >
      <Space />
    </Layout>
  );
}
