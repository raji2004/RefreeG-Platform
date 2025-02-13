"use client";
import { useState } from "react";
import Image from "next/image"; // Import the Next.js Image component

interface Comment {
  id: number;
  author: string;
  content: string;
  amount: string;
  time: string;
  profilePicture: string;
}

// Sample comments data
const commentsData: Comment[] = [
  {
    id: 1,
    author: "Salim Ibrahim",
    content:
      "We are heartbroken to hear about the destruction caused by the flood. Let's do what we can to help the affected families.",
    amount: "₦10,000",
    time: "2 hours ago",
    profilePicture: "/path-to-profile1.jpg",
  },
  {
    id: 2,
    author: "Salim Ibrahim",
    content:
      "Sending love and support to all those who have been impacted. Stay strong!",
    amount: "₦15,000",
    time: "3 hours ago",
    profilePicture: "/path-to-profile2.jpg",
  },
  // Add more comments as needed...
];

// Function to get the number of comments
export const getCommentsCount = () => {
  return commentsData.length;
};

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>(commentsData);

  return (
    <div className="w-full px-4 py-2">
      <h2 className="text-lg font-semibold mb-4">
        Comments ({comments.length})
      </h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="flex mb-6 items-start">
              {/* Use Next.js Image component for optimized images */}
              <Image
                src={comment.profilePicture}
                alt={`${comment.author}'s profile picture`}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-600 mb-2">{comment.content}</p>
                <div className="flex space-x-4 text-gray-500">
                  <span>{comment.amount}</span>
                  <span>{comment.time}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">
            There are no comments on this cause yet, be the first to comment!
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Donate
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
