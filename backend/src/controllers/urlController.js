import urlModel from "../models/urlModel.js";
import { nanoid } from "nanoid";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

const urlShortner = async (req, res) => {
  try {
    const { longUrl } = req.body;

    const shortUrl = nanoid(6);

    const url = await urlModel.create({
      longUrl,
      shortUrl,
    });

    res.status(201).json({
      success: true,
      data: shortUrl,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const { shortLink } = req.params;
    const url = await urlModel.findOne({
      shortUrl: shortLink,
    });


    if (!url) {
      return res.status(404).json({
        error: "URL not found",
      });
    }


    url.totalClicks += 1;

    const parser = new UAParser(req.headers["user-agent"]);

    const result = parser.getResult();

    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    const device = result.device.type || "Desktop";

    const referrer = req.headers.referer || "Direct";

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;

    const geo = geoip.lookup(ip);

    const country = geo?.country || "Unknown";

    url.clicks.push({
      country,
      referrer,
      device,
      browser,
      os,
    });

    await url.save();

    return res.status(200).json({
      longUrl: url.longUrl,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};


const getDashboardStats = async (req, res) => {
    try {

        const { shortUrl } = req.params;
        const url = await urlModel.findOne({ shortUrl });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "URL not found"
            });
        }

        const countryMap = {};
        const deviceMap = {};
        const browserMap = {};
        const osMap = {};
        const referrerMap = {};
        const trendMap = {};

        url.clicks.forEach(click => {

            countryMap[click.country || "Unknown"] =
                (countryMap[click.country || "Unknown"] || 0) + 1;

            deviceMap[click.device || "Unknown"] =
                (deviceMap[click.device || "Unknown"] || 0) + 1;

            browserMap[click.browser || "Unknown"] =
                (browserMap[click.browser || "Unknown"] || 0) + 1;

            osMap[click.os || "Unknown"] =
                (osMap[click.os || "Unknown"] || 0) + 1;

            referrerMap[click.referrer || "Direct"] =
                (referrerMap[click.referrer || "Direct"] || 0) + 1;

            const date =
                click.clickedAt
                    .toISOString()
                    .split("T")[0];

            trendMap[date] =
                (trendMap[date] || 0) + 1;
        });

        const clickTrend = Object.entries(trendMap)
            .sort((a, b) =>
                new Date(a[0]) - new Date(b[0])
            )
            .slice(-5)
            .map(([date, clicks]) => ({
                date,
                clicks
            }));

        res.json({
            success: true,

            shortUrl: url.shortUrl,
            longUrl: url.longUrl,

            totalClicks: url.totalClicks,

            countryData: Object.entries(countryMap)
                .map(([name, value]) => ({
                    name,
                    value
                })),

            deviceData: Object.entries(deviceMap)
                .map(([name, value]) => ({
                    name,
                    value
                })),

            browserData: Object.entries(browserMap)
                .map(([name, value]) => ({
                    name,
                    value
                })),

            osData: Object.entries(osMap)
                .map(([name, value]) => ({
                    name,
                    value
                })),

            referrerData: Object.entries(referrerMap)
                .map(([name, value]) => ({
                    name,
                    value
                })),

            clickTrend,

            recentClicks:
                url.clicks
                    .sort(
                        (a, b) =>
                            new Date(b.clickedAt) -
                            new Date(a.clickedAt)
                    )
                    .slice(0, 10)
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

export { urlShortner, getOriginalUrl, getDashboardStats };
