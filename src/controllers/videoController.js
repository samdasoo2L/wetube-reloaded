import Video from "../models/Video.js";

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
  const video = await Video.findById(id);
  if (!video) {
    // 예외처리 (비디오가 없을때!)
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", {
    pageTitle: video.title,
    video,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    // 예외처리 (비디오가 없을때!)
    return res.render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    // 예외처리 (비디오가 없을때!)
    return res.render("404", { pageTitle: "Video not found." });
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
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
    await Video.create({
      title,
      description,
      // createAt: Date.now(),
      hashtags: Video.formatHashtags(hashtags),
      // meta: {
      //   views: 0,
      //   rating: 0,
      // },
    });
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
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
