import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders fib calculator text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Fib Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
