import React from "react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="max-w-4xl mx-auto mt-20 md:mt-32 px-4 md:px-8 lg:px-10 text-center flex flex-col items-center gap-8">
      <Image
        src="/kashif_profile_img.jpeg"
        alt="Kashif Deshmukh"
        width={120}
        height={120}
        className="rounded-full border-4 border-blue-400 shadow-lg mb-4"
      />
      <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">About Me</h2>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
        Hi, I’m <span className="font-semibold text-blue-600 dark:text-blue-400">Kashif Deshmukh</span>, a passionate full stack developer specializing in building modern, scalable web and mobile applications. I love turning ideas into beautiful, interactive digital experiences. Let’s build something amazing together!
      </p>
    </section>
  );
} 