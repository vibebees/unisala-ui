import { useQuery } from "@apollo/client";
import { fetchFamousUniversities } from "../../../datasource/graphql/user";
import { USER_SERVICE_GQL } from "../../../datasource/servers/types";
import React from "react";
import { Link } from "react-router-dom";
import { CustomTrackingLink } from "../../analytics/LinkTrack";
import { Col, Card, Item, Label, Text, SimpleAvatar } from "../../defaults";
import ImageWithLoader from "../reusable/Image/ImageWithLoader";

export const FamousUniversities = () => {
  const { data: famousUniversities } = useQuery(fetchFamousUniversities, {
      variables: { limit: 10, page: 0 },
      context: { server: USER_SERVICE_GQL },
    }),
    getFamousUniversity = famousUniversities?.getFamousUniversity || [
      {
        unitId: "Cambridge, MA",
        name: "Harvard University",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ85CYmrXtcB5lixCO4OD31B0lH2bSUWnYlwzXt&s=0",
      },
      {
        unitId: "New York, NY",
        name: "New York, NY",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzvc2BzBLe6O21S54mP4emzDPX0BV7Uha9kh0V&s=0",
      },
      {
        unitId: "Princeton, NJ",
        name: "Princeton University",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWNw-o9FeNO_CPrOI_0GXJubkKMN1ORUHGILlo&s=0",
      },
      {
        unitId: "Stanford, CA",
        name: "Stanford University",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaAc3w5Bl9m8O-BjtEBT5ag4o95voXy8uJQ1iC&s=0",
      },
      {
        unitId: "Berkeley, CA",
        name: "University of California",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuS-57V0-jthS3Xt7V-w-H3aYD2FfUg0rZEOAx&s=0",
      },
      {
        unitId: "Philadelphia, PA",
        name: "California Institute of Technology",
        pictures:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbypxZ6lLq4T3ZXxprpRysIjk03Zbr2rtBzLu2&s=0",
      },
    ];
  return (
    <Col
      size="auto"
      className="famousUniList ion-no-margin ion-no-padding"
      style={{
        maxWidth: "300px",
        height: "90vh",
        position: "sticky",
        top: "0px",
        overflow: "auto",
      }}
    >
      <Card className="my-0 shadow-none BorderCard ion-no-margin">
        <Text color="dark">
          <h4 style={{ padding: "10px" }}>Famous Universities</h4>
        </Text>

        {getFamousUniversity?.map((item: any, index: number) => {
          return (
            <CustomTrackingLink
              to={`/university/${item?.name}`}
              destination={"/university"}
              title="Clicked on famous university List card"
              key={index}
            >
              <Item
                style={{
                  margin: "0px",
                  padding: "0px",
                }}
                key={index}
              >
                <SimpleAvatar slot="start">
                  <ImageWithLoader
                    src={item.pictures}
                    alt={item.name}
                    style={{
                      borderRadius: "100%",
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                  />
                </SimpleAvatar>
                <Label>
                  <h2
                    style={{
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h2>
                </Label>
              </Item>
            </CustomTrackingLink>
          );
        })}
        <Link to="/search?tab=uni" style={{ marginTop: "120px" }}>
          <Text
            className="max-w-[250px] text-[#3880FF] text-center  font-semibold"
            fill="solid"
            style={{
              "--background": "white",
              "--background-hover": "#eee",
            }}
          >
            <h1 className="py-4">Search Universities</h1>
          </Text>
        </Link>
      </Card>
    </Col>
  );
};
