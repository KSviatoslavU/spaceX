import { describe, it, expect, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import App from "../app/App";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

beforeAll(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            mission_name: "FalconSat",
            rocket: { rocket_name: "Falcon 1" },
            links: {
              mission_patch: "patch.png",
              mission_patch_small: "patch_small.png",
            },
            details: "First SpaceX launch",
          },
        ]),
    })
  ) as unknown as typeof fetch;

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

beforeEach(() => {
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
  }
});

afterEach(() => {
  cleanup();
});

function renderWithMantine(ui: React.ReactNode) {
  return render(<MantineProvider>{ui}</MantineProvider>);
}

describe("App", () => {
  it("рендерит заголовок", async () => {
    renderWithMantine(<App />);
    expect(
      await screen.findByText(/SpaceX Launches 2020/i)
    ).toBeInTheDocument();
  });

  it("рендерит карточку с миссией", async () => {
    renderWithMantine(<App />);
    expect(await screen.findByText(/FalconSat/i)).toBeInTheDocument();
    expect(await screen.findByText(/Falcon 1/i)).toBeInTheDocument();
  });

  it("открывает модалку при клике на кнопку", async () => {
    renderWithMantine(<App />);
    const button = await screen.findByRole("button", { name: /see more/i });
    fireEvent.click(button);

    expect(
      await screen.findByRole("heading", { name: /FalconSat/i })
    ).toBeInTheDocument();
    expect(await screen.findByText(/First SpaceX launch/i)).toBeInTheDocument();
  });

  it("закрывает модалку по крестику", async () => {
    renderWithMantine(<App />);
    const button = await screen.findByRole("button", { name: /see more/i });
    fireEvent.click(button);

    const closeButton = await screen.findByRole("button", { name: /×/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText(/First SpaceX launch/i)
      ).not.toBeInTheDocument();
    });
  });
});
