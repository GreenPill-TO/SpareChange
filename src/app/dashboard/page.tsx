"use client";
import { useAuth } from "@TCoin/api/hooks/useAuth";
import { Card } from "@TCoin/components/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { authData, userData, error, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      router.push("/");
    }
  }, [authData, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  const { cubidData } = userData || {};

  return (
    <div>
      <div className="max-w-7xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <h2 className="text-xl font-bold mb-2">Total Donations</h2>
            {/* <p>{cubidData.totalDonations}</p> */}
          </Card>
          <Card>
            <h2 className="text-xl font-bold mb-2">Total Credits</h2>
            {/* <p>{cubidData.totalCredits}</p> */}
          </Card>
          <Card>
            <h2 className="text-xl font-bold mb-2">Recent Activity</h2>
            <ul>
              {/* {cubidData.recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))} */}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
