const  createUser = () => {
  return JSON.stringify({
    email: "aqa@reservebar.com",
    firstName: 'Thomas',
    lastName: 'Anderson',
  });
};

export const requestData = {
  createUser,
};
