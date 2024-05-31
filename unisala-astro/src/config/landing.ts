import type { InfoLdg } from "@/types";

export const infos: InfoLdg[] = [
  {
    title: "Webinar: University Journey",
    description: "Join our weekly webinars at Unisala, where we bring guest speakers from the U.S. who are currently pursuing their major. Each session explores a different major, offering insights into the curriculum, scope, and opportunities in the USA.",
    image: "/images/web.webp",
    list: [
      {
        "title": "Alumni Stories",
        "description": "Hear graduates stories, experiences, challenges, and successes.",
        "icon": "lucide:user-check"
      },
      {
        title: "Q&A Sessions",
        description: "Participate in live Q&A sessions with current students and alumni.",
        icon: "lucide:help-circle",
      },
      {
        title: "Discover Majors",
        "description": "Explore the unique aspects and demands of various fields of study.",
        icon: "lucide:book-open",
      },
      {
        "title": "Academic Paths",
        "description": "Discover coursework, research, and outcomes at different U.S. universities.",
        "icon": "lucide:map-pin"
      },
      {
        "title": "Career Prospects",
        "description": "Explore career opportunities, job market trends, and potential paths.",
        "icon": "lucide:briefcase"
      }
    ]
  }
];
export const features = [
  {
    title: " University Suggestions",
    description: "Recommend universities based on your academic profile and preferences.",
    link: "/suggest-university",
    icon: "lucide:star",
    image:"/images/unisala-suggest-university.webp"
  },
  {
    title: "Ask Question About University",
    description: "Get answers from community to your inquiries and seek guidance about universities.",
    link: "/ask-question-university",
    icon: "lucide:circle-help",
    image:"/images/ask-university-question-to-community-unisala.webp"
  },
  {
    title: "Discover Your Space",
    description: "Find and join a community of like-minded individuals. Share your field of study and grow together.",
    link: "/networking",
    icon: "lucide:users",
    image:"/images/like-minded-peope-space.webp"
  },

];

export const featuresSecond = [

  {
    "title": "NSA Events",
    "description": "Stay connected with your NSA community, no matter where you are. Find and join alumni and student events across states, keeping the spirit of home alive.",
    "link": "/post-events",
    "icon": "lucide:calendar",
    image:"/images/nsas_events_unisala.webp"
  },
  {
    title: "Student-Alumini Networking",
    "description": "Connect with alumni and classmates to explore career opportunities and gain industry insights.",
    link: "/career-portal",
    icon: "lucide:briefcase",
    image:"/images/alumini-stories.webp"
  },
  {
    title: "Rate your University",
    description: "Rate your university and share your journey to guide future students.",
    link: "/review-university",
    icon: "lucide:circle-help",
    image:"/images/university-ratings-unisala.webp"
  },
];

export const testimonials = [
  {
    name: "Graduate Student",
    job: "University of Houston-Clear Lake",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    icon: "🎓",
    review: "My experience at UH-Clear Lake was excellent. One of the highlights of UHCL is its strategic partnerships with NASA and Boeing, which open up numerous opportunities for students. UHCL even has a department that provides compensation for unpaid internships elsewhere. My time at UHCL was fantastic, and I wholeheartedly recommend it to everyone.",
    ratings: {
      admission: 5.0,
      careerResources: 4.0,
    }
  },
  {
    name: "Undergraduate Student",
    job: "University of New Mexico-Main Campus",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    icon: "📚",
    review: "I highly recommend University of New Mexico for affordable and great academic programs. Plus the international student life is really awesome.",
    ratings: {
      studentLife: 4.0,
      careerResources: 3.0,
    }
  },
  {
    name: "Undergraduate Student",
    job: "University of Louisiana at Monroe",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    icon: "🎓",
    review:      "Why did the Warhawks choose ULM? Because they wanted to soar to success in style.",
  },
  {
    name: "Undergraduate Student",
    job: "Youngstown State University",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    icon: "🌍",
    review: "Nepalese Student Association (NSA) at YSU is a student organization of YSU dedicated to sharing the Nepalese culture throughout the university and the surrounding community.",
  },
  {
    name: "PhD Student",
    job: "University of Cincinnati-Blue Ash College",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    icon: "🎓",
    review: "Highly recommend! Best CEAS department.",
    ratings: {
      academicPrograms: 5.0,
      financialAid: 3.0,

    }
  },
  {
    name: "Undergraduate Student",
    job: "Washburn University",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    icon: "🚫",
    review: "The University does not help international students for career growth and advancement.",
    ratings: {
      academicPrograms: 2.0,
    }
  },
  {
    name: "Graduate Student",
    job: "Southeastern Louisiana University",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    icon: "🎓",
    review: "Southeastern Louisiana University offers a great experience for computer science graduates. As a graduate of the computer science program, I found the university to be a conducive environment for academic and professional growth. The computer science professors are knowledgeable, approachable, and committed to fostering a strong learning environment",
    ratings: {
      studentLife: 4,
    }
  },
  {
    name: "Undergraduate Student",
    job: "Fisk University",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    icon: "🎓",
    review:
      "At least 4 projects under your belt till you finish undergraduate studies. Good amount of scholarships. Good Research and Exposure with Great Career Center Support.",
    ratings: {
      studentLife: 3.0,
      careerResources: 5.0,
    }
  },
  {
    name: "Undergraduate Student",
    job: "McNeese State University",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    review: "For a computer science major, the quality of education is deemed average. However, proactive students can excel by dedicating themselves to coursework, conducting independent research, and actively engaging with professors.",
    ratings: {
      admission: 5,
      studentLife: 3,
    }
  }

];
