import React from "react";

interface CauseParagraphsProps {
  section: { header: string; description: string }[];
}

function CauseSection({ section }: CauseParagraphsProps) {
  return (
    <>
      {section?.map((section, index) => (
        <div key={index} className="mt-4">
          <h3 key={index} className="font-bold">
            {section.header}
          </h3>
          <p key={index} className="mt-2 text-md">
            {section.description}
          </p>
        </div>
      ))}
    </>
  );
}

export default CauseSection;
