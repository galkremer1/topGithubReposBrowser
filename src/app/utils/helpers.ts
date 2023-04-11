const starsThreshold = 5000;

//Example URL:

export const reposUrlBuilder = (baseUrl: string, resPerPage: number) => {
  return `${baseUrl}/search/repositories?q=stars:>${starsThreshold}&sort=stars&order=desc&p&per_page=${resPerPage}`;
};

//Example URL:

export const commitsUrlBuilder = (
  baseUrl: string,
  owner: string,
  repo: string,
  resPerPage: number,
  timeStamp: string
) => {
  return `${baseUrl}/repos/${owner}/${repo}/commits?since=${timeStamp}&per_page=${resPerPage}`;
};
