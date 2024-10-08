"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { NavbarAuthenticated } from "@/components/Navbar";
import { useCubidAPI, CubidAPIResponse } from "@/components/dashboard/CubidAPIHandler";
import ScoreChangeModal from "@/components/dashboard/ScoreChangeModal";
import { getSupabaseClient } from "@/utils/supabase/client";
import { isValidUUID } from "@/utils/validators"; // Utility function to validate UUIDs

const supabase = getSupabaseClient();

interface User {
  name: string;
  cubid_id: string;
}

interface Change {
  old: string;
  new: string;
}

interface ScoreChangeModalProps {
  changes: {
    cubid_score?: Change;
    cubid_identity?: Change;
    cubid_score_details?: Change;
  };
  onAccept: () => void;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalDonations: 0, totalCredits: 0 });
  const [recentActivity, setRecentActivity] = useState<string[]>([]);
  const [showScoreChangeModal, setShowScoreChangeModal] = useState(false);
  const [changes, setChanges] = useState<ScoreChangeModalProps['changes']>({});
  const router = useRouter();
  const { apiData, fetchCubidData } = useCubidAPI();
  const cubidDataFetched = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData: User = await new Promise((resolve) =>
        setTimeout(() => resolve({ name: "John Doe", cubid_id: "user-cubid-id" }), 1000)
      );
      setUser(userData);
      setLoading(false);

      if (isValidUUID(userData.cubid_id)) {
        await checkForCubidChanges(userData.cubid_id);
      } else {
        console.error("Invalid cubid_id:", userData.cubid_id);
      }
    };

    const checkForCubidChanges = async (cubid_id: string) => {
      if (cubidDataFetched.current) return;

      const { data: supabaseData, error: supabaseError } = await supabase
        .from("users")
        .select("cubid_score, cubid_identity, cubid_score_details, updated_at")
        .eq("cubid_id", cubid_id)
        .single();

      if (supabaseError || !supabaseData) {
        console.error("Error fetching data from Supabase:", supabaseError);
        return;
      }

      const now = new Date();
      const lastUpdated = new Date(supabaseData.updated_at);
      const timeDifference = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60);

      if (timeDifference > 24) {
        console.log("Re-fetching Cubid data as it has been more than 24 hours since the last fetch.");
        await fetchCubidData(cubid_id);

        await supabase
          .from("users")
          .update({
            cubid_score: apiData.score,
            cubid_identity: apiData.identity,
            cubid_score_details: apiData.scoreDetails,
          })
          .eq("cubid_id", cubid_id);

        cubidDataFetched.current = true;
      } else {
        const changes: ScoreChangeModalProps['changes'] = {};
        if (apiData.score !== supabaseData.cubid_score) {
          changes.cubid_score = { old: supabaseData.cubid_score, new: apiData.score };
        }
        if (apiData.identity !== supabaseData.cubid_identity) {
          changes.cubid_identity = { old: supabaseData.cubid_identity, new: apiData.identity };
        }
        if (apiData.scoreDetails !== supabaseData.cubid_score_details) {
          changes.cubid_score_details = { old: supabaseData.cubid_score_details, new: apiData.scoreDetails };
        }

        if (Object.keys(changes).length > 0) {
          setChanges(changes);
          setShowScoreChangeModal(true);
        }
      }
    };

    fetchUserData();
  }, [fetchCubidData]);

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAuthenticated
        onAuthClick={() => console.log("Auth button clicked")}
        onLogoutClick={() => console.log("Logged out")}
      />
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
      {showScoreChangeModal && (
        <ScoreChangeModal
          changes={changes}
          onAccept={() => setShowScoreChangeModal(false)}
        />
      )}
    </div>
  );
}
