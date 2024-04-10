import { Avatar, Button, Input, Item } from "../../../../components/defaults"
import DeleteIcon from "Icons/DeleteIcon"

const AddPeopleForm = ({ picture, id, title, username, setdata }) => {
  const handleDeleteClick = () => {
    setdata((prev) => {
      return {
        ...prev,
        events: prev.events.filter((p) => p.username !== username)
      }
    })
  }

  return (
    <Item lines="inset" className="group">
      <Avatar src={picture} className="w-8 h-8" />{" "}
      <Input
        className="ml-2 rounded-md ion-no-margin mr-1 ion-no-padding !pl-2 text-sm h-4/5  border-transparent"
        placeholder="Write a description..."
        value={title}
        onIonChange={(e) =>
          setdata((prev) => {
            const index = prev.events.findIndex((p) => p.username === username)
            prev.events[index].title = e.target.value
            return { ...prev }
          })
        }
      />
      <Button fill="clear" onClick={() => handleDeleteClick()}>
        <DeleteIcon
          width={20}
          height={20}
          className="opacity-25 duration-300 group-hover:opacity-100"
        />
      </Button>
    </Item>
  )
}

export default AddPeopleForm
