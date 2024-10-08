import React from 'react';
import { CubidAPIResponse } from "./CubidAPIHandler";

type ScoreChangeModalProps = {
  changes: {
    cubid_score?: { old: string; new: string };
    cubid_identity?: { old: string; new: string };
    cubid_score_details?: { old: string; new: string };
  };
  onAccept: () => void;
};

const ScoreChangeModal: React.FC<ScoreChangeModalProps> = ({ changes, onAccept }) => {
  return (
    <div className="modal">
      <h2>Changes Detected</h2>
      <div>
        {changes.cubid_score && (
          <div>
            <h3>Score</h3>
            <p>Old: {changes.cubid_score.old}</p>
            <p>New: {changes.cubid_score.new}</p>
          </div>
        )}
        {changes.cubid_identity && (
          <div>
            <h3>Identity</h3>
            <p>Old: {changes.cubid_identity.old}</p>
            <p>New: {changes.cubid_identity.new}</p>
          </div>
        )}
        {changes.cubid_score_details && (
          <div>
            <h3>Score Details</h3>
            <p>Old: {changes.cubid_score_details.old}</p>
            <p>New: {changes.cubid_score_details.new}</p>
          </div>
        )}
      </div>
      <button onClick={onAccept}>Accept</button>
    </div>
  );
};

export default ScoreChangeModal;
