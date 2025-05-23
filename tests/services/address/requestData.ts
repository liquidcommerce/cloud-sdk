
const  autocomplete = () => {
  return JSON.stringify({
    input: "100 Madison Ave, New",
    key: process.env.GOOGLE_PLACES_API_KEY,
    refresh: false
  });
};

const  getAddressDetails = () => {
  return JSON.stringify({
    id: "ChIJ30n6VeoCwokRjnU1ilD5dRE",
    key: process.env.GOOGLE_PLACES_API_KEY,
    refresh: false
  });
};

export const requestData = {
  autocomplete,
  getAddressDetails
};
