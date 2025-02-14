"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiOutlineHand, HiOutlineChevronRight } from "react-icons/hi";

interface Comment {
  id: number;
  author: string;
  content: string;
  amount: string;
  time: string;
  profilePicture: string;
}

const commentsData: Comment[] = [
  {
    id: 1,
    author: "Jon Snow",
    content: "I just donated and it was awesome",
    amount: "₦10,000",
    time: "2 hours ago",
    profilePicture: "/path-to-profile1.jpg",
  },
  {
    id: 2,
    author: "Salim Ibrahim",
    content: "An amazing system I helped design and support!",
    amount: "₦15,000",
    time: "3 hours ago",
    profilePicture: "/path-to-profile2.jpg",
  },
  {
    id: 3,
    author: "Amadike Nomso",
    content: "An amazing system I helped design and support!",
    amount: "₦20,000",
    time: "5 hours ago",
    profilePicture: "/path-to-profile3.jpg",
  },
];

const Comments = ({
  updateCommentsCount,
}: {
  updateCommentsCount: (count: number) => void;
}) => {
  const [comments] = useState<Comment[]>(commentsData);

  useEffect(() => {
    updateCommentsCount(comments.length);
  }, [comments.length, updateCommentsCount]);

  return (
    <div className="w-full p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        Comments <sup className="text-blue-500 text-sm">{comments.length}</sup>
      </h2>
      <ul>
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center">
              <Image
                src={comment.profilePicture}
                alt={`${comment.author}'s profile`}
                width={40}
                height={40}
                className="rounded-full mr-4"
              />
              <div>
                <p className="font-semibold text-gray-900">{comment.author}</p>
                <p className="text-sm text-gray-500 truncate w-[200px]">
                  {comment.content}
                </p>
                <p className="text-xs text-gray-400">
                  {comment.amount} • {comment.time}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="text-gray-500 hover:text-gray-700">
                <HiOutlineHand size={20} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <HiOutlineChevronRight size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
