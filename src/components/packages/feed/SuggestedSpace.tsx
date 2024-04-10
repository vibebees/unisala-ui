import React from "react";
import {
  IonCardContent,
  IonCardHeader
} from "@ionic/react";
import { Button, Card } from "../../defaults";
import { Link } from "react-router-dom";

export const SuggestedSpace = ({ data, title, type }) => {
  return (
    <Card className="ion-no-margin">
      <IonCardHeader>
        <h4 className="text-lg text-black font-medium">{title}</h4>
      </IonCardHeader>

      <div className="grid grid-cols-2 ">
        {data.map((space) => (
          <div
            key={space._id}
            style={{
              width: "100%",
              marginTop: "10px"
              // borderTop: "1px solid #e0e0e0"
            }}
            className="max-md:border-none  "
          >
            <Card className="border h-full">
              <IonCardHeader className="capitalize line-clamp-1">
                {space.name}
              </IonCardHeader>
              <IonCardContent>
                <div>
                  <img className="object-cover " src={space.image} alt="" />
                </div>

                <p className="pt-3 line-clamp-3">{space.description}</p>
                <Link to={`/${type}/${space.name}`}>
                  <Button
                    type="button"
                    className="mt-4 hover:scale-[1.02] transition-all ease-linear"
                    fill="outline"
                    expand="block"
                  >
                    View
                  </Button>
                </Link>
              </IonCardContent>
            </Card>
          </div>
        ))}
      </div>
    </Card>
  );
};
