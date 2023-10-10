let miniDatabase = {
  // Everything related to User
  Users: [
    {
      id: "64509f4ed4f99187bde47c3c",
      username: "jasonbi93",
      email: "jasonbi93q@hotmail.com",
      // password is: qwerty123456
      password: "$2b$10$Tx6nClgfoAqAN5Gsyzu6Uur396x7HgwktSlwSrPpfd2jgdsVBYuda",
      verifyEmail: "",
      accessToken: "",
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUwOWY0ZWQ0Zjk5MTg3YmRlNDdjM2MiLCJ1c2VyRW1haWwiOiJqYXNvbmJpOTNxQGhvdG1haWwuY29tIiwidXNlcm5hbWUiOiJqYXNvbmJpOTMiLCJpYXQiOjE2OTY1NzI5OTB9.MIP2JN61VoJY9QqxZEdGcE4IdjzH7xORZtsxTqmg350",
      deletedAt: "",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
    {
      id: "64509fd3d4f99187bde47c80",
      username: "smith_out",
      email: "smith_out@hotmail.com",
      // password is: password123456
      password: "$2b$10$kw688HaefTy2J5nzU4PfAeiihCuvB0dQpdtxFm/HQwcl6OYryZujm",
      verifyEmail:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUwOWZkM2Q0Zjk5MTg3YmRlNDdjODAiLCJ1c2VyRW1haWwiOiJzbWl0aF9vdXRAaG90bWFpbC5jb20iLCJ1c2VybmFtZSI6InNtaXRoX291dCIsImlhdCI6MTY5NjU3MzA0MX0.Jae3AaFIFMcbBZbpHnVWLedP2AhgcI0hNtLb5POBfIo",
      accessToken: "",
      refreshToken: "",
      deletedAt: "",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
    {
      id: "64534c16442ebdc828bec2c7",
      username: "miranda92",
      email: "miranda_b92@hotmail.com",
      // password is: mir123456
      password: "$2b$10$G62Ow3B6XSIncGJY5ekk.uvbejAdOkOkJNw4PmQDmtzyuoHsXYdF6",
      verifyEmail: "",
      accessToken: "",
      refreshToken: "",
      deletedAt: "",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
  ],
  ResetPasswordHash: [
    {
      id: "64549231b1a2aca7b5b11c01",
      userId: "64509f4ed4f99187bde47c3c",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUwOWY0ZWQ0Zjk5MTg3YmRlNDdjM2MiLCJpYXQiOjE2OTY5MjYwODB9.ssPV0u70m0myyaMTnp6Go-RAwoG-09fR8LrnA6sxzAM",
      expiresAt: 1694855778,
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
  ],
  SwapEmailHash: [
    {
      id: "645493a5b1a2aca7b5b11cad",
      userId: "64509f4ed4f99187bde47c3c",
      newEmail: "jason_new@hotmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUwOWY0ZWQ0Zjk5MTg3YmRlNDdjM2MiLCJ1c2VyRW1haWwiOiJqYXNvbmJpOTNxQGhvdG1haWwuY29tIiwidXNlcm5hbWUiOiJqYXNvbmJpOTMiLCJpYXQiOjE2OTY1NzI5OTB9.MIP2JN61VoJY9QqxZEdGcE4IdjzH7xORZtsxTqmg350",
      expiresAt: 1694855778,
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
  ],

  // Blogs start here
  Blogs: [
    {
      id: "645496aa51a097435544257f",
      title: "My first blog",
      content:
        "This is my first blog and let me tell you something interesting about it",
      image: "base64...",
      userId: "64509f4ed4f99187bde47c3c",
      views: 6,
      likes: 3,
      visible: true,
      category: "Nature",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
    {
      id: "6458ce288aa2d89315c8cec2",
      title: "Second day of Blogging",
      content: "Today is my second when i joined this platform",
      image: "base64...",
      userId: "64509f4ed4f99187bde47c3c",
      views: 62,
      likes: 33,
      visible: true,
      category: "Life",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
    {
      id: "645b2eeda32acc9a2c247fa7",
      title: "How to learn new things",
      content: "Let me start by sharing a story with you...",
      image: "base64...",
      userId: "64534c16442ebdc828bec2c7",
      views: 60,
      likes: 49,
      visible: true,
      category: "Technology",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
    {
      id: "645b4585d02fb1a70607fc39",
      title: "Learning continues",
      content: "Its been a while and and here I began thinking",
      image: "base64...",
      userId: "64509f4ed4f99187bde47c3c",
      views: 61,
      likes: 23,
      visible: true,
      category: "Nature",
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
  ],
  BlogComments: [
    {
      id: "6462c33b6b2106c7e0994b52",
      userId: "64509f4ed4f99187bde47c3c",
      blogId: "645b4585d02fb1a70607fc39",
      content: "Great insight!",
      likes: 20,
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
    {
      id: "6462c4247aa50ebb67942520",
      userId: "64509f4ed4f99187bde47c3c",
      blogId: "645b4585d02fb1a70607fc39",
      content: "Nice blog",
      likes: 12,
      createdAt: 1694855778,
      updatedAt: 1694855778,
    },
  ],
};

module.exports = {
  miniDatabase,
};
