import React, { Dispatch, FC, SetStateAction } from 'react';
import { ChipsTab } from '../orgamism/ChipsTab';
import SearchResults from './searchResult/index';
import ScholarshipResult from './scholarshipResult';
import UniversityScholarshipTab from '../atoms/UniversityScholarshipTab';
import { ThreadSkeleton } from '../../../components/packages/skeleton/threadSkeleton';
import { Card, Col, Grid, Row } from '@components/defaults';
import { AnimatePresence } from 'framer-motion';
import { DesignedCards } from '@components/packages/designed/cards';
import { HorizaontalScrollGrid } from '@components/packages/scrollableImageCard/organism/horizontalScrollGrid';

interface IIResultsColumn extends IResultsColumn {
  setFilterPage: Dispatch<SetStateAction<number>>;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const GridUni = () => {
  return (
    <Grid>
      <Row>
        {array.map((item, index) => (
          <Col key={index} size='12' sizeMd='6' sizeLg='4' sizeXl = '3'>
            <DesignedCards />
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

export const ResultsColumn: FC<IIResultsColumn> = ({
  loading,
  activeSubTab,
  filterPage,
  setFilterPage
}) => {
  return (
      <div>
        <AnimatePresence mode='wait'>
          {activeSubTab === 'u' && (
            // <SearchResults
            //   filterPage={filterPage}
            //   setFilterPage={setFilterPage}
            //   isLoading={loading}
            //   key={"u"}
            // />
            <HorizaontalScrollGrid array={array}/>
          )}
          {activeSubTab === 's' && <ScholarshipResult key={'s'} />}
        </AnimatePresence>
      </div>
  );
};
