import { useAuth } from "@TCoin/api/hooks/useAuth";

export function PanholderScreen() {
  const { userData } = useAuth();

  return <div> {userData?.cubidData?.full_name} </div>;
}
