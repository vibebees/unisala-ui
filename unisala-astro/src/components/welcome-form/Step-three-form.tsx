import React, { useState } from 'react';
import { GraduationCap, School, User, Book, Star } from 'lucide-react';
import { useAstroMutation } from '@/datasource/apollo-client';
import { EditProfile } from '@/datasource/graphql/user';
import Button from './atoms/Button';
import Option from './atoms/Option';
import { shakeWebsite } from '@/utils/lib/utils';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { getCache } from '@/utils/cache';
import { navigator } from '@/utils/lib/URLupdate';
import { Toast } from '@/components/ui/toast';
import toast from 'react-hot-toast';

const StepThreeForm = () => {
  const [selectedBackground, setSelectedBackground] = useState(
    localStorage.getItem('studyLevel') || ''
  );
  const [editProfile, { loading }] = useAstroMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data: any) => {
      toast.success("Profile setup successfully!");
      navigator();
    },
    onError: (error: any) => {
      toast.error("Error setting up profile. Please try again.");
    },
  });

  const handleBackgroundChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('studyLevel', event.target.value);
    setSelectedBackground(event.target.value);
  };

  const userData = getCache('authData');
const backgroundOptions = [
  { value: "undergraduate", Icon: GraduationCap, label: "Undergraduate 🎓" },
  { value: "graduate", Icon: Book, label: "Graduate Student 📚" },
  { value: "phd", Icon: Star, label: "PhD Student 🔬" },
  { value: "faculty", Icon: School, label: "Faculty 👨‍🏫" },
  { value: "other", Icon: User, label: "Other 👋" }
];

  const handleSubmit = () => {
    const userStatus = localStorage.getItem('userStatus');
    const interestedSubjects = localStorage.getItem('interestedSubjects');
    const studyLevel = localStorage.getItem('studyLevel');

    const currentUrl = new URL(window.location.href);
    const redirect = currentUrl.searchParams.get('redirect');

    if (!userStatus || !interestedSubjects || !studyLevel) {
      let redirectPath = '';

      if (!userStatus) {
        redirectPath = 'step-one';
      } else if (!interestedSubjects) {
        redirectPath = 'step-two';
      } else if (!studyLevel) {
        redirectPath = 'step-three';
      }

      if (redirectPath) {
        const finalRedirectPath = redirect 
          ? `${redirectPath}?redirect=${encodeURIComponent(redirect)}`
          : redirectPath;

        window.location.href = finalRedirectPath;
      }

      shakeWebsite();
    } else {
      const data = {
        userStatus,
        interestedSubjects: JSON.parse(interestedSubjects),
        studyLevel
      };
      editProfile({
        variables: {
          ...data
        }
      }).then(() => {
        // After successful profile edit, redirect if the parameter exists
        if (redirect) {
          window.location.href = decodeURIComponent(redirect);
        }
      });
    }
  };

  return (
    <div className="welcome-form-container animate-fadeIn">
      <Toast />

      <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-slideDown flex items-center">
        <User className="mr-2" size={32} />
        What best describes your current status?
      </h2>
      <p className="text-lg text-gray-600 mb-6 animate-slideDown animation-delay-150">
        Select the option that most closely matches your background
      </p>

      <div className="grid grid-cols-1 gap-4 mb-8 animate-fadeIn animation-delay-300">
        {backgroundOptions.map((option) => (
          <Option
            key={option.value}
            {...option}
            handleStatusChange={handleBackgroundChange}
            option={option}
            selectedStatus={selectedBackground}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col">
        <Button
          url={null}
          label="Complete Profile"
          className={`${
            selectedBackground ? 'bg-blue-500 text-white' : 'bg-neutral-300'
          } font-medium border border-transparent select-none hover:bg-primary-600 mt-5`}
          onclick={() => {
            if (!selectedBackground) {
              shakeWebsite();
            } else {
              handleSubmit();
            }
          }}
        />
        <Button
          url="step-two"
          label="Back"
          className="bg-transparent font-medium border-neutral-300 border text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 mt-5"
          onclick={() => {navigator('/welcome-form/step-two')}}
        />
      </div>
    </div>
  );
};

export default StepThreeForm;