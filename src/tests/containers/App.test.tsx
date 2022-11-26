import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../containers/App";


describe("App container", () => {
  test("match snapshot", () => {

    const { container } = render(<App/>);
    expect(container).toMatchSnapshot();
  });

});
