import { render, screen, fireEvent, getByText } from "@testing-library/react";
import App from "./App";
import { act } from "react";

const sum = (x: number, y: number) => {
  return x + y;
};

describe("App Component", () => {
  it("should sum correctly", () => {
    expect(sum(4, 4)).toBe(8);
  });

  it("should render App with hello message", () => {
    render(<App />);

    screen.getByText("Hello world!");
  });

  it("should change message on button click", () => {
    render(<App />);

    screen.getByText("Let's learn more about testing in React");

    const button = screen.getByText(/change message/i);

    act(() => {
      fireEvent.click(button);
    });
    screen.getByText(/You're learning about testing in/i);

    const oldMessage = screen.queryByText(
      "Let's learn more about testing in React"
    );

    expect(oldMessage).toBeNull();
  });
});
