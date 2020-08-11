const Friend = require("../models/friendModel");

const newFriend = [
  {
    friendName: "Paarth",
    userId: 1
  },
  {
    friendName: "Singh",
    userId: 1
  },
  {
    friendName: "Rathore",
    userId: 2
  },
  {
    friendName: "Gokul",
    userId: 2
  },
  {
    friendName: "Yash",
    userId: 2
  },
  {
    friendName: "Dev",
    userId: 2
  },
  {
    friendName: "Aman",
    userId: 2
  },
  {
    friendName: "Tej",
    userId: 2
  },
  {
    friendName: "Tom",
    userId: 2
  },
  {
    friendName: "Harry",
    userId: 1
  },
  {
    friendName: "Krishna",
    userId: 1
  },
  {
    friendName: "Ajay",
    userId: 1
  }
];

const friendSeeder = async () => {
  await Friend.sync({ force: true });
  newFriend.forEach(async friend => {
    try {
      const result = await Friend.create(friend);
      console.log(result.get());
    } catch (e) {
      console.error(e);
    }
  });
};

friendSeeder();
