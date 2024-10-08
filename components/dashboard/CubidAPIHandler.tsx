import { useState } from "react";
import axios from "axios";
import { getSupabaseClient } from "@/utils/supabase/client"; // Supabase client
import ScoreChangeModal from "./ScoreChangeModal"; // Import the modal component

const supabase = getSupabaseClient(); // Initialize Supabase client

export interface CubidAPIResponse {
  score: any;
  identity: any;
  scoreDetails: any;
}

export const useCubidAPI = () => {
  const [apiData, setApiData] = useState<CubidAPIResponse>({
    score: null,
    identity: null,
    scoreDetails: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [changes, setChanges] = useState<any>(null); // State to hold detected changes
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

  const fetchCubidData = async (uid: string) => {
    setLoading(true);
    try {
      // Fetch data from Supabase
      const { data: supabaseData, error: supabaseError } = await supabase
        .from("users")
        .select("cubid_score, cubid_identity, cubid_score_details, updated_at")
        .eq("cubid_id", uid)
        .single();

      if (supabaseError) {
        throw new Error("Failed to fetch data from Supabase");
      }

      // Fetch data from Cubid API
      const [score, identity, scoreDetails] = await Promise.all([
        axios.post("https://passport.cubid.me/api/dapp/fetch_score", {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid,
        }),
        axios.post("https://passport.cubid.me/api/dapp/get_identity", {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid,
        }),
        axios.post("https://passport.cubid.me/api/dapp/get_score_details", {
          apikey: process.env.NEXT_PUBLIC_CUBID_API_KEY,
          uid,
        }),
      ]);

      const cubidData = {
        score: score.data,
        identity: identity.data,
        scoreDetails: scoreDetails.data,
      };

      // Compare Supabase data with Cubid data to detect changes
      const detectedChanges: any = {};

      if (supabaseData.cubid_score !== cubidData.score) {
        detectedChanges.cubid_score = {
          old: supabaseData.cubid_score,
          new: cubidData.score,
        };
      }
      if (supabaseData.cubid_identity !== cubidData.identity) {
        detectedChanges.cubid_identity = {
          old: supabaseData.cubid_identity,
          new: cubidData.identity,
        };
      }
      if (supabaseData.cubid_score_details !== cubidData.scoreDetails) {
        detectedChanges.cubid_score_details = {
          old: supabaseData.cubid_score_details,
          new: cubidData.scoreDetails,
        };
      }

      // If changes are detected, show the modal
      if (Object.keys(detectedChanges).length > 0) {
        setChanges(detectedChanges);
        setShowModal(true);
      }

      // Update Supabase with the new data if necessary
      await supabase
        .from("users")
        .update({
          cubid_score: cubidData.score,
          cubid_identity: cubidData.identity,
          cubid_score_details: cubidData.scoreDetails,
          updated_at: new Date(), // Update the timestamp
        })
        .eq("cubid_id", uid);

      setApiData(cubidData);

    } catch (err) {
      setError("Failed to fetch data from Cubid API");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptChanges = () => {
    // Close the modal and reset changes state
    setShowModal(false);
    setChanges(null);
  };

  return { 
    apiData, 
    fetchCubidData, 
    loading, 
    error, 
    showModal, 
    changes, 
    handleAcceptChanges 
  };
};
