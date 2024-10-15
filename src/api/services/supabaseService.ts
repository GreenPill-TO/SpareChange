import { createClient } from "@TCoin/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

const supabase = createClient();

export const fetchUserByContact = async (authMethod: "phone" | "email" | string, fullContact: string) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("cubid_id, has_completed_intro")
    .eq(authMethod === "phone" ? "phone" : "email", fullContact)
    .single();

  return { user, error };
};

export const createNewUser = async (authMethod: "phone" | "email", fullContact: string, uuid: string) => {
  const { data: newUser, error } = await supabase
    .from("users")
    .insert([
      {
        [authMethod === "phone" ? "phone" : "email"]: fullContact,
        cubid_id: uuid,
        has_completed_intro: false,
      },
    ])
    .single();

  return { newUser, error };
};

export const fetchCubidDataFromSupabase = async (cubid_id: string) => {
  const { data: supabaseData, error: supabaseError } = await supabase.from("users").select("*").eq("cubid_id", cubid_id).single();

  if (supabaseError || !supabaseData) {
    throw new Error(`Error fetching Supabase data: ${supabaseError?.message}`);
  }

  return supabaseData;
};

export const updateCubidDataInSupabase = async (cubidId: string, updatedFields: Record<string, any>) => {
  const { error } = await supabase.from("users").update(updatedFields).eq("cubid_id", cubidId);
  return { error };
};

export const getSession = async (): Promise<Session | null> => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (err) {
    console.error("Error fetching session:", err);
    return null;
  }
};

export const signOut = async () => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem("supabase.auth.token");
    sessionStorage.removeItem("supabase.auth.token");
  } catch (error) {
    throw error;
  }
};

export const sendPasscode = async ({ contact, method }: { contact: string; method: "phone" | "email" }) => {
  try {
    const payload = method === "phone" ? { phone: contact } : { email: contact };
    const { error } = await supabase.auth.signInWithOtp(payload);
    if (error) throw error;
  } catch (error) {
    throw error; // Let the calling function handle the error
  }
};

export const verifyPasscode = async ({ contact, method, passcode }: { contact: string; method: "phone" | "email"; passcode: string }) => {
  try {
    let verificationPayload: { phone: string; token: string; type: "sms" } | { email: string; token: string; type: "email" };

    if (method === "phone") {
      verificationPayload = { phone: contact, token: passcode, type: "sms" };
    } else {
      verificationPayload = { email: contact, token: passcode, type: "email" };
    }
    const { error } = await supabase.auth.verifyOtp(verificationPayload);
    if (error) {
      throw error;
    }
  } catch (err) {
    throw err; // Let the calling function handle the error
  }
};
