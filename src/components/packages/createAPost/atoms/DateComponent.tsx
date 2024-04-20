import { Datetime, Item } from "@components/defaults";

export const DateComponent = (item, postData, setPostData) => {
  return (
    <>
      <Typography variant="p">{item.name}</Typography>
      <Item />
      <Datetime
        displayFormat="MMM DD, YYYY" // You can customize this format
        onIonChange={(e) =>
          setPostData((prev) => ({ ...prev, [item?.id]: e.detail.value }))
        }
      />
    </>
  );
};
