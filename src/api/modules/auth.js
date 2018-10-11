export const authenticate = (req, res) => {
  const user = req.body.username;

  res.status(200).send(`You logged in with username ${user}`);
};
