import {render} from "@testing-library/react";
import GameProvider from "../../context/Game";

interface IProps {
  children?: React.ReactNode;
}

const wrapper = ({ children }: IProps) => <GameProvider>{children}</GameProvider>
const renderWithContext = (ui: any, options: any) => render(ui, {wrapper: GameProvider, ...options});

export * from "@testing-library/react";

export {renderWithContext as render};
