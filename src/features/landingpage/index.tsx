import React from "react"
import {Card,CardContent,} from "../../components/defaults"

  import ExploreUniversities from "../../assets/ExploreUniversity.png"
  import currentStudents from "../../assets/currentStudents.jpeg"
  import question from "../../assets/welcome/question.jpeg"
import { Content } from "../../components/defaults"


let Actual = () => (
  <div style={{ margin: "27px 0px 0px 0px" }}>
  <Card className="">
          {/* <Login /> */}
          log in card
  </Card>

  <Card className="mb-4">
    <CardContent className="flex flex-col text-left">
      <ul className="list-disc list-inside text-md space-y-2">
        <h1 className="text-2xl font-bold pt-1 pb-2">
          <strong>Are you an incoming student?</strong> 🤔
        </h1>
        <img src={question} alt="roadmap"   className="w-full md:w-1/2 h-auto md:h-1/4" />
        <li>
          <strong></strong>
          <ul className="list-inside space-y-1 mt-1">
            <li>
              <ul className="list-inside space-y-1 mt-1">
                <li>
                  🏫 Get university recommendations tailored to your
                  interests and goals.
                </li>
                <li>
                  💬 Ask questions and receive advice from student and
                  graduates who &lsquo; ve been in your shoes.
                </li>
                <li>
                  🤓 Make informed decisions with insights on courses,
                  campus life and more reviews.
                </li>
              </ul>
            </li>
            <br />
          </ul>
        </li>
      </ul>
      <br />
    </CardContent>
  </Card>

  <Card className="mb-4">
    <CardContent className="flex flex-col text-left">
      <ul className="list-disc list-inside text-md space-y-2">
        <h1 className="text-2xl font-bold pt-1 pb-2">
          <strong> Are you a current student 🧑‍🎓 or alumni 🎓 ?</strong>
        </h1>
        <img src={currentStudents} alt="roadmap"  className="w-full md:w-1/2 h-auto md:h-1/4"  />
        <li>
          <strong></strong>
          <ul className="list-inside space-y-1 mt-1">
            <li>
              🌟 Help shape the future of students by sharing your
              experiences
            </li>
            <li>
              📝✅ Review your university, helping students in their
              decision-making process.
            </li>
            <li>
              🎤💡 Share tips on academics, campus life, and career
              opportunities to illuminate the path for others.
            </li>
          </ul>
        </li>
      </ul>
      <br />
    </CardContent>
  </Card>

  <Card className="mb-4">
    <CardContent className="flex flex-col text-left">
      <h1 className="text-2xl font-bold pt-1 pb-2">
        <strong> Join Unisala</strong> 🤔
      </h1>
      <br />
      <p className="text-md mt-4">
        A community where knowledge empowers, experiences guide, and every
        voice matters.
        <strong>
          Together, lets build a platform that turns academic aspirations
          into achievements. 🤝✨{" "}
        </strong>
      </p>
    </CardContent>
  </Card>

  {/* <IonCard className="mb-1">
    <IonCardContent className="flex-column text-left">
      <h1 className="pt-1 pb-05 black-text">
        Your Comprehensive Guide to Studying in the USA
      </h1>
      <p>
        Welcome to Unisala, Study In USA Guide! This guide is your ultimate companion on your journey to pursuing higher education in the United States.
      </p>
      <p>
        Discover valuable insights, connect with fellow students, and find answers to your questions about studying in the USA.
      </p>
      <ol>
        <li>Explore top universities</li>
        <li>Get real-life experiences from students</li>
        <li>Access scholarship and financial aid information</li>
        <li>Prepare for your visa application</li>
      </ol>
    </IonCardContent>
  </IonCard> */}

  <Card className="mb-1 !">
    {/* <ImageSlider /> */}
  </Card>

  {/* <IonCard className="mb-1 !">
    <IonCardContent className="p-0 relative flex-column text-center">
      <img src={roadmap} alt="roadmap" />
      <div className="absolute w-full top-6 -right-7">
        <h2 className="pt-1 !text-neutral-700  pb-05 black-text">
        🌟 Inspire Success🚀
        </h2>
        <br />
        <span>
         Shape Careers, Change Lives
        </span>
        <div className="flex gap-4 w-full pr-28 justify-end ">
          <button
            className="capitalize wobble-hor-bottom text-neutral-100 flex items-center px-3 py-2 bg-blue-600 rounded-3xl"
            onClick={() => {
              ButtonTrack("Landing page login button clicked")
              window.location.replace("/login")
            }} // Replace '/login' with your login URL
          >
            <IonIcon icon={lockOpenOutline} />
            &nbsp; Log In Now
            <span className="animate-ping absolute inline-flex h-9 w-20 rounded-3xl bg-sky-400 opacity-50 scale-50"></span>
          </button>
        </div>

      </div>
    </IonCardContent>
  </IonCard> */}

  <Card className="mb-1 !">
    <CardContent className="p-0 relative flex-column text-center">
      <img src={ExploreUniversities} alt="roadmap"   className="w-full md:w-1/2 h-auto md:h-1/4" />
      <div className="absolute w-full bottom-20  -right-7">
        <br />
        <div className="flex gap-4 w-full pr-28 justify-start ">
          <button
            className="capitalize font-semibold  text-black flex items-center px-3 py-2 bg-neutral-100 hover:text-blue-600 rounded-3xl"
            onClick={() => {
              // ButtonTrack(
              //   "Landing page explore universities button clicked"
              // )
              window.location.replace("/search?tab=uni")
            }}
          >
            Explore Universities
            <span className="animate-ping absolute inline-flex h-9 w-20 rounded-3xl bg-sky-400 opacity-50 scale-50"></span>
          </button>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* <IonCard className="mb-1 !">
    <IonCardContent className="p-0 relative flex-column text-center">
      <img src={roadmap} alt="roadmap" />
      <div className="absolute w-full top-6  -right-7">
        <h1 className="pt-1  !font-bold !text-neutral-700 !text-3xl  pb-05 black-text ">
          Your roadmap to study abroad
        </h1>
        <br />
        <div className="flex gap-4 w-full pr-28 justify-end ">
          <button
            className="capitalize wobble-hor-bottom text-neutral-100 flex items-center px-3 py-2 bg-blue-600 rounded-3xl"
            onClick={() => {
              ButtonTrack("Landing page visa roadmap button clicked")
              window.location.replace("/roadmap")
            }}
          >
            VISA ROADMAP
            <span className="animate-ping absolute inline-flex h-9 w-20 rounded-3xl bg-sky-400 opacity-50 scale-50"></span>
          </button>
        </div>
      </div>
    </IonCardContent>
  </IonCard> */}

  {/* <IonCard className="mb-1">
    <IonCardContent className="flex-column text-center">
      <h1 className="pt-1 pb-05 black-text">
        Decide your Academic & Career journey with Data-Driven Insights.
      </h1>
      <p>
        Dive deep into our expansive collection, boasting over 6500 US
        universities and profiles of 500,000+ professors. Discover, compare,
        and make informed decisions based on comprehensivedata
      </p>
      <img
        src="https://yocket.com/svgs/ExploreUniversityIllustration.svg"
        alt="Explore Universities"
      />
    </IonCardContent>
  </IonCard>

  <IonCard className="mb-1">
    <IonCardContent className="flex-column text-center">
      <p>
        <br />
        Our team`s genuine expertise and insights, rooted in first-hand
        experiences, ensure that you`re guided by the best. Benefit from
        resources crafted by fellow graduates and current students to
        streamline your journey to the US.
      </p>
    </IonCardContent>
  </IonCard>

  <IonCard className="mb-1">
    <IonCardContent
      className={
        window.innerWidth <= 768
          ? "flex-column"
          : "flex justify-content-start"
      }
    >
      <div>
        <h1 className="pt-1 pb-05 black-text">
          Explore Over 6500 Universities
        </h1>
        <p>
          From esteemed Ivy League institutions to other reputed
          universities, discover the perfect academic environment aligned
          with your profile and goals.
        </p>
      </div>
      <img
        src="https://d15gkqt2d16c1n.cloudfront.net/images/dashboard/homepage/my-community.png"
        width={window.innerWidth > 768 ? "250px" : "100%"}
        alt="Community of Aspirants"
      />
    </IonCardContent>
  </IonCard> */}

  {/* <IonCard className="mb-1">
    <IonCardContent
      className={
        window.innerWidth <= 768
          ? "flex-column"
          : "flex justify-content-start"
      }
    >
      <img
        src="https://d15gkqt2d16c1n.cloudfront.net/images/dashboard/homepage/college-finder.png"
        width={window.innerWidth > 768 ? "250px" : "100%"}
        alt="College Finder"
      />
      <div>
        <h1 className="pt-1 pb-05 black-text">
          Personalized Scholarship Predictor
        </h1>
        <p>
          Navigate your financial roadmap with ease!
          <br />
          <br />
          <strong> Enter your GPA, SAT or ACT scores </strong> and unveil
          potential <strong>scholarship</strong> opportunities awaiting you.
        </p>
      </div>
    </IonCardContent>
  </IonCard> */}
  {/*
  <IonCard className="mb-1">
    <IonCardContent
      className={
        window.innerWidth <= 768
          ? "flex-column"
          : "flex justify-content-start"
      }
    >
      <div>
        <h1 className="pt-1 pb-05 black-text">
          Stay Updated with Application Tracker
        </h1>
        <p>
          Never miss out! With our application tracker, monitor your
          application status, ensuring you stay ahead with crucial dates and
          actions.
        </p>
      </div>
    </IonCardContent>
  </IonCard> */}
</div>
)
  export const  LandingPageTemplate = () => {
    return (
        Actual()
    
    )
  }
