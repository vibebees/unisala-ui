import { Checkbox, Label } from "@components/defaults";

export const CheckboxComponent = (item, postData, setPostData) => {
  return (
    <div className="flex mt-2 w-fit items-center">
      <Label htmlFor={item.id}>{item.name}</Label>

      <Checkbox
        className="ml-2 "
        id={item.id} // Add id attribute here
        name={item.name}
        onIonChange={(e) => {
          setPostData((prev) => ({
            ...prev,
            [item.id]: e.target.checked,
          }));
        }}
      />
    </div>
  );
};
