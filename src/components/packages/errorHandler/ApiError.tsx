import React from "react";
import { Card, CardHeader, CardTitle, CardSubtitle } from "../../defaults";
import noResultsFound from "@assets/no-results.jpg";

export const ApiError = () => {
  return (
    <>
      <Card
        style={{ textAlign: "center", marginInline: "auto" }}
        className="max-width-container "
      >
        <img alt="unisala: no results found" src={noResultsFound} />
        <CardHeader>
          <CardTitle>Sorry, Service is down at the moment &#9785;</CardTitle>
          <CardSubtitle>Please check back in few mins!</CardSubtitle>
        </CardHeader>
      </Card>
    </>
  );
};

