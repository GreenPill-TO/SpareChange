import { useAuth } from "@TCoin/api/hooks/useAuth";

export function PanholderScreen() {
  const { userData } = useAuth();

  console.log("panholder screen : userData", userData);
  return <div> PanholderScreen </div>;
}
