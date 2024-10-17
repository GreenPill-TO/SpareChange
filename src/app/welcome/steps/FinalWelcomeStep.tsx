import Button from "@TCoin/components/form/form-fields/Button";
import InfoBox from "@TCoin/components/form/form-fields/InfoBox";
import React from "react";

interface FinalWelcomeStepProps {
  onDashboardRedirect: () => void;
}

const FinalWelcomeStep: React.FC<FinalWelcomeStepProps> = ({ onDashboardRedirect }) => {
  return (
    <div className="final-welcome-step">
      <h2 className="text-2xl font-bold">You're All Set!</h2>
      <InfoBox message="Your account is ready to go. You can now start exploring, donating, or receiving support!" />
      <Button label="Go to Dashboard" onClick={onDashboardRedirect} />
    </div>
  );
};

export default FinalWelcomeStep;
