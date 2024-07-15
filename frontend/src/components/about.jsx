import React from "react";

const About = () => {
  return (
    <div className="lg:w-3/4 w-full mx-auto mt-4 border rounded-lg font-serif border-gray-400">
      <div className="lg:h-96 h-42">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="blog.jpg"
          alt=""
        />
      </div>
      <div className="w-full p-4 font-serif">
        <span className="text-gray-800 lg:text-5xl text:3xl">
          Welcome to Blog Site!
        </span>
      </div>
      <div className="w-full p-4 bg-gray-100">
        <span className="text-gray-500 font-thin lg:text-xl text-base">
          At BlogSite, we believe in the power of words and the impact they can
          have on the world. Our platform is a haven for writers, thinkers, and
          storytellers from all walks of life. Whether you're here to share your
          experiences, your expertise, or your imagination, BlogSite is the
          perfect place to get your voice heard.
        </span>
      </div>
      <div className="w-full p-4">
        <span className="text-gray-800 lg:text-lg text-base">
          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              Our mission is to provide a platform where individuals can express
              themselves freely, share their knowledge, and connect with a
              community of like-minded people. We aim to foster a creative and
              inclusive environment where everyone feels welcome to contribute
              and engage.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
            <ul className="list-disc list-inside">
              <li>
                A Platform for Everyone: Whether you're a professional writer, a
                hobbyist, or someone with a story to tell, BlogSite provides the
                tools you need to create and publish your content easily.
              </li>
              <li>
                Diverse Topics: From technology and business to lifestyle and
                personal development, our blog covers a wide range of topics.
                There's something for everyone here.
              </li>

              <li>
                User-Friendly Interface: Our intuitive design ensures that you
                can focus on your content without getting bogged down by
                technical details.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <ul className="list-disc list-inside">
              <li>
                Creativity: We believe in nurturing creativity and providing a
                space where ideas can flourish.
              </li>
              <li>
                Integrity: Honesty and authenticity are at the heart of
                everything we do. We encourage our writers to share genuine and
                insightful content.
              </li>
              <li>
                Diversity: We celebrate diverse perspectives and welcome
                contributions from people of all backgrounds.
              </li>
              <li>
                Support: We offer support to our writers, whether they're just
                starting or looking to take their blogging to the next level.
              </li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Join Us</h2>
            <p>
              Are you ready to start your blogging journey with BlogSite? Join
              our community of passionate writers and readers today. Whether you
              want to share your expertise, tell your story, or explore new
              ideas, BlogSite is here to help you every step of the way.
            </p>
          </section>
        </span>
      </div>
      <div className="w-full p-4 bg-gray-100 flex justify-end">
        <span className="font-thin text-gray-500 text-sm italic">
          Developer: Nikita Mistri
        </span>
      </div>
    </div>
  );
};

export default About;
