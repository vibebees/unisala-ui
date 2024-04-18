import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CourseCard from "../../../../components/packages/courseCard";
import noResultsFound from "../../../../assets/no-results.jpg";
import "./index.css";
import { CustomTrackingLink } from "../../../../components/analytics/LinkTrack";
import { FeedSkeleton } from "../../../../components/packages/skeleton/feedSkeleton";

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

function SearchResults({ filterPage, setFilterPage, isLoading }) {
  const { searchData } = useSelector((store) => store?.university || []);
  const ResultCard = () => (
    <div className="relative">
      {Array.isArray(searchData) &&
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
    </div>
  );
  if (isLoading) {
    return <FeedSkeleton />;
  }
  return searchData?.length === 0 ? <NoResultCard /> : <ResultCard />;
}

export default SearchResults;
