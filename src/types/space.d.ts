/* eslint-disable no-unused-vars */
interface ITopSpace {
  _id: string;
  name: string;
}
interface SpaceReferenceProps {
  spaceCard?: boolean;
  references: ITopSpace[];
}
