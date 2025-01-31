import React, { useState } from "react";
import { sendGAEvent } from "@/utils/analytics/events";

interface IAward {
  award_name?: string;
  scholarship_amount?: {
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
  international_specific: boolean;
  transfer_specific: boolean;
  application_deadline: string | null;
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
  const [showIframe, setShowIframe] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
    sendGAEvent("scholarship_card_expand", {
      category: "Scholarship",
      label: scholarship.scholarship_name,
      value: expanded ? 0 : 1,
    });
  };

  const handleApplyNow = () => {
    setShowIframe(true);
    sendGAEvent("scholarship_apply_click", {
      category: "Scholarship",
      label: scholarship.scholarship_name,
      value: scholarship.unitId,
    });
  };

  const handleExternalLinkClick = () => {
    sendGAEvent("scholarship_external_link_click", {
      category: "Scholarship",
      label: scholarship.scholarship_name,
      value: scholarship.unitId,
    });
  };

  const handleIframeClose = () => {
    setShowIframe(false);
    sendGAEvent("scholarship_iframe_close", {
      category: "Scholarship",
      label: scholarship.scholarship_name,
      value: scholarship.unitId,
    });
  };

  return (
    <>
      {showIframe && (
        <div className="iframe-wrapper">
          <div className="iframe-container">
            <div className="w-full h-8 items-center gap-3 flex justify-end px-4">
              <a
                href={scholarship?.scholarship_url}
                target="_blank"
                rel="noopener noreferrer"
                className="iframe-external-link"
                onClick={handleExternalLinkClick}
              >
                <i className="fas fa-external-link-alt"></i>
              </a>

              <button className="iframe-close-btn" onClick={handleIframeClose}>
                Close
              </button>
            </div>

            <iframe
              src={scholarship?.scholarship_url}
              title="Scholarship Application"
              className="iframe"
              onLoad={() => {
                document
                  .querySelector(".loading-overlay")
                  ?.classList.add("deactive");
              }}
            ></iframe>
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      )}

      <div className="scholarship-card">
        <div className="card-header">
          <div>
            <h2 className="title">{scholarship?.scholarship_name}</h2>
            <p className="institution">
              <i className="fas fa-university"></i>
              {scholarship?.university_name}
            </p>
          </div>
          <button title="Share scholarship" className="favorite-btn">
            <i
              className="fas fa-share"
              onClick={() => {
                sendGAEvent("scholarship_favorite_click", {
                  category: "Scholarship",
                  label: scholarship.scholarship_name,
                  value: scholarship.unitId,
                });
              }}
            ></i>
          </button>
        </div>
        <div className="card-body">
          <div className="info-grid">
            <div className="info-item">
              <span className="label">
                <i className="fas fa-graduation-cap"></i> Level
              </span>
              <span className="value">{scholarship?.level}</span>
            </div>
            <div className="info-item">
              <span className="label">
                <i className="fas fa-award"></i> Type
              </span>
              <span className="value">{scholarship.scholarship_type}</span>
            </div>
            {scholarship.awards.length > 0 &&
              scholarship.awards[0]?.scholarship_amount && (
                <div className="info-item">
                  <span className="label">
                    <i className="fas fa-dollar-sign"></i> Amount
                  </span>
                  <span className="value amount">
                    {scholarship.awards[0].scholarship_amount.amount}
                    {
                      scholarship.awards[0].scholarship_amount
                        .disbursement_schedule
                    }
                  </span>
                </div>
              )}
            {scholarship.application_deadline && (
              <div className="info-item">
                <span className="label">
                  <i className="fas fa-calendar-alt"></i> Deadline
                </span>
                <span className="value deadline">
                  {new Date(
                    scholarship?.application_deadline
                  ).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          <div className="eligibility">
            <h3>
              <i className="fas fa-check-circle"></i> Eligibility Criteria
            </h3>
            <div className="eligibility-grid">
              <div className="eligibility-item">
                <i className="fas fa-graduation-cap"></i>
                <span className="label">GPA</span>
                <span className="value">
                  {scholarship?.gpa.min} - {scholarship?.gpa.max}
                </span>
              </div>
              <div className="eligibility-item">
                <i className="fas fa-file-alt"></i>
                <span className="label">SAT</span>
                <span className="value">
                  {scholarship?.sat?.min} - {scholarship?.sat?.max}
                </span>
              </div>
              <div className="eligibility-item">
                <i className="fas fa-pencil-alt"></i>
                <span className="label">ACT</span>
                <span className="value">
                  {scholarship?.act?.min} - {scholarship?.act?.max}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button onClick={handleApplyNow} className="apply-btn">
            Apply Now <i className="fas fa-arrow-right"></i>
          </button>
          <button
            className="expand-btn"
            aria-expanded={expanded}
            onClick={handleExpand}
          >
            <span className="expand-text">Show More</span>
            <span className="collapse-text">Show Less</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        <div className="expanded-content">
          <h3 className="expanded-title">
            <i className="fas fa-info-circle"></i> Additional Information
          </h3>
          {scholarship?.application_requirements.length > 0 && (
            <div className="expanded-section">
              <h4>
                <i className="fas fa-clipboard-list"></i> Application
                Requirements
              </h4>
              <ul>
                {scholarship?.application_requirements.map((req, index) => (
                  <li key={index} className="dark:text-neutral-200">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {scholarship?.renewal_criteria?.min_gpa ||
            scholarship?.renewal_criteria?.min_credit_hours ||
            (scholarship?.renewal_criteria?.other_requirements && (
              <div className="expanded-section">
                <h4>
                  <i className="fas fa-sync-alt"></i> Renewal Criteria
                </h4>
                {scholarship?.renewal_criteria?.min_gpa && (
                  <p>
                    <i className="fas fa-graduation-cap"></i> Minimum GPA:{" "}
                    <span className="highlight">
                      {scholarship?.renewal_criteria?.min_gpa}
                    </span>
                  </p>
                )}
                {scholarship?.renewal_criteria?.min_credit_hours && (
                  <p>
                    <i className="fas fa-book"></i> Minimum Credit Hours:{" "}
                    <span className="highlight">
                      {scholarship?.renewal_criteria?.min_credit_hours}
                    </span>
                  </p>
                )}
                {scholarship?.renewal_criteria?.other_requirements && (
                  <p>
                    <i className="fas fa-exclamation-circle"></i> Other:{" "}
                    {scholarship?.renewal_criteria?.other_requirements}
                  </p>
                )}
              </div>
            ))}
          {/* Addition information CARD */}
          <div className="expanded-section">
            <h4>
              <i className="fas fa-plus-circle"></i> Additional Information
            </h4>
            {scholarship?.duration_description && (
              <p>
                <i className="fas fa-calendar-alt"></i> Duration:{" "}
                {scholarship?.duration_description}
              </p>
            )}
            <p>
              <i className="fas fa-layer-group"></i> Stackable:{" "}
              <span className="highlight">
                {scholarship?.stackable ? "Yes" : "No"}
              </span>
            </p>
            {scholarship?.special_instructions && (
              <p>
                <i className="fas fa-info-circle"></i> Special Instructions:{" "}
                {scholarship?.special_instructions}
              </p>
            )}
            {scholarship?.non_score_eligibility_requirements && (
              <p>
                <i className="fas fa-user-check"></i> Non-Score Eligibility:{" "}
                {scholarship?.non_score_eligibility_requirements}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipCard;
