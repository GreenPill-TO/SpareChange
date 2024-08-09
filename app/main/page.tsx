// /main/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/home/Navbar";

// Define a type for the user data
interface User {
  name: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({ totalDonations: 0, totalCredits: 0 });
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Mark the component as mounted

    // Logic to fetch user data
    const fetchUserData = async () => {
      // Simulate fetching user data
      const userData: User = await new Promise((resolve) =>
        setTimeout(() => resolve({ name: "John Doe" }), 1000)
      );
      setUser(userData);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      const router = useRouter(); // Call useRouter inside the useEffect
      router.push("/login");
    }
  }, [isMounted, user]);

  // Dummy onAuthClick function
  const onAuthClick = () => {
    console.log("Auth button clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onAuthClick={onAuthClick} />
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Total Donations</h2>
            <p>{stats.totalDonations}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Total Credits</h2>
            <p>{stats.totalCredits}</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
            <ul>
              {recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
