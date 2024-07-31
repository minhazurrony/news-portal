import React from "react";
import { Card, Typography, Space, Tag } from "antd";
import dayjs from "dayjs";

const { Title, Link } = Typography;

const styles = {
  card: { height: "100%" },
  cardImage: { height: 270, objectFit: "fill" },
  newsInfoContainer: { marginTop: 12, marginBottom: 32 },
};

export const NewsCard = ({ news, isLoading }) => {
  return (
    <Card
      loading={isLoading}
      style={styles.card}
      cover={
        <img alt="news-image" src={news?.thumbnail} style={styles.cardImage} />
      }>
      <Title level={5}>
        {news?.title}{" "}
        <Link href={news?.url} target="_blank" underline>
          Read More
        </Link>
      </Title>
      <Space direction="vertical" style={styles.newsInfoContainer}>
        <span>
          Published:{" "}
          <Tag color="purple" bordered={false}>
            {dayjs(news?.publishedAt).format("MMMM D, YYYY")}
          </Tag>
        </span>
        <span>
          Category:{" "}
          <Tag color="processing" bordered={false}>
            {news?.category ?? "N/A"}
          </Tag>
        </span>
        <span>
          Source:{" "}
          <Tag color="cyan" bordered={false}>
            {news?.source ?? "N/A"}
          </Tag>
        </span>
      </Space>
    </Card>
  );
};
