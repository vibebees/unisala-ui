import React from "react";
import {
  Item,
  Label,
  List,
  ListHeader,
  SkeletonText,
  Thumbnail,
} from "../../defaults/index";
import "./index.css";

export const ThreadSkeleton = () => {
  return (
    <List>
      <ListHeader>
        <SkeletonText animated={true} style={{ width: "20%" }}></SkeletonText>
      </ListHeader>
      <Item>
        <Thumbnail slot="start">
          <SkeletonText animated={true}></SkeletonText>
        </Thumbnail>
        <Label>
          <h3>
            <SkeletonText
              animated={true}
              style={{ width: "80%" }}
            ></SkeletonText>
          </h3>
          <p>
            <SkeletonText
              animated={true}
              style={{ width: "60%" }}
            ></SkeletonText>
          </p>
          <p>
            <SkeletonText
              animated={true}
              style={{ width: "30%" }}
            ></SkeletonText>
          </p>
        </Label>
      </Item>
    </List>
  );
};
