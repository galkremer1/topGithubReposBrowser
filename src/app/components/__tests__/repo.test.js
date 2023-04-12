import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Repo } from "../Repo";

const repoMock = {
  id: 123,
  name: "test-repo",
  description: "Test Repo",
  html_url: "https://github.com/test-user/test-repo",
  stargazers_count: 200000,
  owner: {
    login: "test-user",
    html_url: "https://github.com/test-user",
    avatar_url: "https://avatars.githubusercontent.com/u/123",
  },
};

describe("Repo", () => {
  test("renders repository name, description, owner's login and correct stars", () => {
    const { getByText } = render(
      <Repo repo={repoMock} rank={1} totalItems={1} />
    );
    expect(getByText(repoMock.name)).toBeInTheDocument();
    expect(getByText(repoMock.description)).toBeInTheDocument();
    expect(getByText(repoMock.owner.login)).toBeInTheDocument();
    expect(getByText(repoMock.stargazers_count)).toBeInTheDocument();
  });
});
