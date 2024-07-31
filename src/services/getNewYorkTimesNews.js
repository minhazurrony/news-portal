import axios from "axios";
import { formatDate } from "../utils/formatDate";

export const getNewYorkTimesNews = async ({ queryKey }) => {
  const [_, keyword] = queryKey;

  try {
    const params = {
      "api-key": import.meta.env.VITE_NEW_YORK_TIMES_API_KEY,
      sort: "newest",
      q: keyword,
    };

    const res = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
      { params }
    );

    const data = res?.data?.response?.docs;

    const formattedData = data?.map((item) => ({
      title: item?.headline.main,
      thumbnail: item?.multimedia?.[0]?.url
        ? `https://www.nytimes.com/${item.multimedia[0].url}`
        : null,
      url: item?.web_url,
      publishedAt: formatDate(item?.pub_date),
      category: item?.type_of_material || "Uncategorized",
      source: "New York Times",
    }));

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};
