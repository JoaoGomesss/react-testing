import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";

import Tasks from "./Tasks";

describe("Tasks Component", () => {
  const worker = setupServer(
    rest.get(
      "https://jsonplaceholder.typicode.com/todos",
      async (req: any, res: any, ctx: any) => {
        return res(
          ctx.json([
            {
              userId: 1,
              id: 1,
              title: "delectus aut autem",
              completed: false,
            },
          ])
        );
      }
    )
  );

  beforeAll(() => {
    worker.listen();
  });

  beforeEach(() => {
    worker.restoreHandlers();
  });

  it("should fetch and show tasks on button click", async () => {
    render(<Tasks />);

    const button = screen.getByText(/get tasks from api/i);

    fireEvent.click(button);

    await screen.findByText("delectus aut autem");
    // await waitFor(() => screen.getByText("delectus aut autem"))
  });

  it("should show erro message on fetch error", async () => {
    worker.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/todos",
        async (req: any, res: any, ctx: any) => {
          return res(ctx.status(500), ctx.json({ message: "error happened" }));
        }
      )
    );
    render(<Tasks />);

    const button = screen.getByText(/get tasks from api/i);

    fireEvent.click(button);

    await screen.findByText("error happened");
  });
});
