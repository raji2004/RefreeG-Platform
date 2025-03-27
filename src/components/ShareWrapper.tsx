"use client";

import { BsShare } from "react-icons/bs";
import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FaWhatsapp, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { toast } from "react-toastify";

interface ShareWrapperProps {
    url: string;
    title: string;
    children?: ReactNode;
}

export default function ShareWrapper({ url, title, children }: ShareWrapperProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch(() => toast.error("Failed to copy link"));
    };
  

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}\n${url}`)}`,
        instagram: `https://instagram.com/share?url=${encodeURIComponent(url)}`,
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div>
                    {children || (
                        <button className="flex items-center text-center bg-white border border-gray-400 px-12 py-3 rounded-md shadow-sm hover:bg-gray-300 transition-colors duration-300">
                            Share <BsShare className="ml-2" />
                        </button>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white">
                <div className="flex flex-col gap-4">
                    <h2 className="text-xl font-semibold text-center">Share this cause</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <a
                            href={shareLinks.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaWhatsapp className="w-8 h-8 text-green-500" />
                            <span className="mt-2 text-sm">WhatsApp</span>
                        </a>
                        <a
                            href={shareLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaXTwitter className="w-8 h-8 text-black" />
                            <span className="mt-2 text-sm">X (Twitter)</span>
                        </a>
                        <a
                            href={shareLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <FaInstagram className="w-8 h-8 text-pink-600" />
                            <span className="mt-2 text-sm">Instagram</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="text"
                            value={url}
                            readOnly
                            className="flex-1 p-2 border rounded-md bg-gray-50"
                        />
                        <button
                            onClick={handleCopyLink}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Copy
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
} 