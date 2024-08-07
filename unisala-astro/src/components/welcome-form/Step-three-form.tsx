import React, { useState } from 'react';
import { GraduationCap, BookOpen, FlaskConical, Atom } from 'lucide-react';
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
  const [selectedStatus, setSelectedStatus] = useState(
    localStorage.getItem('studyLevel') || ''
  );
  const [editProfile, { loading }] = useAstroMutation(EditProfile, {
    context: { server: USER_SERVICE_GQL },
    onCompleted: (data) => {
      toast.success("Profile is setup successfully!");
      navigator();
  },
  onError: (error) => {
  },
  });

  const handleStatusChange = (event: any) => {
    localStorage.setItem('studyLevel', event.target.value);
    setSelectedStatus(event.target.value);
  };
  const userData = getCache('authData');
  const options = [
    { value: 'bachelor', Icon: BookOpen, label: 'Bachelor' },
    { value: 'masters', Icon: FlaskConical, label: 'Masters' },
    { value: 'phd', Icon: Atom, label: 'PHD' }
  ];

  const handleSubmit = () => {
    const userStatus = localStorage.getItem('userStatus');
    const interestedSubjects = localStorage.getItem('interestedSubjects');
    const studyLevel = localStorage.getItem('studyLevel');
    const currentUrl = new URL(window.location.href);
    const redirect = currentUrl.searchParams.get('redirect');
    
    if (!userStatus || !interestedSubjects || !studyLevel) {
      if (!userStatus) {
        window.location.href = 'step-one';
      }
      if (!interestedSubjects) {
        window.location.href = 'step-two';
      }
      if (!studyLevel) {
        window.location.href = 'step-three';
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
      });
    }
  };

  return (
    <div className="welcome-form-container animate-fadeIn">
           <Toast />

      <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-slideDown flex items-center">
        <GraduationCap className="mr-2" size={32} />
        What degree are you pursuing?
      </h2>
      <p className="text-lg text-gray-600 mb-6 animate-slideDown animation-delay-150">
        Please select your intended level of study
      </p>

      <div className="grid grid-cols-1 gap-4 mb-8 animate-fadeIn animation-delay-300">
        {options.map((option) => (
          <Option
            key={option.value}
            {...option}
            handleStatusChange={handleStatusChange}
            option={option}
            selectedStatus={selectedStatus}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col ">
        <Button
          url={null}
          lable="submit"
          className={`${
            selectedStatus ? 'bg-blue-500 text-white' : 'bg-neutral-300'
          } font-medium border border-transparent select-none hover:bg-primary-600 mt-5`}
          onclick={() => {
            if (!selectedStatus) {
              shakeWebsite();
            } else {
              handleSubmit();
            }
          }}
        />
        <Button
          url="step-two"
          lable="Back"
          className="bg-transparent font-medium border-neutral-300 border text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 mt-5"
        />
      </div>
    </div>
  );
};

export default StepThreeForm;
