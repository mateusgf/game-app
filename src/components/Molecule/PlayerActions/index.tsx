import "./PlayerActions.scss";
import rockImage from "../../../assets/images/rock.jpg";
import paperImage from "../../../assets/images/paper.jpg";
import scissorsImage from "../../../assets/images/scissors.jpg";

interface IPlayerActionsProps {
  isHostPlayer: boolean;
  playAction: Function;
  isAvailableToPlayAction: boolean;
}

const PlayerActions = ({
  playAction,
  isHostPlayer,
  isAvailableToPlayAction,
}: IPlayerActionsProps) => {
  return isAvailableToPlayAction ? (
    <div className="player-actions" data-testid="player-actions">
      <div
        className="player-actions--action-wrp"
        data-testid="action-rock"
        onClick={() => playAction("rock", isHostPlayer)}
      >
        <img src={rockImage} alt="rock" />
        <span className="player-actions--action-label">rock</span>
      </div>

      <div
        className="player-actions--action-wrp"
        data-testid="action-paper"
        onClick={() => playAction("paper", isHostPlayer)}
      >
        <img src={paperImage} alt="paper" />
        <span className="player-actions--action-label">paper</span>
      </div>

      <div
        className="player-actions--action-wrp"
        data-testid="action-scissors"
        onClick={() => playAction("scissors", isHostPlayer)}
      >
        <img src={scissorsImage} alt="scissors" />
        <span className="player-actions--action-label">scissors</span>
      </div>
    </div>
  ) : (
    <h1 data-testid="waiting-opponent-label">Waiting for opponent to play</h1>
  );
};

export default PlayerActions;
