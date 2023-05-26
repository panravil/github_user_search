import { useState } from "react";

interface User {
  id: number;
  login: string;
}

export const SearchGithubUsers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const handleSearch = async (searchQuery: string) => {
    try {
      let queryUrl = `https://api.github.com/search/users?q=${searchQuery}`;

      const response = await fetch(queryUrl);
      const data = await response.json();
      setUsers(data.items);
    } catch (error) {
      console.error("Error searching GitHub users:", error);
    }
  };

  return (
    <>
      <div className="mt-4 mb-4">
        <input
          type="text"
          placeholder="Search GitHub users by name"
          className="px-4 py-2 border border-gray-300 rounded-md w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-md"
          onClick={() => handleSearch(searchQuery)}
        >
          Search
        </button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </>
  );
};
