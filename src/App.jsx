import { Row, Col, message, Spin, Result } from "antd";
import { getCategoryOptions } from "./utils/getCategoryOptions";
import { NewsCard, SearchBar } from "./components";
import { useFetchNews } from "./hooks/useFetchNews";
import { useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useEffect } from "react";
import { SOURCES } from "./constants";

const INITIAL_FORM_VALUES = {
  keyword: null,
  date: null,
  category: null,
  source: null,
};

const styles = {
  mainContainer: { paddingBottom: 32 },
  spinnerContainer: { minHeight: "50vh" },
};

function App() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);

  const handleInputChange = (name, value) => {
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onDateChange = (date) => {
    handleInputChange("date", date ? date.format("YYYY-MM-DD") : null);
  };

  const onSelectChange = (name, value) => {
    handleInputChange(name, value);
    window.localStorage.setItem(name, value);
  };

  useEffect(() => {
    const sourceFromLocalStorage = window.localStorage.getItem("source");
    const categoryFromLocalStorage = window.localStorage.getItem("category");

    setFormValues((prevState) => ({
      ...prevState,
      source:
        sourceFromLocalStorage !== "undefined" &&
        sourceFromLocalStorage !== null
          ? sourceFromLocalStorage
          : SOURCES.theGuardian,
      category:
        categoryFromLocalStorage !== "undefined" &&
        categoryFromLocalStorage !== null
          ? categoryFromLocalStorage
          : "News",
    }));
  }, []);

  const debouncedKeyword = useDebounce(formValues.keyword, 1000);

  const {
    filteredData: news,
    data: allNewsData,
    isLoading,
    error,
  } = useFetchNews({
    keyword: debouncedKeyword,
    date: formValues.date,
    category: formValues.category,
    source: formValues.source,
  });

  if (error) {
    message.error("Something went wrong.");
  }

  return (
    <Row style={styles.mainContainer}>
      <Col xs={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }}>
        <SearchBar
          handleInputChange={handleInputChange}
          onDateChange={onDateChange}
          onSelectChange={onSelectChange}
          categoryOptions={getCategoryOptions(allNewsData)}
          formValues={formValues}
        />
        <Spin
          spinning={isLoading}
          tip="Loading..."
          size="large"
          style={styles.spinnerContainer}>
          <Row gutter={[24, 24]}>
            {!news.length && !isLoading ? (
              <Col span={24}>
                <Result
                  title="No data found with this search and filter."
                  subTitle="Try with different keywords, date, category, source"
                />
              </Col>
            ) : (
              news.map((news, idx) => {
                return (
                  <Col
                    xs={{ span: 24 }}
                    lg={{ span: 12 }}
                    xl={{ span: 8 }}
                    key={idx}>
                    <NewsCard news={news} isLoading={isLoading} />
                  </Col>
                );
              })
            )}
          </Row>
        </Spin>
      </Col>
    </Row>
  );
}

export default App;
