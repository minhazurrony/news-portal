export const getCategoryOptions = (data) => {
  const uniqueCategories = new Set(data.map((item) => item.category));
  const categoryOptions = Array.from(uniqueCategories).map((category) => ({
    label: category,
    value: category,
  }));

  return categoryOptions;
};
