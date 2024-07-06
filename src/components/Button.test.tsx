import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import { act } from "react";

describe("Button Component", () => {
  it("should render with red background if disable", () => {
    render(
      <Button disabled onClick={() => {}}>
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toHaveStyle({ backgroundColor: "red" });
  });

  it("should call onClick prop on click", () => {
    const onClick = jest.fn();

    render(
      <Button disabled onClick={onClick}>
        Click me
      </Button>
    );

    const button = screen.getByText(/click me/i);

    act(() => {
      fireEvent.click(button);
    });
    expect(onClick).toHaveBeenCalled();
  });
});