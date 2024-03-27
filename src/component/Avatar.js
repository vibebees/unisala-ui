import {useEffect, useMemo, useState} from "react"
import {createAvatar} from "@dicebear/core"
import {thumbs} from "@dicebear/collection"
import {getImage} from "servers/s3.configs"

export function Avatar({profilePic, username = "anon"}) {
  const [profileImage, setProfileImage] = useState()

  useEffect(() => {
    if (profileImage) {
      setProfileImage(profilePic)
    }
  }, [])

  const avatar = useMemo(() => {
    // eslint-disable-next-line no-sync
    return username && createAvatar(thumbs, {
      size: 128,
      seed: username

      // ... other options
    })?.toDataUriSync()
  }, [profilePic, username])
  useEffect(() => {
    getImage("user", profilePic, setProfileImage)
  }, [])
  return (
    <img
      src={profileImage || avatar || ""}
      className="user-profile__img"
      alt={"unisala"}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}
    />
  )
}
