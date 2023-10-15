import Video from "../models/Video.js";
import User from "../models/User.js";

export const home = async (req, res) => {
  // try {
  //   const videos = await Video.find({});
  //   return res.render("home", { pageTitle: "Home", videos });
  // } catch(error) {
  //   return res.render("server-error", {error});
  // }
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  // console.log(videos);
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    // 예외처리 (비디오가 없을때!)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    // 예외처리 (비디오가 없을때!)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    // 예외처리 (비디오가 없을때!)
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const { path: fileUrl } = req.file;
  // here we will add a video to the videos array.
  const { title, description, hashtags } = req.body;
  // const video = new Video({
  //   title,
  //   description,
  //   createAt: Date.now(),
  //   hashtags: hashtags.split(",").map((ward) => `#${ward}`),
  //   meta: {
  //     views: 0,
  //     rating: 0,
  //   },
  // });
  // await video.save();
  try {
    const newVideo = await Video.create({
      title,
      description,
      // createAt: Date.now(),
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
      // meta: {
      //   views: 0,
      //   rating: 0,
      // },
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  const user = await User.findById(_id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({ title: keyword });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
