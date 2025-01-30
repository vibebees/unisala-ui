import { useQuery } from "@apollo/client";
import { GetOrgSpace } from "@datasource/graphql/user";
import React, { createContext } from "react";
import { useParams } from "react-router";
import { USER_SERVICE_GQL } from "@datasource/servers/types";
import { SpaceNotFound } from "@navigation/PageNotFound";
import Org from "@features/org/Template";
import { PreLoader } from "@components/packages/preloader";

interface IOrgContext {
  loading: boolean;
  __typename: string;
  _id: string;
  admin: User;
  coverImage: string | null;
  description: string;
  image: string | null;
  isJoined: boolean;
  name: string;
  profileImage: string | null;
  role: string | null;
}

const OrgContext = createContext<IOrgContext | null>(null);

export default function OrgPage() {
  const params: any = useParams();
  const { data, loading, error } = useQuery<GetOrgSpaceByIdResponse>(
    GetOrgSpace,
    {
      context: { server: USER_SERVICE_GQL },
      variables: { name: params.category },
    }
  );

  if (loading) {
    return <PreLoader />;
  }

  if ((!loading && !data?.getOrgSpaceById.data) || (!loading && error)) {
    return <SpaceNotFound />;
  }

  const {
    __typename,
    _id,
    admin,
    coverImage,
    description,
    image,
    isJoined,
    name,
    profileImage,
    role,
  } = data?.getOrgSpaceById.data! || {};

  return (
    <OrgContext.Provider
      value={{
        loading,
        __typename,
        _id,
        admin,
        coverImage,
        description,
        image,
        isJoined,
        name,
        profileImage,
        role,
      }}
    >
      <Org />
    </OrgContext.Provider>
  );
}

const useOrgContext = () => {
  const context = React.useContext(OrgContext);
  if (!context) {
    throw new Error("useOrgContext must be used within a OrgContext");
  }
  return context;
};

export { useOrgContext };
