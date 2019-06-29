import Octokit from "@octokit/rest";

let API = new Octokit({ auth: "a8287414c054bf9ac133bd3c98c02c12560cc19a" });

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

const CommentOnPullRequest = (
  owner: string,
  repo: string,
  pull_number: number,
  comment: string
) => {
  return API.pulls
    .createComment({
      owner,
      repo,
      pull_number,
      commit_id: "ef0f0acc504e0c209e57932504c39dccbfba2386",
      path: "package.json",
      position: 1,
      body: comment
    })
    .catch(console.error);
};

export { GetPullRequestComments, CommentOnPullRequest };
