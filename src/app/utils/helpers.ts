import { AxiosError } from "axios";
import { STARS_THRESHOLD } from "./consts";

interface customResponseErrorData {
  documentation_url: string;
  message: string;
}

//Example URL:

export const reposUrlBuilder = (baseUrl: string, resPerPage: number) => {
  return `${baseUrl}/search/repositories?q=stars:>${STARS_THRESHOLD}&sort=stars&order=desc&p&per_page=${resPerPage}`;
};

//Example URL:

export const commitsUrlBuilder = (
  baseUrl: string,
  owner: string,
  repo: string,
  sinceTimeStamp: string,
  resPerPage: number,
  page: number
) => {
  return `${baseUrl}/repos/${owner}/${repo}/commits?since=${sinceTimeStamp}&page=${page}&per_page=${resPerPage}`;
};

export const getTimestamp24HoursAgo = (): string => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const timestamp = twentyFourHoursAgo.toISOString();
  return timestamp;
};

export const handleAxiosError = (error: AxiosError) => {
  if (error.response) {
    const responseData = error.response.data as customResponseErrorData;
    return {
      message: responseData.message,
      url: responseData.documentation_url,
    };
  } else if (error.request) {
    //TODO: Handle other types of errors
    console.log(error.request);
    return { message: "Error" };
  } else {
    return { message: "Error" };
  }
};
