const jwt = require("jsonwebtoken");
const User = require("../models/user");

const loginUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = req.body;

    if (!email || !password)
      reject({
        status: 400,
        message: "Bad request. Missing credentials.",
      });

    const foundUser = await User.findOne({ email });

    if (!foundUser)
      reject({
        status: 404,
        message: "User not found",
      });

    if (foundUser.validPassword(password)) {
      const accessToken = jwt.sign(
        { user: foundUser },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      foundUser.refreshToken = refreshToken;
      foundUser.save();

      req.user = foundUser;
      res.cookie("jwt", refreshToken, {
        maxAge: 1000 * 3600 * 24,
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });

      resolve({
        status: 200,
        data: {
          accessToken,
          roles: foundUser.roles,
          user: foundUser,
        },
      });
    }

    reject({
      status: 401,
      message: "Wrong password!",
    });
  });
};

const refreshToken = (req, res) => {
  return new Promise(async (resolve, reject) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return reject({ status: 401 });

    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });

    if (!foundUser) return reject({ status: 403 });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err) => {
      if (err) return reject({ status: 403 });
      const accessToken = jwt.sign(
        { user: foundUser },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
      );
      resolve({
        status: 200,
        data: {
          accessToken,
          roles: foundUser.roles,
          user: foundUser,
        },
      });
    });
  });
};

const logoutUser = (req, res) => {
  return new Promise(async (resolve, reject) => {
    // On client, also delete the accessToken

    // refreshToken is required to log out
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      reject({ status: 401, message: "Refresh token required!" });
      return;
    }

    // Is refreshToken in database?
    const foundUser = await User.findOne({ refreshToken: cookies.jwt });

    res.clearCookie("jwt", { httpOnly: true });
    res.clearCookie("authorization", { httpOnly: true });

    if (foundUser) {
      // Delete refreshToken in database
      foundUser.refreshToken = "";
      foundUser.save();
    }

    resolve({ status: 204 });
  });
};

module.exports = { loginUser, refreshToken, logoutUser };
