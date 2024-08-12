"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavbarAuthenticated } from "@/components/home/Navbar";

interface User {
  name: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [stats, setStats] = useState({ totalDonations: 0, totalCredits: 0 });
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      // Simulating an API call to fetch user data
      const userData: User = await new Promise((resolve) =>
        setTimeout(() => resolve({ name: "John Doe" }), 1000)
      );
      setUser(userData);
      setLoading(false); // Data is loaded
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login"); // Only redirect if user is null and loading is complete
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while fetching data
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAuthenticated onAuthClick={() => console.log("Auth button clicked")} onLogoutClick={function (): void {
        throw new Error("Function not implemented.");
      } } />
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
