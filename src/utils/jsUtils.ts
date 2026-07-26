export function sortBy<T>(
    array: T[],
    getter: (item: T) => string | number | boolean,
  ): T[] {
    const sortedArray = [...array];
    sortedArray.sort((a, b) =>
      getter(a) > getter(b) ? 1 : getter(b) > getter(a) ? -1 : 0,
    );
    return sortedArray;
  }
  
  export function toggleListItem<T>(list: T[], item: T): T[] {
    const itemIndex = list.indexOf(item);
    if (itemIndex === -1) {
      return list.concat(item);
    }
    const newList = [...list];
    newList.splice(itemIndex, 1);
    return newList;
  }

  export function uniqBy<T>(array: T[], keyFn: (item: T) => string | number): T[] {
    const seen = new Set<string | number>();
    const result: T[] = [];
    for (const item of array) {
      const key = keyFn(item);
      if (!seen.has(key)) {
        seen.add(key);
        result.push(item);
      }
    }
    return result;
  }