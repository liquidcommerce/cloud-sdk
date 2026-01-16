const  createUser = () => {
  return JSON.stringify({
    email: "aqa@reservebar.com",
    firstName: 'Thomas',
    lastName: 'Anderson',
  });
};

const  addAddress = (userId:string) => {
  return JSON.stringify({
    userId: userId,
    one: "30 Water St",
    two: "",
    city: "New York",
    state: "NY",
    zip: "10004",
    type: "shipping",
    placesId: "ChIJ30n6VeoCwokRjnU1ilD5dRE",
    lat: 40.7032272,
    long: -74.0111402
  });
};

export const requestData = {
  createUser,
  addAddress
};
