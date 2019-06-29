import Octokit from "@octokit/rest";

let API = new Octokit();

const GetPullRequestComments = (
  owner: string,
  repo: string,
  pull_number: number
) => {
  return API.pulls
    .listComments({
      owner,
      repo,
      pull_number
    })
    .then(response => response.data)
    .catch(console.error);
};

export { GetPullRequestComments };
