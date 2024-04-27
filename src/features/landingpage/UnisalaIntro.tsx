import React from 'react'; // Import the 'React' module
import { useState } from 'react';
import question from '../../assets/welcome/question.jpeg';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCol,
  IonGrid,
  IonItem,
  IonRow
} from '@ionic/react';
import incomingStudents from '@assets/question.jpeg';
import currentStudents from '@assets/currentStudents.jpeg';
import alumini from '@assets/alumini.jpeg';

import './css/templatemo-scholar.css';
import { image } from 'ionicons/icons';
import { RoadMap } from './RoadMap';
import { FAQ } from './FAQ';
import { SingleCard } from './SingleCard';

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
    }
  ];

  return (
    <IonGrid>
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
    </IonGrid>
  );
};
