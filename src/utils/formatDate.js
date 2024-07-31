import dayjs from "dayjs";

export const formatDate = (date) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : null;
};
