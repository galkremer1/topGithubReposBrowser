export const urlBuilder = (baseUrl: string, resPerPage: number) => {
  return `${baseUrl}?q=stars:>50000&sort=stars&order=desc&p&per_page=${resPerPage}`;
};
