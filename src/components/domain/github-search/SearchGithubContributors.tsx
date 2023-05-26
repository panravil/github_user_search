import { useState } from "react";

interface Contributor {
  id: number;
  login: string;
}

interface Repository {
  id: number;
  full_name: string;
  contributors_url: string;
}

export const SearchGithubContributors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const handleSearchRepos = async (searchQuery: string) => {
    try {
      const queryUrl = `https://api.github.com/search/repositories?q=${searchQuery}+in:name`;
      const response = await fetch(queryUrl);
      const data = await response.json();
      setRepositories(data.items);
    } catch (error) {
      console.error(
        "Error fetching GitHub repositories with text in the title:",
        error
      );
    }
  };

  const handleRepoClick = async (repo: Repository) => {
    setSelectedRepo(repo);
    handleContributorSearch(repo);
  };

  const handleContributorSearch = async (repo: Repository) => {
    try {
      const response = await fetch(repo.contributors_url);
      const data = await response.json();
      setContributors(data);
    } catch (error) {
      console.error("Error fetching contributors with the repository name");
    }
  };

  return (
    <div className="flex mx-auto p-4">
      <div className="w-1/2">
        <div className="mt-4 mb-4">
          <input
            type="text"
            placeholder="Search repositories with text in the title"
            className="px-2 py-1 border border-gray-300 rounded-md ml-2 w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md"
            onClick={() => handleSearchRepos(searchQuery)}
          >
            Search
          </button>
        </div>
        <ul>
          {repositories.map((repo) => (
            <li
              key={repo.id}
              className={`cursor-pointer hover:text-blue-500 ${
                selectedRepo?.id === repo.id ? "font-bold" : ""
              }`}
              onClick={() => handleRepoClick(repo)}
            >
              {repo.full_name}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-1/2 pl-4">
        {selectedRepo && (
          <>
            <h2 className="mt-4 mb-4 text-xl font-bold">
              Contributors for {selectedRepo.full_name}
            </h2>
            <ul>
              {contributors.map((contributor) => (
                <li key={contributor.id}>{contributor.login}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
