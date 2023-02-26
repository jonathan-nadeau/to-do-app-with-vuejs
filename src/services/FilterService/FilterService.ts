class FilterService {
  public filters: Array<{
    label: "Done" | "Expired" | "To do" | "No time limit" | "In time";
    isChecked: boolean;
  }> = [];

  constructor(
    filters: Set<"Done" | "Expired" | "To do" | "No time limit" | "In time">
  ) {
    filters.forEach((filter) => {
      this.filters.push({
        label: filter,
        isChecked: false,
      });
    });
  }

  static Builder = class {
    static filters: Set<
      "Done" | "Expired" | "To do" | "No time limit" | "In time"
    > = new Set();

    static withLabel(
      filter: "Done" | "Expired" | "To do" | "No time limit" | "In time"
    ) {
      this.filters.add(filter);
      return this;
    }

    static build() {
      return new FilterService(this.filters);
    }
  };
}

export default FilterService;
