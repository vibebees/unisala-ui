import React from "react"
import { Card, CardHeader, CardTitle, CardSubtitle } from "../../defaults"
import noResultsFound from "../../../assets/no-results.jpg"

export const NoResultFound = () => {
    return (
        <>
        <Card
          style={{ textAlign: "center", marginInline: "auto" }}
          className="max-width-container "
        >
          <img alt="unisala: no results found" src={noResultsFound} />
          <CardHeader>
            <CardTitle>
              Sorry, this page is not available. &#9785;
            </CardTitle>
            <CardSubtitle>
              The link you followed may be broken, or the page may have been
              removed.
            </CardSubtitle>
          </CardHeader>
        </Card>
      </>
    )
}