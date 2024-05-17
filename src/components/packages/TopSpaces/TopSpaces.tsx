import React from "react";
import SpaceReference from "../spaceReference";
import { useQuery } from "@apollo/client";
import { GetTopActiveSpaces } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { GetTopActiveSpacesQuery } from "src/types/gqlTypes/graphql";
import { IonSpinner } from "@ionic/react";
import { AnimatePresence } from "framer-motion";

const TopSpaces = () => {
  const { data, loading, error } = useQuery<GetTopActiveSpacesQuery>(
    GetTopActiveSpaces,
    {
      context: { server: USER_SERVICE_GQL },
      variables: { limit: 10 },
    }
  );

  return (
    <div>
      {!data?.getTopActiveSpaces?.spaceCategory && !loading && !error && (
        <div className=" text-center text-red-700 my-6">No Spaces</div>
      )}

      {error && (
        <div className="my-6 text-center  text-red-700">
          Error fetching Top Spaces
        </div>
      )}
      {loading && (
        <div className="flex justify-center min-h-9">
          <IonSpinner></IonSpinner>
        </div>
      )}
      <AnimatePresence>
        {data &&
          data?.getTopActiveSpaces &&
          data.getTopActiveSpaces.spaceCategory &&
          data?.getTopActiveSpaces?.spaceCategory?.length > 0 &&
          <SpaceReference
            spaceCard={true}
            references={
              data.getTopActiveSpaces?.spaceCategory as ITopSpace[]
            }
          />}
      </AnimatePresence>
    </div>
  );
};

export default TopSpaces;
