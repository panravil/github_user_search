import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { Tab } from "../common/Tab";
import { SearchGithubUsers } from "../domain/github-search/SearchGithubUsers";
import { SearchGithubContributors } from "../domain/github-search/SearchGithubContributors";

export const GithubSearchLayout = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">GitHub User Search</h1>
        <Router>
          <Tab
            elements={[
              {
                caption: "Users",
                url: "/user",
              },
              {
                caption: "Contributors",
                url: "/contributor",
              },
            ]}
          />
          <Routes>
            <Route path="/" element={<Navigate replace to="/user" />} />
            <Route
              path="/user"
              element={
                <div>
                  <SearchGithubUsers />
                </div>
              }
            />
            <Route
              path="/contributor"
              element={
                <div>
                  <SearchGithubContributors />
                </div>
              }
            />
          </Routes>
        </Router>
      </div>
    </>
  );
};
