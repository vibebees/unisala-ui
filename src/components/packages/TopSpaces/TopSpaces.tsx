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
      variables: { limit: 2 },
    }
  );

  return (
    <div>
      {!data?.getTopActiveSpaces?.spaceCategory?.length && <div>No Spaces</div>}

      {error && <div>Error fetching top spaces</div>}
      {loading && (
        <div className="flex justify-center min-h-9">
          <IonSpinner></IonSpinner>
        </div>
      )}
      <AnimatePresence>
        {data &&
          !loading &&
          data?.getTopActiveSpaces &&
          data.getTopActiveSpaces.spaceCategory &&
          data?.getTopActiveSpaces?.spaceCategory?.length > 0 &&
          data?.getTopActiveSpaces?.spaceCategory.map((space) => {
            return (
              <SpaceReference
                key={space?._id}
                spaceCard={true}
                references={
                  data.getTopActiveSpaces?.spaceCategory as ITopSpace[]
                }
              />
            );
          })}
      </AnimatePresence>
    </div>
  );
};

export default TopSpaces;
