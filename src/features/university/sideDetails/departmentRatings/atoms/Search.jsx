import React from "react"
import {Button, Searchbar} from "@components/defaults"

export const Search = ({ inputRef, setSearch, resetSearch }) => {
  return (
    <div className="flex  justify-normal space-x-4 border-2px">
      <Searchbar
        ref={inputRef}
        placeholder="Search a department..."
        className="max-w-[280px]"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setSearch(e.target.value);
          }
        }}
        clearInput={resetSearch}
        onIonInput={(e) => {
          setSearch(e.target.value);
        }}
      />


      {inputRef.current?.value && (
        <Button onClick={resetSearch} size="medium" fill="outline">
          Clear
        </Button>
      )}
    </div>
  )
}

