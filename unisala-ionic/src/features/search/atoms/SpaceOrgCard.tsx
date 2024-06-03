import CardTitle from "component/RectangularCardGrid/atoms/CardTitle"
import ImageWithLoader from "../../../components/packages/reusable/Image/ImageWithLoader"
 import { Link } from "react-router-dom"
import {Card, Typography} from "../../../components/defaults"

export const SpaceOrgCard = ({ data, type }) => {
  return (
    <Card>
      <div>
        <ImageWithLoader
          src={
            "https://img.freepik.com/premium-photo/back-school-education-banner-background_8087-1192.jpg?w=1380"
          }
        />
      </div>

      <div className="p-4">
        <Link to={`/${type}/${data?.name}`}>
          <Typography className="text-lg capitalize font-medium text-black">
            {data?.name}
          </Typography>
        </Link>

        <Typography>{data?.description}</Typography>
      </div>
    </Card>
  )
}

