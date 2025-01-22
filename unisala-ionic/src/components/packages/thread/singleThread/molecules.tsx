// UserHeader.js
import { Link } from "react-router-dom"
import { Avatar } from "../../Avatar"
import moment from "moment"

// PostOptions.js
import { Button, Icon } from "./atoms"
import { create, trash } from "ionicons/icons"

export const UserHeader = ({ props }) => {
  const { username, firstName, lastName, profilePic, date } = props
  return (
    <Link to={`/@/${username}`} className="px-4">
      <div className="thread-header">
        <div className="thread_profile-pic">
          <Avatar profilePic={profilePic} username={firstName + lastName} />
        </div>
        <div className="thread_userdetails">
          <h3 style={{ color: "#222428" }}>{firstName + " " + lastName}</h3>
          <div className="threads_username">
            <p>@{username}</p>

            <p className="threads_date">{moment(date).fromNow()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const PostOptions = ({ setEditable, deletePost }) => (
  <div className="post-options">
    <Button onClick={() => setEditable(true)}>
      <Icon icon={create} />
    </Button>
    <Button onClick={deletePost}>
      <Icon icon={trash} />
    </Button>
  </div>
)
