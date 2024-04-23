import React, { FC } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useSelector } from "react-redux";
import CourseCard from "../../../../components/packages/courseCard";
import noResultsFound from "../../../../assets/no-results.jpg";
import "./index.css";
import { CustomTrackingLink } from "../../../../components/analytics/LinkTrack";
import { FeedSkeleton } from "../../../../components/packages/skeleton/feedSkeleton";
import { motion } from "framer-motion";

interface ISearchResults {
  filterPage: number;
  setFilterPage: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}

const NoResultCard = () => {
  return (
    <IonCard style={{ textAlign: "center" }}>
      <img alt="unisala: no results found" src={noResultsFound} />
      <IonCardHeader>
        <IonCardTitle>Sorry! No result found &#9785;</IonCardTitle>
        <IonCardSubtitle>
          There were not any saved views, recent queries, or source matching
          your search.
        </IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

const SearchResults: FC<ISearchResults> = ({
  filterPage,
  setFilterPage,
  isLoading,
}) => {
  const { searchData } = useSelector((store) => store?.university || []);

  return (
    <motion.div
      initial={{ x: 1000 }}
      animate={{
        x: 0,
      }}
      exit={{
        x: 1000,
      }}
      transition={{ duration: 0.3 }}
      className="relative flex gap-3 flex-col"
    >
      {isLoading && <FeedSkeleton />}
      {!isLoading && searchData?.length === 0 && <NoResultCard />}

      {!isLoading &&
        searchData?.length > 0 &&
        Array.isArray(searchData) &&
        searchData.map((data, index) => {
          return (
            <CustomTrackingLink
              title={`${data?.name} clicked on university result filter `}
              to={`/university/${data?.name}`}
              key={index}
              destination={`/university/${data?.name}`}
            >
              <CourseCard key={index} allProps={data} />
            </CustomTrackingLink>
          );
        })}
      <IonInfiniteScroll
        threshold="100px"
        onIonInfinite={(e) => {
          // if searchParams has more than 2 items then it infers filter is applied, in this case add page for paginated data
          setFilterPage((prev) => prev + 1);
          e.target.complete();
        }}
      >
        <IonInfiniteScrollContent
          loadingText="Loading more data..."
          loadingSpinner="dots"
        >
          {filterPage > 1 && (
            <h1 className="text-[#488AFF]">
              <FeedSkeleton />
            </h1>
          )}
        </IonInfiniteScrollContent>
      </IonInfiniteScroll>
    </motion.div>
  );
};

export default SearchResults;
