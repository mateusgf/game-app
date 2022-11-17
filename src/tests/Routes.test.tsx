import {render, screen, waitFor, fireEvent} from '@testing-library/react'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import '@testing-library/jest-dom'
import Routes from "./../Routes";
import {act} from "react-dom/test-utils";

const delay = (min: number, max: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, Math.random() * (max - min) + min)
	})
}

test('full app rendering/navigating', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Routes />
    </Router>,
  );
  
  act(() => {
    delay(200, 1000);
  });

  await waitFor(() => expect(screen.getByText(/Rock, Paper & Scissors/i)).toBeInTheDocument());

  act(() => {
    fireEvent(
      screen.getByTestId("goto-listing"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
  });

  await waitFor(() => expect(screen.getByTestId("heading-games-list")).toBeInTheDocument());
})
