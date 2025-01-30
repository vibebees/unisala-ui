import { useApolloClient, useMutation } from "@apollo/client";
import { IonInput, useIonToast } from "@ionic/react";
import { Button, Col, Grid, Row } from "../../../../components/defaults";
import { useOrgContext } from "@features/org";
import {
  AddNewHistory,
  GetAllHistory,
  GetAllHistoryYear,
} from "../../../../datasource/graphql/user";
import moment from "moment";
import React, { useState } from "react";
import { USER_SERVICE_GQL } from "../../../../datasource/servers/types";
import HistoryButton from "../atoms/SaveButton";
import AddPeople from "./AddPeople";

const AddHistory = () => {
  const { _id } = useOrgContext();
  const [addPeople, setAddPeople] = useState(false);
  const client = useApolloClient();
  const [present, dismiss] = useIonToast();
  const [data, setdata] = useState({
    date: Date.now(),
    description: "",
    events: [],
  });

  const [addHistoryMutation] = useMutation(AddNewHistory, {
    context: { server: USER_SERVICE_GQL },
    update: (cache, { data }) => {
      const getHistories = cache.readQuery({
        query: GetAllHistory,
        variables: { orgId: _id, year: new Date().getFullYear() },
      });

      if (!getHistories) {
        client.refetchQueries({
          include: [GetAllHistoryYear, GetAllHistory],
        });
      }

      getHistories &&
        cache.writeQuery({
          query: GetAllHistory,
          variables: { orgId: _id, year: new Date().getFullYear() },
          data: {
            getAllHistory: {
              ...getHistories.getAllHistory,
              data: [
                ...getHistories.getAllHistory.data,
                data.createHistory.data,
              ],
            },
          },
        });
    },

    onCompleted: () => {
      setdata({ date: Date.now(), description: "", events: [] });
      present({
        duration: 3000,
        message: "History added successfully",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "primary",
        mode: "ios",
      });
    },
  });

  const handleSaveHistory = () => {
    let formatevents = [];
    if (data.description === "") {
      return present({
        duration: 3000,
        message: "Please fill all the fields",
        buttons: [{ text: "X", handler: () => dismiss() }],
        color: "danger",
        mode: "ios",
      });
    }

    if (data.events && data.events.length > 0) {
      const isEventsValid = data.events.every((event) => event.title !== "");
      if (!isEventsValid) {
        return present({
          duration: 3000,
          message: "Please fill all the fields",
          buttons: [{ text: "X", handler: () => dismiss() }],
          color: "danger",
          mode: "ios",
        });
      }
      formatevents = data.events.map((event) => {
        return {
          userId: "6561b47fe92160691070dc06",
          title: event.title,
          date: data.date,
        };
      });
    }

    addHistoryMutation({
      variables: {
        orgId: _id,
        title: data.description,
        description: data.description,
        date: moment(data.date).format("YYYY-MM-DD"),
        events: formatevents,
      },
    });
  };

  return (
    <Grid className="ion-no-padding   w-full h-full ion-no-margin  mb-8 mt-4  justify-between rounded-md ">
      <Row className="w-full border justify-between h-full border-neutral-400 rounded-md ">
        <Col className="" size="auto">
          <IonInput
            className=" !px-2 h-full w-28 rounded-md shadow-md bg-white  ion-no-margin ion-no-padding pointer-events-none border-none"
            type="text"
            placeholder="Enter data"
            value={moment(data.date).format("YYYY-MM-DD")}
            onChange={(e) =>
              setdata((prev) => ({ ...prev, date: e.target.value }))
            }
          />
        </Col>
        <Col className=" border  bg-neutral-100 w-full  ion-no-margin ion-no-padding ">
          <IonInput
            autofocus
            className="w-full ml-2  ion-no-padding h-full ion-no-margin  border-none "
            placeholder="Enter history description"
            value={data.description}
            onIonChange={(e) =>
              setdata((prev) => ({ ...prev, description: e.detail.value }))
            }
          />
        </Col>

        <Col
          size="auto"
          className="ion-no-margin   bg-neutral-50 ion-no-padding"
        >
          <Button
            onClick={() => {
              setAddPeople(!addPeople);
            }}
            fill="outline"
            className="ion-no-margin w-fit"
          >
            Add People
          </Button>
        </Col>
      </Row>
      {addPeople && <AddPeople data={data} setdata={setdata} />}
      <Col className="w-full my-3 ">
        <HistoryButton
          label="Save History"
          loading={false}
          onClick={handleSaveHistory}
          className={"w-full my-5"}
        />
      </Col>
    </Grid>
  );
};

export default AddHistory;
