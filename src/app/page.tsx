"use client";
import { useFetchRepos } from "./hooks/useFetchRepos";
import { Repo } from "./components/Repo";
import { Loader } from "./components/Loader";

//TODO Show error
export default function Home() {
  const { gitHubRepos, loading, error } = useFetchRepos();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          <Loader />
        ) : (
          gitHubRepos.map((repo, i) => (
            <Repo
              key={repo.id}
              repo={repo}
              rank={i + 1}
              totalItems={gitHubRepos.length}
            />
          ))
        )}
      </div>
    </main>
  );
}
