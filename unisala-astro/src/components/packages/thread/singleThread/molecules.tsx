// UserHeader.js
import { Link } from "react-router-dom"
// import moment from "moment"

// PostOptions.js
import { Avatar } from '@/components/avatar'

export const UserHeader = ({ props }: { props: any }) => {
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

            <p className="threads_date">{new Date().toString()}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const PostOptions = ({ setEditable, deletePost }: { setEditable: any, deletePost: any }) => (
  <div className="post-options">
    <button onClick={() => setEditable(true)}>
      {/* <Icon icon={create} /> */}
    </button>
    <button onClick={deletePost}>
      {/* <Icon icon={trash} /> */}
    </button>
  </div>
)
