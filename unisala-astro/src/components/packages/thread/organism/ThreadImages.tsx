import ImageCollage from '../ImageCollages'

const ThreadImages = ({ images, _id }: { images: string[], _id: string }) => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  if (images.length === 0) return null

  return (
    // <Link to={`/thread/${_id}`} className={clsx('relative')}>
      <div>
        hey
        {images.length > 0 && <ImageCollage images={images} />}

      </div>
      
    // </Link>
  );
}

export default ThreadImages
