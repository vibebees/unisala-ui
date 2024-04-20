import { Typography } from "@components/defaults";
import RichTextInput from "@components/packages/input/RichTextInput";

export const Textarea = (item, postData, setPostData) => {
  console.log({ textarea: item });
  return (
    <>
      <Typography className="text-sm mb-1">{item?.name}</Typography>
      <div>
        <RichTextInput
          id={item?.id}
          onChange={(e) => setPostData((prev) => ({ ...prev, postText: e }))}
          value={postData?.postText}
          showUniversityListOnAt={true}
          searchText={postData?.postText?.split("@").pop().split("<")[0]}
          handleUniversitySelect={(e) => {
            if (postData?.postText?.endsWith("</p>")) {
              const removeTextafter = postData?.postText?.split("@")[0];
              setPostData((prev) => ({
                ...prev,
                postText:
                  removeTextafter +
                  `<a href="https://unisala.com/university/${e}" rel="noopener noreferrer" target="_blank">${e}</a></p></p>`,
              }));
            } else {
              const removeTextafter = postData.postText.split("@")[0];
              setPostData((prev) => ({
                ...prev,
                postText:
                  removeTextafter +
                  `<a href="https://unisala.com/university/${e}" rel="noopener noreferrer" target="_blank">${e}</a></p>`,
              }));
            }
          }}
        />
      </div>
    </>
  );
};
