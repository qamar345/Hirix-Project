import React from "react";
import { JobCard } from "../index.js";
import {
  givethLogo,
  avatarUxper,
  coinTracker,
  nightFall,
} from "../assets/icons/index.js";
const JobList = () => {
  const jobs = [
    {
      id: 1,
      logo: givethLogo,
      title: "Sr. Visual Designer",
      author: "Giveth",
      company: "Design & Creative",
      timing: "Full Time",
      city: "Boston",
      salary: "$500 - $1,000/month",
      remainingDays: "251",
      isFeatured: true,
      isSelected: false,
      isUrgent: false,
    },
    {
      id: 2,
      logo: avatarUxper,
      title: "Director of Content",
      author: "Uxper",
      company: "Writing & Translation",
      timing: "Part Time",
      city: "California",
      salary: "Negotiable Price",
      remainingDays: "251",
      isFeatured: false,
      isSelected: true,
      isUrgent: false,
    },
    {
      id: 3,
      logo: coinTracker,
      title: "Customer Service Agent",
      author: "CoinTracker",
      company: "Customer Service",
      timing: "Full Time",
      city: "Boston",
      salary: "$150 - $320/week",
      remainingDays: "38",
      isFeatured: false,
      isSelected: false,
      isUrgent: false,
    },
    {
      id: 4,
      logo: nightFall,
      title: "Head of Analytics Engineering",
      author: "Nightfall",
      company: "Legal & Finance",
      timing: "Remote",
      city: "New York",
      salary: "$300 - $600/month",
      remainingDays: "3",
      isFeatured: false,
      isSelected: false,
      isUrgent: true,
    },
  ];

  return (
    <div>
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
};

export default JobList;
