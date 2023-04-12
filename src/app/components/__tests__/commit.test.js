import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Commit } from "../Commit";

describe("Commit", () => {
  const commit = {
    sha: "1234",
    html_url: "https://github.com/test/test/commit/1234",
    commit: {
      author: {
        name: "Test User",
        email: "test@test.com",
        date: "2022-04-12T10:00:00Z",
      },
      message: "Test commit message",
    },
    author: {
      login: "testuser",
      avatar_url: "https://avatars.githubusercontent.com/testuser.jpg",
      html_url: "https://github.com/testuser",
    },
  };

  it("should render commit details correctly", () => {
    const { getByText, getByTestId } = render(<Commit commit={commit} />);
    expect(getByText("Test User")).toBeInTheDocument();
    expect(getByText("Test commit message")).toBeInTheDocument();
    expect(getByText("4/12/2022, 5:00:00 AM")).toBeInTheDocument();
    expect(getByTestId("avatar")).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Ftestuser.jpg&w=48&q=75"
    );
  });
});
