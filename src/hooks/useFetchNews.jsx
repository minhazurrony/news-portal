import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { SOURCES } from "../constants";
import { formatDate } from "../utils/formatDate";
import { getBbcNews, getGuardianNews, getNewYorkTimesNews } from "../services";

export const useFetchNews = ({ keyword, date, category, source }) => {
  const [newsData, setNewsData] = useState([]);

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
