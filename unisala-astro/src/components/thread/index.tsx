import React, { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, FlaskConical, Atom } from 'lucide-react';
import { useAstroMutation, useAstroQuery } from '@/datasource/apollo-client';
import { EditProfile, GetPostById } from '@/graphql/user';
import Button from './atoms/Button';
import Option from './atoms/Option';
import { shakeWebsite } from '@/lib/utils';
import { USER_SERVICE_GQL } from '@/datasource/servers/types';
import { trackEvent } from '@/components/packages/analytics';

const StepThreeForm = () => {
  const id = "667adc362bf59de35465faa1"
  const { data: threadData, loading } = useAstroQuery(GetPostById, {
    context: { server: USER_SERVICE_GQL },
    variables: { id },
  }),
  getPostById = threadData?.getPostById || {},
  thread = getPostById?.post || {}


  useEffect(() => {
    trackEvent({
      action: "Thread_page_viewed_"+ id,
      category: "Thread_view",
      label: "thread_view",
    });
  }, []);


 
  

  return (
    <div className="welcome-form-container animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-2 animate-slideDown flex items-center">
        <GraduationCap className="mr-2" size={32} />
        What degree are you pursuing?
      </h2>
      <p className="text-lg text-gray-600 mb-6 animate-slideDown animation-delay-150">
        Please select your intended level of study
      </p>

   


    </div>
  );
};

export default StepThreeForm;
