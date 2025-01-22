import { Avatar, Item, Typography } from "../../../../components/defaults"

const PeopleList = ({
  id,
  firstName,
  lastName,
  username,
  picture,
  historyData,
  setdata
}) => {
  const handlePersonClick = () => {
    if (!historyData.events.find((p) => p.username === username)) {
      setdata((prev) => {
        return {
          ...prev,
          events: [
            ...prev.events,
            {
              id: id,
              profilePic: picture,
              firstName: firstName,
              lastName: lastName,
              username: username,
              title: ""
            }
          ]
        }
      })
    }
  }

  return (
    <Item button key={id} onClick={() => handlePersonClick()}>
      <Avatar src={picture} />{" "}
      <div>
        <Typography variant="h2" className="ml-4 text-sm">
          {firstName} {lastName}
        </Typography>
        <Typography variant="p" className="ml-4 text-xs text-neutral-400">
          @{username}
        </Typography>
      </div>
    </Item>
  )
}

export default PeopleList
