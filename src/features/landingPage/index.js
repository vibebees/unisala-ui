import {IonContent, IonSlides, IonSlide, IonCard, IonCardContent, IonCol, IonRow, IonGrid} from "@ionic/react"
import "./index.css"
const slideOpts = {
    initialSlide: 0,
    speed: 400
  }

  const ImageSlider = ({ images }) => {
    return (
        <IonSlides pager={true} options={slideOpts}>
                {images.map((image, index) => (
                    <IonSlide key={index}>
                        <img src={image.src} alt={image.alt} />
                    </IonSlide>
          ))}
        </IonSlides>
    )
  }

const images = [
    {src: "https://lh3.googleusercontent.com/pw/ABLVV84W607JV10DNXWU7OE6x2L04MdRhvvrN56Ygg5BljLZ3XYsNUYbgBzR3MCQdk-j08DEvtwVzxxlRfIiJ4QT02wM-g0zA1Qe5GZtlHNIZjBOj4ucxBDz5wheRYf3jDwcAuqWtS3u-Po1RYvsdRnipkHTkxyxqDacy-dows-w2BLoo47HR-sJeN2mySh-fdcfe2c5_RBsWVKtm5GthmK4TAOWVhWAl4NecMFLVREf_OhMdv39C4Omf8TUhYqhEGMaLLKr1a4XC6478ncyXQjHeqjEJXTj8blVGPmzNleXbLWZNCIj5r45mY6D2WkwaOS_QZZrYeaJk6xGMfTJsXxxDx399MndFNUBUCL_Wuaacaz-g6M1e7psCr1otB82BpvdLO2UusKQVvLK0n5mkUNOtPvJiv9W0qX2-xpC--VJtRq_ISlRAFBuuHcqtRSzOl4FpAW2zJD5HObWiKaL7Fw4nashBzrEbnKtxya3gT8amM94hwFvNXD216Swahid8hAuqwAp_1jCNdqJk-sLUORPmYEzjnW2FCMsRx07yxzb3XDvUyETVb6Hs7UP5X9pm-78r7dFYXbM6U5NDow_NdvN0lgfd6bH-MU92yYcOcQPCP4VYplSGDhX0_gO-6wP_0OFLu8XElfoAbNqKutDHtzizAB_u4gXGUcrPj5CuO-dOQ_It_sHCBp_Z40uCMC3AiBg87sMXM6XF6FzF5nQ5Ktx41GBQx64Oy-QM3E41RDm4xhehMiiAUBCtRcJHW8fZ6RIl1BiGmH_FApbKrXgseAukPJQzNolN-7nOtgZXW27GINzrV4CyE_tac586dCiJyN8-FE-BKOBDozzoQLCJoj-Rny26O7Clyn8zECXzSAofLAvDpsfsMSzzC7cIsuyaJe3=w394-h514-s-no-gm?authuser=0", alt: "Description of image 2"},
    {src: "https://lh3.googleusercontent.com/pw/ABLVV841nCRm5MZxOpQCG7ekkwW2jZvpEfOIzddHYM0m00rLvePKmyF_zlklM3dWUP1yDLIMn60TfSl_WUPpb0hJjB9-IQRwUHAnON5_cLzLY6QkHNoE-_K5LdHUrm6dbt9zYzQhqa5ugCnym4AIkC4M60gBdURwYP_TTL3SQj9Ptu4WRO2KAgNuejTqDISkIdQGFajwovoX6n5emfbDvo5IYZtEOC2ThSmhs9tta4JECUsLd_G81jzUJnd8O-OavDr2Lo_R4XXMs57otJgiekji9JMQb7UzE8LCse59k3OUQKhtS2hDCLY59LPXQdbRAAUreHIY7aaT10l1kpMPE_NoPJFe4NSnUTSJNZuOMfv3cqR9K-wAB9lNNfc0HQ3V0UvP4y8A41oUjs414IJkGAS1KolEQeYEFl6qkPm_WJRLvu50umW-efXzcOt6BlvT3QYaytclbnw0lbjj71gx5edwTAbkCXiSnDl3w4bfIRQfs5h0OukxQhxaPqRQGhxNPK7ngn_vHF1-jOAynp2S_2_TCgBhL1TGfm9AApct56G1Q4F1XdSpH8Cw8ZFScOfCDnZEmmASFGddmHE7XjhZw8SMwGfc9CjxfeAne3z7dNHgzuUmw4mJmLxfhJ1xAdPhgd9xegdLcCOU3MTxss9edNLhcU0C0B-0B4bIIlk3yfpIHpn8xIcSZKOW6Eio2kiJ0vGdHA8le9dh-DN8gMv4Qahk9P6YUUteFtig4lt6BnZd0g61gbc1RWunLtEKjUvvT8b02pGCtAjOVrSV18oUlFjSYNgDL203rBRRpL4xrCmhNqCUARSyV91HSronsNzmWUmCmAondpO3kFtATDFkbDunETtDSMETOIPYJdYc-ezst3UWQc78aL8Efc0tPPs3D20u=w398-h558-s-no-gm?authuser=0", alt: "Description of image 2"},
    {src: "https://lh3.googleusercontent.com/pw/ABLVV86xNIf7ALv5T5UyeFSW9XuJMCTnlyT9xefLJvxU_tbqzEAGAIRCYUjzpXyq0Q0aPWYggBiBPlP7C5FfM-1nnHttZZFLbXdMF6ua3Je9BuXvH0ExIrEgmF0QII0cEE60pUysdyviboadYB3_-uqmrvc=w399-h561-s-no-gm", alt: "Description of image 1"},
    {src: "https://lh3.googleusercontent.com/pw/ABLVV8550sPeOM2FYVPvRKVGEQdRAKSUo3krQnVCofQ5eq5wHtuytar15QgdMiqqMjBHVf_rA4G-MGRbEDlKXfqL_C9PxSy_RQnIux4m5IRa8-jNdT6Mc9Di_60qfd56JtC4yme78B2xDj_K53x36XWnIurvNRVCksjCn2OQBQ0Y-Ne-E57xS4hxmjMX-UIggTX0OqHSVJrMbZHFz4HmpII5-_pxpOU92mT8N0g_-EW1hT4kkJxNyOL0mgYno0B2IeYSFvQ_pBANY12p6oQ5i_6G8lyTrMVlw0kqp0hTwAdzZtK8GymeuXWdyJhwTqyCJam6lm7O4xZXPN4QGRBto_kef4z5Aicyy7V6Dg9TFODTdml2DzOZEsIfCyMiRhBqri5WFnfXYj20kVqCigwBA8tu0UXczk-wNyviZSUkTSbOhxucf1Sg3OsH2N29RBJ6qm-1YdvHumM064AnclRnUQI_H3fVwkIHAncc7sgOtjslg2iOUzhDlWTI1Q6DYuo5-CzkWFcFfiLiiLtx30knoelB1zuVdDyxGm1cZJHX1x8c3iNWPAsd5wddcQHxeF0WSn9E58xx4mDZAC-RrOAnK-EDmyLDXLKRiYz4x9W9Ms3UDznRZCFqOeA_V9s56KXW-MnP7yUvORHzizU4deKnlLS6IiTRvLKPQcDqcnvsa3IdNbJcmxadndCFBWCJJqLySmvGiPlKNQTIp2G_M7ELw66LTeegrEvbQyxa9O4nPcc4monXyX3dsk8kv5LKywurN1CSGjOPcdPw52gm7LrgdakZOexA-qGPbE24PNSI5eZ_tGH3HhoFx9Z85-w1A9LDOp6o1lE47V2Awt9RlmGjlSmn7widGLahvVJN7GCs59k5oAZVJTkRntSdJ_lOtDOUYORh=w399-h386-s-no-gm?authuser=0", alt: "Description of image 2"},
    {src: "https://lh3.googleusercontent.com/pw/ABLVV86h59YmRy1vYZgv4jwEf8JRcDOXQDLRFiG2CVvGy9s4_sT-LLxASNB7zsEOjvhkFeLmyJYdgcR7SZvA0vCoWVOUn4yxyAeOaPLRZ3E1LHAlyUeXZ7LTuSlFEre871bGLfP3pioKBRyNs33M_R1Ig0w=w400-h551-s-no-gm", alt: "Description of image 2"}
]

  // In your main component

const LandingPage = () => {
    return (
        <IonContent>
            <IonCard>
                <IonRow>
                    <IonCol size-md="6" size-lg="6">
                        <ImageSlider images={images} />
                    </IonCol>

                </IonRow>
            </IonCard>
        </IonContent>
    )
}
export default LandingPage
