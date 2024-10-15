export type TPersona = "support-seeker" | "service-worker" | "store" | "donor";
export type TCubidData = {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  profile_image_url: File | null;
  preferred_donation_amount: string;
  selected_cause: string;
  good_tip: number | null;
  normal_tip: number | null;
  default_tip: number | null;
  persona: TPersona | null;
  current_step: number;
};
