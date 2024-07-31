import axios from "axios";
import { formatDate } from "../utils/formatDate";

export const getBbcNews = async ({ queryKey }) => {
  const [_, keyword] = queryKey;

  try {
    const params = {
      apiKey: import.meta.env.VITE_NEWS_API_KEY,
      sources: "bbc-news",
      q: keyword,
    };

    const res = await axios.get(`https://newsapi.org/v2/everything`, {
      params,
    });

    const data = res?.data?.articles;

    const formattedData = data?.map((item) => ({
      title: item?.title,
      thumbnail: item?.urlToImage,
      url: item?.url,
      publishedAt: formatDate(item?.publishedAt),
      category: "Uncategorized",
      source: "BBC News",
    }));

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
