import axios from "axios";
import { formatDate } from "../utils/formatDate";

export const getGuardianNews = async ({ queryKey }) => {
  const [_, keyword] = queryKey;

  try {
    const params = {
      "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
      "show-fields": "publication,thumbnail",
      q: keyword,
    };
    const res = await axios.get(`https://content.guardianapis.com/search`, {
      params,
    });

    const data = res?.data?.response?.results;

    const formattedData = data?.map((item) => ({
      title: item?.webTitle,
      thumbnail: item?.fields?.thumbnail,
      url: item?.webUrl,
      publishedAt: formatDate(item?.webPublicationDate),
      category: item?.pillarName || "Uncategorized",
      source: "The Guardian",
    }));

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
