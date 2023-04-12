import { renderHook, act } from "@testing-library/react";
import { useFetchRepos } from "../useFetchRepos";
import axios from "axios";

jest.mock("axios");

describe("useFetchRepos", () => {
  it("Should fetch data from GitHub API and set the state", async () => {
    const mockRepos = [{ name: "repo1" }, { name: "repo2" }];
    axios.get.mockResolvedValue({ data: { items: mockRepos } });

    const { result } = renderHook(() => useFetchRepos());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");
    expect(result.current.gitHubRepos).toEqual([]);

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
    expect(result.current.gitHubRepos).toEqual(mockRepos);
  });

  it("Should handle errors when fetching data from GitHub API", async () => {
    const errorMsg = "Error fetching data";
    axios.get.mockRejectedValue({ message: errorMsg });

    const { result } = renderHook(() => useFetchRepos());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");
    expect(result.current.gitHubRepos).toEqual([]);

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(errorMsg);
    expect(result.current.gitHubRepos).toEqual([]);
  });
});
