const User = require("../models/userModel");

const newUser = [
  {
    email: "paarth@gmail.com",
    password: "304304"
  },
  {
    email: "test123@test.com",
    password: "test"
  }
];

const userSeeder = async () => {
  await User.sync({ force: true });
  newUser.forEach(async (user) => {
    try {
      const result = await User.create(user);
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};

userSeeder();
