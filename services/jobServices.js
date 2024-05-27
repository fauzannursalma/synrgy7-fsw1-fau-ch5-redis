const axios = require("axios");
const redis = require("redis");

const client = redis.createClient({
  url: "redis://localhost:6379",
  socket: {
    connectTimeout: 5000,
  },
});

client.connect().catch((err) => console.log(err));

const getJobs = async (req, res) => {
  const searchTerm = req.query.search;

  try {
    const comments = await client.get(searchTerm);

    if (comments) {
      res.status(200).send({
        message: "Data retrieved from the cache",
        data: JSON.parse(comments),
      });
    } else {
      const response = await axios.get(
        ` https://jsonplaceholder.typicode.com/comments?postId=${searchTerm}`
      );
      client.setEx(searchTerm, 600, JSON.stringify(response.data));

      res.status(200).send({
        message: "Success from API",
        data: response.data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error fetching data from API" });
  }
};

module.exports = { getJobs };
