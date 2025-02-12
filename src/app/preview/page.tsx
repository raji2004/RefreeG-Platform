"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Listacause_component/navbar";

interface Section {
  id: number;
  header: string;
  description: string;
}

interface UploadedImage {
  src: string;
  name: string;
  size: number;
}

const PreviewPage = () => {
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  useEffect(() => {
    // Retrieve form data
    const formData = localStorage.getItem("formSections");
    if (formData) {
      setSections(JSON.parse(formData));
    }

    // Retrieve uploaded image
    const imageData = localStorage.getItem("uploadedImage");
    if (imageData) {
      setUploadedImage(JSON.parse(imageData));
    }
  }, []);

  return (
    <div>
        <Navbar />
        <div className="min-h-screen p-6 pl-8 pt-20 flex flex-col justify-center items-center">
            <div className="w-3/5 p-3 border rounded bg-[#ecece6]">
                

                {/* Display uploaded image */}
                {uploadedImage && (
                <div className="mb-6 w-full">
                    {/* <h2 className="text-lg font-medium text-left">Uploaded Image</h2> */}
                    <img src="" />
                    <Image
                    src={uploadedImage.src}
                    alt="Uploaded preview"
                    width={300}
                    height={200}
                    className="rounded-lg w-[600px] h-[300px] object-contain"
                    />
                    {/* <p className="w-11/12">{uploadedImage.name} ({uploadedImage.size} KB)</p> */}
                </div>
                )}

                {/* Display form sections */}
                {sections.map((section) => (
                <div key={section.id} className="mb-6 w-full text-justify">
                    <h2 className="text-base font-medium text-left mb-2">{section.header || `Section ${section.id}`}</h2>
                    <p className="w-11/12 text-sm text-left">{section.description || "No description provided."}</p>
                </div>
                ))}

                
            </div>
                
            {/* <div>
                <button
                    className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => router.back()}
                    >
                    Back to Form
                </button>
            </div> */}

        
        </div>
    </div>
    


  );
};

export default PreviewPage;
