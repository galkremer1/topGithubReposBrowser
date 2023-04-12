import { renderHook, act } from "@testing-library/react";
import { useFetchCommits } from "../useFetchCommits";
import axios from "axios";

jest.mock("axios");

describe("useFetchCommits", () => {
  const mockRepo = {
    name: "test-repo",
    owner: { login: "test-owner" },
  };
  const mockCommits = [
    { sha: "commit1", commit: { message: "Commit message 1" } },
    { sha: "commit2", commit: { message: "Commit message 2" } },
    { sha: "commit3", commit: { message: "Commit message 3" } },
  ];
  const mockError = {
    response: {
      data: {
        message: "Error fetching commits",
        documentation_url: "http://www.google.com",
      },
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch commits and set the state", async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockCommits.slice(0, 1) })
      .mockResolvedValueOnce({ data: mockCommits.slice(1, 2) });

    const { result } = renderHook(() => useFetchCommits(mockRepo));

    // assert initial state
    expect(result.current.gitHubCommits).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual({});

    // wait for useEffect to complete
    await act(async () => {
      await result.current.loadMore();
    });

    // assert state after useEffect
    expect(result.current.gitHubCommits).toEqual(mockCommits.slice(0, 2));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual({});
  });

  it("should handle errors", async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockCommits })
      .mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetchCommits(mockRepo));

    expect(result.current.gitHubCommits).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual({});

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.gitHubCommits).toEqual(mockCommits);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual({
      message: mockError.response.data.message,
      url: mockError.response.data.documentation_url,
    });
  });

  it("should fetch more commits and set the state", async () => {
    axios.get
      .mockResolvedValueOnce({ data: mockCommits.slice(0, 1) })
      .mockResolvedValueOnce({ data: mockCommits.slice(1, 2) })
      .mockResolvedValueOnce({ data: mockCommits.slice(2) });

    const { result } = renderHook(() => useFetchCommits(mockRepo));

    expect(result.current.gitHubCommits).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toEqual({});

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.gitHubCommits).toEqual(mockCommits.slice(0, 2));
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual({});

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.gitHubCommits).toEqual(mockCommits);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toEqual({});
  });
});
