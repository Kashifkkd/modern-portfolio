import React from "react";

const certifications = [
  {
    name: "Full Stack Developer",
    authority: "Coursers",
    date: "Dec 2023",
  },
  {
    name: "MERN Stack Developer",
    authority: "Coursersa",
    date: "Feb 2022",
  },
  {
    name: "AWS, MicroServices & Serverless",
    authority: "Self Learning",
    date: "Aug 2022",
  },
  {
    name: "SEO - Search Engine Optimization",
    authority: "Udemy",
    date: "Aug 2020",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-[96px] max-w-5xl mx-auto mt-20 md:mt-32 px-4 md:px-8 lg:px-10">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-blue-600 dark:text-blue-400">Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {certifications.map((c, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 border border-blue-100 dark:border-zinc-800 flex flex-col items-center">
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{c.name}</span>
            <span className="text-gray-700 dark:text-gray-300 mb-1">{c.authority}</span>
            <span className="text-xs text-gray-400">{c.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
} 