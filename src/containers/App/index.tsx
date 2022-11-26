import "./App.scss";

import PlayerProvider from "../../context/Player";
import GameProvider from "../../context/Game";

interface IAppProps {
  children?: React.ReactNode;
}

function App({ children }: IAppProps) {
  return (
    <PlayerProvider>
      <GameProvider>
        <div className="App" data-testid="app">{children}</div>
      </GameProvider>
    </PlayerProvider>
  );
}
export default App;
