import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  // console.log(res.locals);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  // 로그인 되어 있으면 쭉가고, 로그인 안되어 있으면 로그인이나 해라 얍!
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  // 로그인 안되어 있으면 쭉가고, 로그인 되어 있으면 이미로긘하셨잖아요 홈가세여!
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 3000000 },
});
export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
});
