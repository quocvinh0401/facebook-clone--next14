"use client";

import { useEffect, useState } from "react";
import UserCard from "~/components/supports/UserCard";

const Contact = () => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const resize = () => setHeight(window.innerHeight - 56);
    resize();

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div
      className={`sticky top-14 hidden min-w-[17.5rem] max-w-[22.5rem] grow overflow-hidden py-4 hover:overflow-y-auto md:block`}
      style={{ height }}
    >
      <span className="mb-4 font-semibold text-secondary-content">
        Contacts
      </span>
      <div>
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <UserCard key={index} />
          ))}
      </div>
    </div>
  );
};
export default Contact;
