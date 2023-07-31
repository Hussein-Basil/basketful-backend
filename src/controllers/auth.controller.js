const jwt = require("jsonwebtoken");
const User = require("../models/user");

const handleLogin = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Bad request. Missing credentials!" });
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(404).json({ message: "User is not found." });
  }

  if (foundUser.validPassword(password)) {
    const accessToken = jwt.sign(
      { user: foundUser },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    foundUser.refreshToken = refreshToken;

    foundUser.save();

    res.cookie("jwt", refreshToken, { maxAge: 1000 * 3600 * 24 });

    res.status(200).json({ accessToken, roles: foundUser.roles });
  } else {
    res.status(401).json({ message: "Wrong password!" });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    const accessToken = jwt.sign(
      { user: foundUser },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken, roles: foundUser.roles });
  });
};

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  // refreshToken is required to log out
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);

  // Is refreshToken in database?
  const foundUser = await User.findOne({ refreshToken: cookies.jwt });

  res.clearCookie("jwt", { httpOnly: true });

  if (foundUser) {
    // Delete refreshToken in database
    foundUser.refreshToken = "";
    foundUser.save();
  }

  res.sendStatus(204);
};

module.exports = { handleLogin, handleRefreshToken, handleLogout };
