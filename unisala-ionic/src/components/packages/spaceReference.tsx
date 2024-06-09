import { IonItem, IonLabel } from "@ionic/react";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { GraduatesIcon } from "./icons";
import { motion } from "framer-motion";

const SpaceReference: FC<SpaceReferenceProps> = ({
  references = [],
  spaceCard = true,
}) => {
  let to = spaceCard ? "space" : "org";
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="spaceReference overflow-hidden"
    >
      {references?.map((item, index) => (
        <Link to={`/${to}/` + item?.name} className="" key={index}>
          <IonItem
            style={{
              "--background": "white",
              "--background-hover": "#eee",
            }}
            key={index}
          >
            <GraduatesIcon className="mr-3 mb-px" />
            <IonLabel className="ion-text-wrap">
              <h2 className="capitalize">{item.name}</h2>
            </IonLabel>
          </IonItem>
        </Link>
      ))}
    </motion.div>
  );
};

export default SpaceReference;
