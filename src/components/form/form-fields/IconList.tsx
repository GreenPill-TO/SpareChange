import React from "react";
import { IconType } from "react-icons"; // Assuming you use react-icons

interface IconListProps {
  items: { icon: IconType; text: string }[];
}

const IconList: React.FC<IconListProps> = ({ items }) => {
  const textClasses = "dark:text-white text-gray-900";

  return (
    <ul className="icon-list space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          <item.icon className={`mr-2 ${textClasses}`} size={24} />
          <span className={textClasses}>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

export default IconList;
