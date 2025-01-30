import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardSubtitle } from "../../defaults";
import noResultsFound from "@assets/no-results.jpg";

export const ApiError = () => {
  const texts = [
    'Around 858,400 international students were enrolled in higher education in the U.S. in 2022-2023.',
    'Another roughly 200,000 were gaining work experience closely related to their degree for a limited period after graduating.',
    'The total number of international students (including those enrolled in a program and those working after school in OPT) represents about 5.6% of the nearly 19 million college students in the U.S. in 2022-2023.',
    'The number of international students increased by around 11.5% compared to the previous academic year.',
    'Prior to the pandemic, international student enrollment reached an all-time high.',
    'During the five years before COVID-19 hit, the number of international students in the U.S. reached over 1 million.',
    'The COVID-19 pandemic had a significant impact on international students studying in the U.S.',
    'Overall international student enrollment dropped 15% from the year prior — the largest dip ever recorded.',
    'New student enrollment among international students fell a whopping 46%.',
    'A 4% increase in total international students in the U.S. was observed in fall 2021.',
    'An 8% increase in enrolled international students was observed in fall 2021.',
    'A 43% increase in international student applications was observed in fall 2021.',
    'A 68% increase in new international students was observed in fall 2021.',
    'The countries with the most students studying in the U.S. are China and India.',
    'China and India are the two largest countries by population, each with around 1.4 billion residents.',
    'In the 2022-2023 school year, there were about 120,000 more international students enrolled in graduate programs than undergraduate programs.',
    'Among international students in the U.S. during the 2022-2023 academic year, the five most common fields of study were Math and computer science (23%), Engineering (18%), Business and management (15%), "Other fields" including multi/interdisciplinary studies, liberal arts, and general studies (8%), and Social sciences (8%).',
    'Many international students participate in Optional Practical Training (OPT) programs after completing their studies, allowing them to gain work experience in the USA for up to 12 months (or up to 36 months for STEM graduates).',
    'Where Dreams Meet Destinations.',
    'Your Guide to Success in the USA.',
    'Empowering Your Path to U.S. Universities.',
    'Bridging Borders, Building Futures.',
    'Unlocking Opportunities, Creating Connections.',
    'Your Key to U.S. Education and Beyond.',
    'Empowering Every Step of Your Journey.',
    'Navigate Your U.S. University Experience with Confidence.',
    'Where Knowledge Meets Community.',
    'Your Compass in the Complex World of Higher Education.',
    'The number of international students enrolled in US colleges and universities exceeded one million for the first time during the 2015-2016 academic year.',
    'California, New York, and Texas are the top three states hosting international students in the USA.',
    'In recent years, the percentage of international students pursuing graduate degrees in the USA has been steadily increasing.',
    'The Fulbright Program, sponsored by the US government, is one of the oldest and most prestigious international exchange programs, bringing international students to the USA for academic study and cultural exchange.',
    'International students often contribute to diversity initiatives on US campuses, bringing unique perspectives and experiences to academic and social settings.',
    'Chinese and Indian students comprise the largest percentage of international students in the USA, followed by students from South Korea, Saudi Arabia, and Canada.',
    'Despite challenges such as language barriers and cultural adjustment, international students often report high levels of satisfaction with their educational experiences in the USA.'
  ];

  const [currentText, setCurrentText] = useState(texts[0] || ""); // Initializes to the first text or an empty string if texts is empty

  function changeText() {
    const newText = texts[Math.floor(Math.random() * texts.length)];
    setCurrentText(newText);
  }
  useEffect(() => {
    // Create the interval and store the interval ID
    const intervalId = setInterval(changeText, 5000);

    // Return the cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []); // The empty ar

  return (
    <>
      <Card
        style={{ textAlign: "center", marginInline: "auto" }}
        className="max-width-container "
      >
        <img alt="unisala: no results found" src={noResultsFound} />
        <CardHeader>
          <CardTitle>{currentText}</CardTitle>
          <CardSubtitle>Sorry, Service is down at the moment &#9785;</CardSubtitle>
        </CardHeader>
      </Card>
    </>
  );
};
