const session = (req, res) => {
    console.log(req.session); // Debug the session on the server
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
}

module.exports = session;