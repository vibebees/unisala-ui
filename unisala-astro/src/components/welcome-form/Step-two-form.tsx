/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import Button from "./atoms/Button";
import { shakeWebsite } from "@/utils/lib/utils";
import { navigator } from "@/utils/lib/URLupdate";

interface FieldOfStudyProps {
  // Add any props if needed
}

interface Major {
  name: string;
  universityCount: number;
}

const FieldOfStudy: React.FC<FieldOfStudyProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFields, setSelectedFields] = useState<string[]>(
    JSON.parse(localStorage.getItem("interestedSubjects") || "[]")
  );
  const [filteredMajors, setFilteredMajors] = useState<Major[]>([]);

const data =  [
    {
      "name": "english",
      "universityCount": 1776
    },
    {
      "name": "mathematics",
      "universityCount": 1727
    },
    {
      "name": "psychology",
      "universityCount": 1726
    },
    {
      "name": "biology",
      "universityCount": 1669
    },
    {
      "name": "history",
      "universityCount": 1652
    },
    {
      "name": "business",
      "universityCount": 1614
    },
    {
      "name": "computer science",
      "universityCount": 1554
    },
    {
      "name": "chemistry",
      "universityCount": 1521
    },
    {
      "name": "education",
      "universityCount": 1512
    },
    {
      "name": "communication",
      "universityCount": 1467
    },
    {
      "name": "music",
      "universityCount": 1446
    },
    {
      "name": "science",
      "universityCount": 1438
    },
    {
      "name": "sociology",
      "universityCount": 1422
    },
    {
      "name": "economics",
      "universityCount": 1361
    },
    {
      "name": "philosophy",
      "universityCount": 1341
    },
    {
      "name": "accounting",
      "universityCount": 1328
    },
    {
      "name": "languages",
      "universityCount": 1305
    },
    {
      "name": "political science",
      "universityCount": 1276
    },
    {
      "name": "fine arts",
      "universityCount": 1259
    },
    {
      "name": "health science",
      "universityCount": 1252
    },
    {
      "name": "physics",
      "universityCount": 1249
    },
    {
      "name": "art history",
      "universityCount": 1178
    },
    {
      "name": "humanities",
      "universityCount": 1146
    },
    {
      "name": "nursing",
      "universityCount": 1124
    },
    {
      "name": "not specified",
      "universityCount": 1094
    },
    {
      "name": "theater",
      "universityCount": 1084
    },
    {
      "name": "criminal justice",
      "universityCount": 1065
    },
    {
      "name": "social science",
      "universityCount": 998
    },
    {
      "name": "physical education",
      "universityCount": 916
    },
    {
      "name": "religion",
      "universityCount": 903
    },
    {
      "name": "management",
      "universityCount": 820
    },
    {
      "name": "engineering",
      "universityCount": 816
    },
    {
      "name": "anthropology",
      "universityCount": 807
    },
    {
      "name": "marketing",
      "universityCount": 791
    },
    {
      "name": "writing",
      "universityCount": 755
    },
    {
      "name": "law",
      "universityCount": 739
    },
    {
      "name": "social work",
      "universityCount": 723
    },
    {
      "name": "graphic arts",
      "universityCount": 707
    },
    {
      "name": "geography",
      "universityCount": 667
    },
    {
      "name": "literature",
      "universityCount": 658
    },
    {
      "name": "geology",
      "universityCount": 651
    },
    {
      "name": "finance",
      "universityCount": 629
    },
    {
      "name": "physical ed",
      "universityCount": 609
    },
    {
      "name": "design",
      "universityCount": 598
    },
    {
      "name": "information science",
      "universityCount": 571
    },
    {
      "name": "medicine",
      "universityCount": 570
    },
    {
      "name": "film",
      "universityCount": 514
    },
    {
      "name": "art",
      "universityCount": 470
    },
    {
      "name": "journalism",
      "universityCount": 465
    },
    {
      "name": "women's studies",
      "universityCount": 463
    },
    {
      "name": "theology",
      "universityCount": 411
    },
    {
      "name": "ethnic studies",
      "universityCount": 404
    },
    {
      "name": "international studies",
      "universityCount": 366
    },
    {
      "name": "architecture",
      "universityCount": 339
    },
    {
      "name": "agriculture",
      "universityCount": 337
    },
    {
      "name": "classics",
      "universityCount": 316
    },
    {
      "name": "spanish",
      "universityCount": 312
    },
    {
      "name": "hospitality",
      "universityCount": 308
    },
    {
      "name": "culinary arts",
      "universityCount": 268
    },
    {
      "name": "french",
      "universityCount": 193
    },
    {
      "name": "speech",
      "universityCount": 159
    },
    {
      "name": "dance",
      "universityCount": 156
    },
    {
      "name": "foreign languages",
      "universityCount": 148
    },
    {
      "name": "counseling",
      "universityCount": 143
    },
    {
      "name": "astronomy",
      "universityCount": 141
    },
    {
      "name": "business administration",
      "universityCount": 137
    },
    {
      "name": "german",
      "universityCount": 134
    },
    {
      "name": "photography",
      "universityCount": 133
    },
    {
      "name": "computer information systems",
      "universityCount": 130
    },
    {
      "name": "environmental science",
      "universityCount": 111
    },
    {
      "name": "reading",
      "universityCount": 108
    },
    {
      "name": "english as a second language",
      "universityCount": 106
    },
    {
      "name": "nutrition",
      "universityCount": 105
    },
    {
      "name": "early childhood education",
      "universityCount": 101
    },
    {
      "name": "japanese",
      "universityCount": 101
    },
    {
      "name": "statistics",
      "universityCount": 100
    },
    {
      "name": "religious studies",
      "universityCount": 98
    },
    {
      "name": "child development",
      "universityCount": 93
    },
    {
      "name": "automotive technology",
      "universityCount": 93
    },
    {
      "name": "environmental studies",
      "universityCount": 85
    },
    {
      "name": "library science",
      "universityCount": 82
    },
    {
      "name": "electrical engineering",
      "universityCount": 82
    },
    {
      "name": "technology",
      "universityCount": 82
    },
    {
      "name": "anatomy",
      "universityCount": 81
    },
    {
      "name": "information technology",
      "universityCount": 81
    },
    {
      "name": "kinesiology",
      "universityCount": 81
    },
    {
      "name": "biological sciences",
      "universityCount": 79
    },
    {
      "name": "health",
      "universityCount": 77
    },
    {
      "name": "mechanical engineering",
      "universityCount": 76
    },
    {
      "name": "athletics",
      "universityCount": 74
    },
    {
      "name": "speech communication",
      "universityCount": 73
    },
    {
      "name": "chinese",
      "universityCount": 71
    },
    {
      "name": "biochemistry",
      "universityCount": 70
    },
    {
      "name": "african-american studies",
      "universityCount": 69
    },
    {
      "name": "civil engineering",
      "universityCount": 66
    },
    {
      "name": "earth science",
      "universityCount": 65
    },
    {
      "name": "italian",
      "universityCount": 65
    },
    {
      "name": "linguistics",
      "universityCount": 63
    },
    {
      "name": "special education",
      "universityCount": 62
    },
    {
      "name": "sign language",
      "universityCount": 62
    },
    {
      "name": "academic services",
      "universityCount": 61
    },
    {
      "name": "government",
      "universityCount": 61
    },
    {
      "name": "information systems",
      "universityCount": 61
    },
    {
      "name": "interdisciplinary studies",
      "universityCount": 61
    },
    {
      "name": "administration",
      "universityCount": 60
    },
    {
      "name": "human services",
      "universityCount": 60
    },
    {
      "name": "family & consumer science",
      "universityCount": 59
    },
    {
      "name": "honors",
      "universityCount": 58
    },
    {
      "name": "interior design",
      "universityCount": 57
    },
    {
      "name": "select department",
      "universityCount": 55
    },
    {
      "name": "business law",
      "universityCount": 55
    },
    {
      "name": "health & physical education",
      "universityCount": 55
    },
    {
      "name": "welding",
      "universityCount": 53
    },
    {
      "name": "microbiology",
      "universityCount": 52
    },
    {
      "name": "behavioral sciences",
      "universityCount": 52
    },
    {
      "name": "occupational therapy",
      "universityCount": 51
    },
    {
      "name": "communication studies",
      "universityCount": 50
    },
    {
      "name": "allied health",
      "universityCount": 49
    },
    {
      "name": "american studies",
      "universityCount": 49
    },
    {
      "name": "modern languages",
      "universityCount": 49
    },
    {
      "name": "leadership",
      "universityCount": 49
    }
    ]

  useEffect(() => {
    const filtered = data
      .filter((major) =>
        major.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => b.universityCount - a.universityCount);
    setFilteredMajors(filtered);
  }, [searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleFieldSelection = (field: string) => {
    setSelectedFields((prev) => {
      const newFields = [...prev];
      const index = newFields.indexOf(field);
      if (index > -1) {
        newFields.splice(index, 1);
      } else {
        newFields.push(field);
      }
      localStorage.setItem("interestedSubjects", JSON.stringify(newFields));
      return newFields;
    });
  };

  return (
    <div className="welcome-form-container animate-fadeIn">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-slideDown">
        Field of Study
      </h2>
      <p className="text-lg text-gray-600 mb-6 animate-slideDown animation-delay-150">
        Select the field of study you are interested in
      </p>

      <div className="relative mb-6 animate-slideDown animation-delay-300">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 ease-in-out"
          size={20}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search fields..."
          className="w-full pl-10 pr-10 py-3 warning text-neutral-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ease-in-out hover:rotate-90"
          >
            <X className="text-gray-400 hover:text-gray-600" size={20} />
          </button>
        )}
      </div>

      <div className="max-h-64 overflow-y-auto animate-fadeIn animation-delay-500">
        {filteredMajors.map((major, index) => (
          <label
            key={index}
            className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-300 ease-in-out animate-slideRight"
            style={{ animationDelay: `${index * 50 + 500}ms` }}
          >
            <input
              type="checkbox"
              checked={selectedFields.includes(major.name)}
              onChange={() => toggleFieldSelection(major.name)}
              className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-500 transition-all duration-300 ease-in-out"
            />
            <span className="ml-3 text-gray-700">{major.name}</span>
            <span className="ml-2 text-sm text-gray-500">({major.universityCount})</span>
          </label>
        ))}
      </div>

      <div className="mt-8 flex flex-col">
        <Button
          lable="Next"
          className={`${
            selectedFields.length ? "bg-blue-500 text-white" : "bg-neutral-300"
          } font-medium border border-transparent select-none hover:bg-primary-600 mt-5`}
          onclick={() => {
            if (!selectedFields.length) {
              shakeWebsite();
            }
            selectedFields.length ? navigator('/welcome-form/step-three') : null
          }}
        />
        <Button
          url="step-one"
          lable="Back"
          className="bg-transparent font-medium border-neutral-300 border text-neutral-400 hover:bg-neutral-200 hover:text-neutral-700 mt-5"
        />
      </div>
    </div>
  );
};

export default FieldOfStudy;