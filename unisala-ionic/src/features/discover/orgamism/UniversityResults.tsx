import { DesignedCards } from "@components/packages/designed/cards"

export const UniversityResults = ({ universities, loading }) => {
  return (
    <div>
      <h3 style={{ color: "#4d4d4d" }}>Universities</h3>
      <div>
       <DesignedCards/>
      </div>
    </div>
  )
}

