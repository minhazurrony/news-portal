import React from "react";
import { SOURCE_OPTIONS } from "../constants";
import { DatePicker, Input, Select, Row, Col } from "antd";
import dayjs from "dayjs";

const styles = {
  form: {
    margin: "32px 0",
  },
  searchField: { width: "100%" },
  otherFields: { width: "100%" },
};

export const SearchBar = ({
  categoryOptions,
  handleInputChange,
  onDateChange,
  onSelectChange,
  formValues,
}) => {
  return (
    <Row gutter={[16, 16]} style={styles.form}>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}>
        <Input
          value={formValues.keyword}
          name="keyword"
          placeholder="Type to search news..."
          size="large"
          style={styles.searchField}
          onChange={(e) => handleInputChange("keyword", e.target.value)}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}>
        <DatePicker
          name="date"
          value={formValues.date ? dayjs(formValues.date, "YYYY-MM-DD") : null}
          placeholder="Select date"
          style={styles.otherFields}
          size="large"
          onChange={onDateChange}
          maxDate={dayjs()}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}>
        <Select
          name="category"
          value={formValues.category}
          allowClear
          placeholder="Select category"
          options={categoryOptions}
          style={styles.otherFields}
          size="large"
          onChange={(value) => onSelectChange("category", value)}
        />
      </Col>
      <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 6 }}>
        <Select
          name="source"
          value={formValues.source}
          allowClear
          placeholder="Select source"
          options={SOURCE_OPTIONS}
          style={styles.otherFields}
          size="large"
          onChange={(value) => onSelectChange("source", value)}
        />
      </Col>
    </Row>
  );
};
