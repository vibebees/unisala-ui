import { IonInput } from "@ionic/react"
import { Button } from "component/ui"

export const Search = ({ inputRef, setSearch, resetSearch }) => {
  return (
    <div className="flex  justify-normal space-x-4">
      <IonInput
        ref={inputRef}
        placeholder="Search a department..."
        className="max-w-[280px]"
      />

      <Button size="medium" onClick={setSearch}>
        Search
      </Button>

      {inputRef.current?.value && (
        <Button onClick={resetSearch} size="medium" fill="outline">
          Clear
        </Button>
      )}
    </div>
  )
}

