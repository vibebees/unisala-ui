/* eslint-disable no-unreachable */
import clsx from "clsx"
import { Avatar, Button, Col, Row, Typography, Modal } from "../../../../components/defaults"
import { useState } from "react"
 import ContributionsList from "../organism/ContributionsList"
import EditHistory from "./EditHistory"
import {EditIcon} from "../../../../components/packages/icons"

const DateList = ({ date = "", content = "", _id }) => {
  const [edit, setedit] = useState(false)
  return (
    <Row className="border-t h-full py-2 px-4 group ion-no-margin ion-no-padding  border-neutral-400 border-opacity-25 items-center  justify-start flex">
      <Col size="3" className="ion-no-padding ion-no-margin">
        <Typography variant="h5" className="text-sm opacity-40">
          {date}
        </Typography>
      </Col>
      <Col className="ion-no-padding ion-no-margin  w-full">
        {edit ? (
          <EditHistory
            text={content}
            edit={edit}
            setedit={setedit}
            orgHistoryId={_id}
            date={date}
          />
        ) : (
          <Typography variant="h3" className="text-sm opacity-70">
            {content}
          </Typography>
        )}
      </Col>
      {!edit && (
        <Col>
          <Modal
            ModalButton={
              <Row className="ion-no-padding ion-no-margin  w-full">
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
                <Avatar className="w-7 h-7 -ml-2 border border-transparent hover:border-blue-700 hover:z-10" />
              </Row>
            }
            ModalData={<ContributionsList _id={_id} />}
          />
        </Col>
      )}

      {!edit && (
        <Col
          size="auto"
          className={clsx(
            "ion-no-padding opacity-0 group-hover:opacity-100  ion-no-margin "
          )}
        >
          <Button fill="clear" onClick={() => setedit(!edit)} className="">
            <EditIcon width={20} height={20} />
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default DateList
