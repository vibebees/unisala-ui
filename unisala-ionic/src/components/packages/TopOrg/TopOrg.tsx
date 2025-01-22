// TopOrgs.tsx
import React, { useEffect, useState } from "react";
import SpaceReference from "../spaceReference";
import { useQuery } from "@apollo/client";
import { GetTopOrgs } from "@datasource/graphql/user";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { GetTopOrgSpaceQuery } from "src/types/gqlTypes/graphql";
import { IonSpinner } from "@ionic/react";
import { AnimatePresence } from "framer-motion";

const TopOrg = () => {
  const { data, loading, error } = useQuery<GetTopOrgSpaceQuery>(GetTopOrgs, {
    context: { server: USER_SERVICE_GQL },
    variables: { limit: 10 },
  });

  const [ orgs, setOrgs ] = useState<ITopSpace[]>([])
  useEffect(() => {
    if(data?.getTopOrgSpace?.data) {
      setOrgs(data?.getTopOrgSpace?.data)
    }
  }, [data])

  return (
    <div>
      {!data?.getTopOrgSpace?.data && !loading && !error && (
        <div className=" text-center text-red-700 my-6">No Organization</div>
      )}

      {error && (
        <div className="my-6 text-center  text-red-700">
          Error fetching Top Org Spaces
        </div>
      )}
      {loading && (
        <div className="flex justify-center min-h-9">
          <IonSpinner></IonSpinner>
        </div>
      )}
      <AnimatePresence>
        {data &&
          !loading && (
            <SpaceReference
              spaceCard={false}
              references={orgs}
            />
          )}
      </AnimatePresence>
    </div>
  );
};

export default TopOrg;
