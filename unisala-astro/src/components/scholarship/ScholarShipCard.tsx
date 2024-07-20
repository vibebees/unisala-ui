import React, { useState } from "react";
import {
  University,
  Star,
  GraduationCap,
  Award,
  DollarSign,
  CalendarDays,
  CheckCircle,
  Info,
  ClipboardList,
  RefreshCw,
  Book,
  AlertCircle,
  PlusCircle,
  Layers,
  UserCheck,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

interface IAward {
  award_name: string;
  scholarship_amount: {
    amount: string;
    disbursement_schedule: string;
  };
}

interface RenewalCriteria {
  min_gpa: number;
  min_credit_hours: number;
  other_requirements: string;
}

interface Scholarship {
  scholarship_name: string;
  university_name: string;
  unitId: number;
  scholarship_type: string;
  level: string;
  scholarship_url: string;
  gpa: { min: number; max: number };
  sat: { min: number; max: number };
  act: { min: number; max: number };
  awards: IAward[];
  application_deadline: string;
  eligible_majors: string[];
  duration: number;
  duration_description: string;
  application_requirements: string[];
  renewal_criteria: RenewalCriteria;
  stackable: boolean;
  special_instructions: string;
  non_score_eligibility_requirements: string;
}

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
  const [expanded, setExpanded] = useState(false);

  const renderIfAvailable = (value: any, render: (val: any) => JSX.Element) => {
    return value !== undefined && value !== null && value !== ""
      ? render(value)
      : null;
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden mb-8 w-full font-inter">
      <div className="bg-blue-50 p-6 border-b border-gray-200 flex justify-between items-center transition-colors duration-300 hover:bg-blue-100">
        <div>
          {renderIfAvailable(scholarship.scholarship_name, (name) => (
            <h2 className="text-2xl font-semibold text-gray-700">{name}</h2>
          ))}
          {renderIfAvailable(scholarship.university_name, (uniName) => (
            <p className="text-blue-600 flex items-center gap-2 mt-2">
              <University size={18} /> {uniName}
            </p>
          ))}
        </div>
        <button className="inline-flex items-center gap-2 bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-full font-medium text-sm hover:bg-blue-600 hover:text-white transition-colors duration-300">
          <Star size={18} /> Favorite
        </button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {renderIfAvailable(scholarship.level, (level) => (
            <InfoItem icon={GraduationCap} label="Level" value={level} />
          ))}
          {renderIfAvailable(scholarship.scholarship_type, (type) => (
            <InfoItem icon={Award} label="Type" value={type} />
          ))}
          {renderIfAvailable(
            scholarship.awards?.[0]?.scholarship_amount,
            (amount) => (
              <InfoItem
                icon={DollarSign}
                label="Amount"
                value={`${amount.amount} ${amount.disbursement_schedule}`}
                className="text-green-500 font-semibold"
              />
            )
          )}
          {renderIfAvailable(scholarship.application_deadline, (deadline) => (
            <InfoItem
              icon={CalendarDays}
              label="Deadline"
              value={new Date(deadline).toLocaleDateString()}
              className="text-red-600 font-medium"
            />
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-lg text-blue-600 font-medium flex items-center gap-2 mb-3">
            <CheckCircle size={20} /> Eligibility Criteria
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {renderIfAvailable(scholarship.gpa, (gpa) => (
              <EligibilityItem
                icon={GraduationCap}
                label="GPA"
                value={`${gpa.min} - ${gpa.max}`}
              />
            ))}
            {renderIfAvailable(scholarship.sat, (sat) => (
              <EligibilityItem
                icon={GraduationCap}
                label="SAT"
                value={`${sat.min} - ${sat.max}`}
              />
            ))}
            {renderIfAvailable(scholarship.act, (act) => (
              <EligibilityItem
                icon={GraduationCap}
                label="ACT"
                value={`${act.min} - ${act.max}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        {renderIfAvailable(scholarship.scholarship_url, (url) => (
          <a
            href={url}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
          >
            Apply Now <ArrowRight size={18} />
          </a>
        ))}
        <button
          onClick={() => setExpanded(!expanded)}
          className="bg-white text-blue-600 border border-blue-600 px-6 py-2 rounded-full font-medium text-sm hover:bg-blue-50 transition-colors duration-300 flex items-center gap-2"
        >
          {expanded ? "Show Less" : "Show More"}
          <ChevronDown
            size={18}
            className={`transform transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {expanded && (
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h3 className="text-xl text-blue-600 font-medium flex items-center gap-2 mb-4">
            <Info size={20} /> Additional Information
          </h3>
          {renderIfAvailable(
            scholarship.application_requirements,
            (requirements) => (
              <ExpandedSection
                title="Application Requirements"
                icon={ClipboardList}
              >
                <ul className="list-none pl-6">
                  {requirements.map((req, index) => (
                    <li
                      key={index}
                      className="mb-2 relative before:content-['✓'] before:absolute before:-left-6 before:text-green-600"
                    >
                      {req}
                    </li>
                  ))}
                </ul>
              </ExpandedSection>
            )
          )}
          {renderIfAvailable(scholarship.renewal_criteria, (criteria) => (
            <ExpandedSection title="Renewal Criteria" icon={RefreshCw}>
              {renderIfAvailable(criteria.min_gpa, (gpa) => (
                <p className="flex items-center gap-2 mb-2">
                  <GraduationCap size={18} className="text-blue-600" />
                  Minimum GPA:{" "}
                  <span className="font-semibold text-blue-600">{gpa}</span>
                </p>
              ))}
              {renderIfAvailable(criteria.min_credit_hours, (hours) => (
                <p className="flex items-center gap-2 mb-2">
                  <Book size={18} className="text-blue-600" />
                  Minimum Credit Hours:{" "}
                  <span className="font-semibold text-blue-600">{hours}</span>
                </p>
              ))}
              {renderIfAvailable(criteria.other_requirements, (other) => (
                <p className="flex items-center gap-2">
                  <AlertCircle size={18} className="text-blue-600" />
                  Other: {other}
                </p>
              ))}
            </ExpandedSection>
          ))}
          <ExpandedSection title="Additional Information" icon={PlusCircle}>
            {renderIfAvailable(scholarship.duration_description, (duration) => (
              <p className="mb-2">
                <CalendarDays size={18} className="text-blue-600 inline mr-2" />
                Duration: {duration}
              </p>
            ))}
            {renderIfAvailable(scholarship.stackable, (stackable) => (
              <p className="mb-2">
                <Layers size={18} className="text-blue-600 inline mr-2" />
                Stackable:{" "}
                <span className="font-semibold text-blue-600">
                  {stackable ? "Yes" : "No"}
                </span>
              </p>
            ))}
            {renderIfAvailable(
              scholarship.special_instructions,
              (instructions) => (
                <p className="mb-2">
                  <Info size={18} className="text-blue-600 inline mr-2" />
                  Special Instructions: {instructions}
                </p>
              )
            )}
            {renderIfAvailable(
              scholarship.non_score_eligibility_requirements,
              (requirements) => (
                <p>
                  <UserCheck size={18} className="text-blue-600 inline mr-2" />
                  Non-Score Eligibility: {requirements}
                </p>
              )
            )}
          </ExpandedSection>
        </div>
      )}
    </div>
  );
};

const InfoItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  className?: string;
}> = ({ icon: Icon, label, value, className }) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-600 mb-1 flex items-center gap-2">
      <Icon size={18} className="text-blue-600" /> {label}
    </span>
    <span className={`text-base text-gray-800 ${className}`}>{value}</span>
  </div>
);

const EligibilityItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
}> = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col items-center text-center border border-gray-200 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
    <Icon size={24} className="text-blue-600 mb-2" />
    <span className="text-sm text-gray-600 mb-1">{label}</span>
    <span className="text-base font-semibold text-gray-800">{value}</span>
  </div>
);

const ExpandedSection: React.FC<{
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}> = ({ title, icon: Icon, children }) => (
  <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
    <h4 className="text-lg text-blue-600 font-medium flex items-center gap-2 mb-3">
      <Icon size={20} /> {title}
    </h4>
    {children}
  </div>
);

export default ScholarshipCard;
