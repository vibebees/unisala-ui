import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { Avatar } from "component/Avatar"

const ThreadHeader = ({ username, profilePic, firstName, lastName, date }) => {
  return (
    <Link to={`/@/${username}`} className=" h-fit block max-md:px-2">
      <div className="thread-header gap-2">
        <div className="thread_profile-pic ">
          <Avatar profilePic={profilePic} username={firstName + lastName} />
        </div>
        <div className="thread_userdetails ">
          <h3
            style={{
              color: "#222428",
              fontSize: "14px",
              textTransform: "capitalize"
            }}
          >
            {firstName + " " + lastName}
          </h3>
          <div className="threads_username h-fit">
            <p style={{ fontSize: "12px" }}>@{username}</p>
            {date && (
              <>
                <span className="block w-[4px] h-[4px] bg-neutral-300 rounded-full"></span>
                <p className="threads_date">{moment(date).fromNow()}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ThreadHeader
