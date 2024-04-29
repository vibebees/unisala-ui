import React from 'react'; // Import the 'React' module
import { useState } from 'react';
import question from '../../assets/welcome/question.jpeg';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonItem,
  IonRow
} from '@ionic/react';
import incomingStudents from '@assets/question.jpeg';
import currentStudents from '@assets/currentStudents.png';
import alumini from '@assets/alumini.jpeg';
import StudentOrg from '@assets/studentOrg.webp';
import ExploreUniversities from '@assets/ExploreUniversity.png';
import UnisalaLightBulb from '@assets/unisala-bulb.webp';
import DiscoverUni from '@assets/disoveruni.webp';

import './css/templatemo-scholar.css';
import { image } from 'ionicons/icons';
import { RoadMap } from './RoadMap';
import { FAQ } from './FAQ';
import { SingleCard } from './SingleCard';
import { Article } from './Article';

export const UnisalaLandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const cardContent = [
    {
      title: 'Incoming Student 🤔',
      description:
        "🌟✈️ Imagine stepping into your future today. On Unisala, connect with someone who's living your dream. 🌈 They were once where you are now, navigating decisions just like yours. Let their journey inspire and guide yours, helping you to see beyond the horizon to what’s possible.",
      image: incomingStudents
    },
    {
      title: ' Students 🧑‍🎓',
      description:
        'Find classmates 🤝 across the nation, team up for groundbreaking projects, or share your own innovations. 💡 Here, you’re not just earning a degree; you’re expanding your network and finding mentors who can turn your vision into reality.',
      image: currentStudents
    },
    {
      title: 'Graduates 🎓',
      description:
        'Remember the feeling of home 🏠? Reconnect with it on Unisala. Meet local graduates from your own university or from your homeland. 🌍 Whether you shared the same campus or the same roots, you’ll find community and continuity. 🤝 Share your hard-earned insights and experiences, and keep the cycle of learning and support alive.',
      image: alumini
    },
    {
      title: 'Student Organziations 🎓',
      description:
        "Unisala empowers student organizations by unlocking the potential of their alumni networks 🌟 Small groups can showcase their rich history and connections, while larger ones unite past and present members. 🤝 It's where every organization's story finds a home. 🏠",
      image: StudentOrg
    }
  ];
  const articleContentFirst = [
    {
      imgsrc: DiscoverUni,
      tag: 'Your University Journey Starts Here',
      title: 'Simplify your search. Discover Universities. ',
      description: 'Find Your University Fit with Unisala 🎓🔍 Choose from your programs, Search by major, and filter by fees or state. Simple, quick, and tailored to you. Discover the place where you\'ll flourish both academically and personally!'
    }
  ]

  const articleContentLast = [
    {
      imgsrc: UnisalaLightBulb,
      tag: 'Connect. Collaborate. Create 🚀',
      title: 'Bring your projects to life with a community that shares your vision',
      description: 'Share your ideas, articles, or projects on Unisala.com 📝💡 and find like-minded peers or teammates 👥. Collaborate, inspire, and grow together in a community that turns collective aspirations into reality 🚀🌐.'
    }
  ]

  return (
    <IonGrid>
        {articleContentFirst.map((article, index) => (
        <IonRow>
          <IonCol>
            <Article
              imgsrc={article?.imgsrc}
              tag={article?.tag}
              title={article?.title}
              description={article?.description}
            />
          </IonCol>
        </IonRow>
        ))}


      <IonRow>
        {cardContent.map((content, index) => (
          <IonCol key={index}>
            <SingleCard
              title={content.title}
              description={content.description}
              image={content.image}
            />
          </IonCol>
        ))}
      </IonRow>
      <IonCard>
        <div className=' font-bold text-lg text-center'>Values</div>

        <IonRow>
          <IonCol>
            <RoadMap before={'Applying'} after={'University'} />
          </IonCol>
          <IonCol>
            <RoadMap before={'Students'} after={'Mentors'} />
          </IonCol>
          <IonCol>
            <RoadMap before={'Alumini'} after={'Network'} />
          </IonCol>
        </IonRow>
      </IonCard>

      <IonRow>
        <IonCol>
          <IonCard>
            <FAQ />
          </IonCard>
        </IonCol>
      </IonRow>

      {articleContentLast.map((article, index) => (
        <IonRow>
          <IonCol>
            <Article
              imgsrc={article?.imgsrc}
              tag={article?.tag}
              title={article?.title}
              description={article?.description}
            />
          </IonCol>
        </IonRow>
      ))}
    </IonGrid>
  );
};
