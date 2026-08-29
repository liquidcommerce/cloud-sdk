const  searchItem = () => {
  return JSON.stringify({
    search: "",
    pageToken: "",
    entity: "",
    page: 0,
    perPage: 10,
    orderBy: "price",
    orderDirection: "desc",
    filters: [
      {
        key: "categories",
        values: [
          "SPIRITS > TEQUILA"
        ]
      },
      {
        key: "engraving",
        values: "YES"
      },
      {
        key: "fulfillment",
        values: [
          "onDemand"
        ]
      },
      {
        key: "tags",
        value: [
          "WOMAN OWNED"
        ]
      }
    ],
    loc: {
      address: {
        one: "100 madison ave",
        two: "apt 1707",
        city: "New york",
        state: "NY",
        zip: "10016"
      }
    },
    isLegacy: true,
    isLean: false,
    refresh: false
  });
};

const  availabilityItem = () => {
  return JSON.stringify({
    upcs: [
      "00812066021598"
    ],
    grouping: [
      "649066c19661fb45f6869934"
    ],
    loc: {
      address: {
        one: "100 madison ave",
        two: "apt 1707",
        city: "New york",
        state: "NY",
        zip: "10016"
      }
    },
    shouldShowOffHours: false,
    isLegacy: true,
    refresh: false,
    isLean: false
  });
}

export const requestData = {
  searchItem,
  availabilityItem
};
