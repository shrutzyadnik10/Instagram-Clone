var http = require("http");
const express = require("express");
const app = express();
const port = 2903;
const find = require("lodash/find");
const ImageUpload = require("./lib/ImageManager.js");
const mongoose = require("mongoose");
const userModel = require("./schema/user");
const postModel = require("./schema/post");
var cors = require("cors");
mongoose.connect("mongodb+srv://Shubham:2903@cluster0.zfrj8.mongodb.net/test");

app.use(cors());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
app.use("/api-docs", express.static("api-docs"));
app.use("/media", express.static("storage/files"));

//BODY-PARSER FOR REQUEST DATA
var bodyParser = require("body-parser");
const logger = require("morgan");
app.use(logger("common"));

var multer = require("multer");
// MULTER INTEGRATION
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/").pop();
    const hash = Math.random().toString(36).substr(2, 8);
    const name = [file.fieldname, hash, Date.now()].join("-") + "." + ext;
    cb(null, name);
  },
});
app.use(multer({ storage: storage }).any());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "access-control-allow-methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  );

  next();
});

/**
 * @api {post} /addPost Add Instagram Post
 * @apiDescription Add Instagram Post
 * @apiParamExample Postman:
 * profile_image: 'file'
 */
app.post("/addPost", async (req, res) => {
  const im = new ImageUpload();
  const data = req.body;
  if (req.files.length > 0)
    data.post_image = find(req.files, { fieldname: "post_image" });
  if (data.post_image) data.post_image = await im.save(data.post_image.path);
  const _s = new postModel(data);
  var __resp = await _s.save();
  res.json(__resp);
});

/**
 * @api {get} /get dashboard post
 * @apiDescription using this we can get the dashboard post with userId
 * @apiParamExample Postman:
 * _id: id
 */
app.get(`/getDashboarPost/:id`, async (req, res) => {
  const userFollowing = await userModel.findOne({
    _id: req.params.id,
  });
  let data = await postModel
    .find({ userId: { $in: userFollowing.following } })
    .populate("userId")
    .exec();
  res.json(data);
});

app.get(`/getPostById/:id`, async (req, res) => {
  const data = await postModel.find({
    userId: req.params.id,
  });
  res.json(data);
});

app.post("/like", async (req, res) => {
  var __resp = await postModel.updateOne(
    { _id: req.body.postId },
    {
      $push: {
        likes: req.body.userId,
      },
    }
  );
  res.json(__resp);
});

app.post("/dislike", async (req, res) => {
  var __resp = await postModel.updateOne(
    { _id: req.body.postId },
    {
      $pull: {
        likes: req.body.userId,
      },
    }
  );
  res.json(__resp);
});

app.post("/comment", async (req, res) => {
  var _user = await userModel.findOne({
    _id: req.body.userId,
  });
  var __resp = await postModel.updateOne(
    { _id: req.body.postId },
    {
      $push: {
        comments: {
          userId: req.body.userId,
          comment: req.body.comment,
          userName: _user.username,
          profile_image: _user.profile_image,
        },
      },
    }
  );
  res.json(__resp);
});

app.post("/post/delete", async (req, res) => {
  console.log("Req", req.body);
  const data = await postModel.deleteOne({ _id: req.body.postId });
  res.json(data);
});

app.post("/follow", async (req, res) => {
  const _s = await userModel.updateOne(
    {
      _id: req.body.userId,
    },
    {
      $push: {
        following: req.body.followUserId,
      },
    }
  );
  const _g = await userModel.updateOne(
    {
      _id: req.body.followUserId,
    },
    {
      $push: {
        followers: req.body.userId,
      },
    }
  );
  res.json([_s, _g]);
});

app.post("/unfollow", async (req, res) => {
  const _s = await userModel.updateOne(
    {
      _id: req.body.userId,
    },
    {
      $pull: {
        following: req.body.unfollowUserId,
      },
    }
  );
  const _g = await userModel.updateOne(
    {
      _id: req.body.unfollowUserId,
    },
    {
      $pull: {
        followers: req.body.userId,
      },
    }
  );
  res.json([_s, _g]);
});

/**
 * @api {post} /Test
 * @apiDescription Add Instagram Post
 * @apiParamExample Postman:
 * first_name: 'Shubham',
 * last_name: 'lilawala',
 * user_name: 'Shubham',
 * email: 'shubhamlilawala691@gmail.com',
 * password: '29032'
 */
app.post("/addUser", async (req, res) => {
  const im = new ImageUpload();
  const data = req.body;
  if (req.files.length > 0)
    data.profile_image = find(req.files, { fieldname: "profile_image" });
  if (data.profile_image)
    data.profile_image = await im.save(data.profile_image.path);
  const _s = new userModel(data);
  var __resp = await _s.save();
  res.json(__resp);
});
/**
 * @api {post} /getUser Add Instagram Post
 * @apiDescription Add Instagram Post
 * @apiParamExample Postman:
 * user_name: 'Shubham',
 * password: '29032'
 */
app.post("/getUser", async (req, res) => {
  const data = await userModel.find({
    $and: [{ username: req.body.username }, { password: req.body.password }],
  });
  if (data.length == 1) {
    res.json(data[0]);
  } else {
    res.status(300).json(null);
  }
});

app.get(`/getOneUser/:id`, async (req, res) => {
  const data = await userModel.find({ _id: req.params.id });
  res.json(data[0]);
});
app.post("/getAllUser", async (req, res) => {
  const data = await userModel.find({});
  res.json(data);
});

app.post("/user/delete", async (req, res) => {
  const data = await userModel.deleteOne({ _id: req.body.userId });
  res.json(data);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
