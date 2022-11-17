import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Root from "../../containers/Root";
import {act} from "react-dom/test-utils";


describe("Root container", () => {
  test("match snapshot", () => {

    act(() => {
      const { container } = render(<Root/>);
      expect(container).toMatchSnapshot();
    });
  });
});
