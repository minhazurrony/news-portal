import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { SOURCES } from "../constants";

export const useFetchNews = ({ keyword, date, category, source }) => {
  const [newsData, setNewsData] = useState([]);

  const getBbcNews = async () => {
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
        publishedAt: dayjs(item?.publishedAt).format("YYYY-MM-DD"),
        category: "Uncategorized",
        source: "BBC News",
      }));

      return formattedData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getGuardianNews = async () => {
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
        publishedAt: dayjs(item?.webPublicationDate).format("YYYY-MM-DD"),
        category: item?.pillarName || "Uncategorized", // Adjust category here
        source: "The Guardian",
      }));

      return formattedData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getNewYorkTimesNews = async () => {
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
        publishedAt: dayjs(item?.pub_date).format("YYYY-MM-DD"),
        category: item?.type_of_material || "Uncategorized", // Adjust category here
        source: "New York Times",
      }));

      return formattedData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const {
    data: guardianNewsData,
    isLoading: isGuardianNewsLoading,
    error: guardianNewsError,
  } = useQuery({
    queryKey: ["guardian-news", keyword, source],
    queryFn: getGuardianNews,
    enabled: source === SOURCES.theGuardian,
  });

  const {
    data: newYorkTimesData,
    isLoading: isNewYorkTimesLoading,
    error: newYorkTimesError,
  } = useQuery({
    queryKey: ["new-york-times", keyword, source],
    queryFn: getNewYorkTimesNews,
    enabled: source === SOURCES.newYorkTimes,
  });

  const {
    data: bbcNewsData,
    isLoading: isBbcNewsLoading,
    error: bbcNewsError,
  } = useQuery({
    queryKey: ["bbc-news", keyword, source],
    queryFn: getBbcNews,
    enabled: source === SOURCES.bbcNews,
  });

  useEffect(() => {
    if (!isGuardianNewsLoading && !isNewYorkTimesLoading && !isBbcNewsLoading) {
      setNewsData(() => [
        ...(guardianNewsData || []),
        ...(newYorkTimesData || []),
        ...(bbcNewsData || []),
      ]);
    }
  }, [
    isGuardianNewsLoading,
    isNewYorkTimesLoading,
    isBbcNewsLoading,
    guardianNewsData,
    newYorkTimesData,
    bbcNewsData,
  ]);

  const formatDate = (date) => {
    return date ? dayjs(date).format("YYYY-MM-DD") : null;
  };

  const filteredData = useMemo(() => {
    if (!category && !source && !date) {
      return newsData;
    }
    return newsData.filter((item) => {
      const matchesCategory = category ? item.category === category : true;
      const matchesSource = source ? item.source === source : true;

      const itemDate = formatDate(item.publishedAt);
      const filterDate = formatDate(date);

      const matchesDate = filterDate ? itemDate === filterDate : true;

      return matchesCategory && matchesSource && matchesDate;
    });
  }, [newsData, category, source, date]);

  return {
    filteredData: filteredData,
    data: newsData,
    isLoading:
      isGuardianNewsLoading || isNewYorkTimesLoading || isBbcNewsLoading,
    error: guardianNewsError || newYorkTimesError || bbcNewsError,
  };
};
