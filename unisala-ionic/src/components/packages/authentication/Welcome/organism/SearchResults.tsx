import React from "react"
import SearchLoadingSkeleton from "../atom/SearchLoadingSkeleton"
import { IonList } from "@ionic/react"
import SearchResultWithCheckbox from "../atom/SearchResultWithCheckbox"

const SearchResults = ({ isLoading, results, handleClick, selectedValue }) => {
  return (
    <IonList className="overflow-y-scroll searchlist border rounded-md h-48 w-full">
      {isLoading && <SearchLoadingSkeleton />}
      {!isLoading &&
        results?.length > 0 &&
        results?.map((result) => (
          <SearchResultWithCheckbox
            key={result?.name}
            value={result?.unitId ?? result?.name}
            label={result?.name}
            handleClick={handleClick}
          />
        ))}
    </IonList>
  )
}

export default SearchResults
