import {key} from "ionicons/icons"
import {store} from "../store/store"

let
  AWS = {},
  S3_BUCKET = null,
  REGION = "us-east-1",
  BASE_URL = ""

export const awsBucket = (type) => {
  switch (type) {
    case "user":
      S3_BUCKET = "unisala-user-images"
      REGION = "us-east-1"
      AWS?.config?.update({
        accessKeyId: "AKIAUVJSKU37X3A6PCBA",
        secretAccessKey: "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",
        region: REGION
      })
      BASE_URL = "https://unisala-user-images.s3.us-east-1.amazonaws.com/"
      break
    case "uni":
      AWS?.config?.update({
        accessKeyId: "AKIAUVJSKU37TPTUP4P7",
        secretAccessKey: "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",
        region: REGION
      })
      S3_BUCKET = "unisala-university-images"
      REGION = "us-east-1"
      BASE_URL = "https://unisala-university-images.s3.us-east-1.amazonaws.com/"
      break
    default:
      break
  }
  return new AWS.S3({
    params: {Bucket: S3_BUCKET},
    region: REGION
  })

},
  bucketName = (type) => {
    let S3_BUCKET = null
    switch (type) {
      case "user":
        S3_BUCKET = "unisala-user-images"
        break
      case "uni":
        S3_BUCKET = "unisala-university-images"
        break
      default:
        break
    }
    return S3_BUCKET
  },
  getImage = (type, Key = "default.jpg", setImageCallBack) => {

    // setImageCallBack(mainUrl)
    // const {userSeviceSignedUrl, uniSeviceSignedUrl} = useSelector((store) => store?.auth)

    // https://unisala-university-images.s3.us-east-1.amazonaws.com/
    // awsBucket(type).getObject({Key}, (err, data) => {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         const blob = new Blob([data.Body], {type: "image/jpeg"})
    //         const url = URL.createObjectURL(blob)
    //         setImageCallBack(url)
    //     }
    // })
  }

export const universityDefaultImage = "https://cdn.vox-cdn.com/thumbor/l5-CNuyDLr8IR8dWTW_7wqnT_bc=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23084622/5f1b1bd4b8800.image.jpg"
