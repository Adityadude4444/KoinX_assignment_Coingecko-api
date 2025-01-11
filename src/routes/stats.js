const express = require("express");
const Crypto = require("../models/Crypto");

const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  if (!coin)
    return res.status(400).json({ error: "Coin parameter is required" });

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });
    if (!latestData)
      return res
        .status(404)
        .json({ error: "No data found for the given coin" });

    res.json({
      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;