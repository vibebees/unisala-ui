import {IonContent, IonCard, IonCardContent, IonCol, IonRow, IonGrid} from "@ionic/react"
import nir from "../../assets/welcome/nir.png"
import prash from "../../assets/welcome/prash.png"
import soy from "../../assets/welcome/soy.png"
import kal from "../../assets/welcome/kal.png"
import ask from "../../assets/welcome/op_ask.jpeg"
import review from "../../assets/welcome/op_rate.jpeg"
import suggestMe from "../../assets/welcome/op_read.jpeg"
import ratings from "../../assets/welcome/op_reev.jpeg"
import nepaliStudentReadingReviews from "../../assets/welcome/op_revi.jpeg"
import review4 from "../../assets/welcome/op_revw.jpeg"








const slideOpts = {
    initialSlide: 0,
  speed: 400,
  autoplay: true
  }


const images = [
  {src: review, alt: "reviews and ratings from international students in usa university on their phone"},
  // {src: ratings, alt: "international students ratings  thier usa university on their phone"},
  {src: nir, alt: "review from mechnaical engineering students  from louisiana tech university"},
  {src: nepaliStudentReadingReviews, alt: "nepali student reading reviews from international students in usa university"},

    {src: prash, alt: "Description of image 2"},


  {src: suggestMe, alt: "female student in asia asking for university recommendation"},
  {src: soy, alt: "student sharing their profile like sat, gpa, toefl and asking for university recommendation in computer science major"},
  {src: ask, alt: "student asking for university recommendation"},
  {src: review4, alt: "female student looking at university reviews"}

]


  export const ImageSlider = () => {
    return (
      <></>
        // <IonSlides pager={true} options={slideOpts}>
        //         {images.map((image, index) => (
        //             <IonSlide key={index}>
        //               <img src={image.src} alt={image.alt} style={{ width: "80%"}}/>
        //             </IonSlide>
        //   ))}
        // </IonSlides>
    )
  }

