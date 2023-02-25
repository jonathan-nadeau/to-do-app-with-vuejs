class FilterService {
  public filters: Array<{
    label: string;
    isChecked: boolean;
  }> = [];

  constructor(filters: Set<string>) {
    filters.forEach((filter) => {
      this.filters.push({
        label: filter,
        isChecked: false,
      });
    });
  }

  static Builder = class {
    static filters: Set<string> = new Set();

    static withLabel(filter: string) {
      this.filters.add(filter);
      return this;
    }

    static build() {
      return new FilterService(this.filters);
    }
  };
}

export default FilterService;
