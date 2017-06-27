import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders welcome text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to my portfolio/i);
  expect(linkElement).toBeInTheDocument();
});
