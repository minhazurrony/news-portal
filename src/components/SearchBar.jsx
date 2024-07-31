import React from "react";
import { SOURCE_OPTIONS } from "../constants";
import { DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

const styles = {
  form: {
    margin: "32px 0",
  },
  searchField: { width: 250 },
  otherFields: { width: 180 },
};

export const SearchBar = ({
  categoryOptions,
  handleInputChange,
  onDateChange,
  onSelectChange,
  formValues,
}) => {
  return (
    <Form name="search_bar" layout="inline" style={styles.form}>
      <Form.Item>
        <Input
          value={formValues.keyword}
          name="keyword"
          placeholder="Type to search news..."
          size="large"
          style={styles.searchField}
          onChange={(e) => handleInputChange("keyword", e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <DatePicker
          name="date"
          value={formValues.date ? dayjs(formValues.date, "YYYY-MM-DD") : null}
          placeholder="Select date"
          style={styles.otherFields}
          size="large"
          onChange={onDateChange}
          maxDate={dayjs()}
        />
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
      <Form.Item>
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
      </Form.Item>
    </Form>
  );
};
