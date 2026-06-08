import { useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend
} from "recharts";

function Dashboard() {
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    if (!shortUrl.trim()) {
      alert("Enter Short URL");
      return;
    }

    const lastPart = shortUrl.split("/").pop();


    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/url/dashboard/${lastPart}`,
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Analytics not found"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header */}

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          URL Analytics Dashboard
        </h1>

        {/* Search Section */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              placeholder="Enter Short URL"
              value={shortUrl}
              onChange={(e) =>
                setShortUrl(e.target.value)
              }
              className="flex-1 border rounded-lg p-3 outline-none"
            />

            <button
              onClick={fetchAnalytics}
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-lg"
            >
              {loading
                ? "Loading..."
                : "Generate Analytics"}
            </button>

          </div>

        </div>

        {/* Dashboard */}

        {analytics && (
          <>
            {/* URL Information */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

              <h2 className="text-2xl font-semibold mb-3">
                URL Details
              </h2>

              <p className="mb-2">
                <span className="font-semibold">
                  Short URL:
                </span>{" "}
                {analytics.shortUrl}
              </p>

              <p>
                <span className="font-semibold">
                  Original URL:
                </span>{" "}
                {analytics.longUrl}
              </p>

            </div>

            {/* Total Clicks */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

              <h3 className="text-gray-500 text-lg">
                Total Clicks
              </h3>

              <h1 className="text-6xl font-bold mt-3">
                {analytics.totalClicks}
              </h1>

            </div>

            {/* Row 1 */}

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              {/* Country */}

              <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Country Analytics
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <PieChart>

                    <Pie
                      data={analytics.countryData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    />

                    <Tooltip />

                    <Legend />

                  </PieChart>
                </ResponsiveContainer>

              </div>

              {/* Device */}

              <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Device Analytics
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <PieChart>

                    <Pie
                      data={analytics.deviceData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    />

                    <Tooltip />

                    <Legend />

                  </PieChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* Row 2 */}

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              {/* Browser */}

              <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Browser Analytics
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <BarChart
                    data={analytics.browserData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>

              </div>

              {/* OS */}

              <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Operating System
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <BarChart
                    data={analytics.osData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="value" />
                  </BarChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* Row 3 */}

            <div className="grid md:grid-cols-2 gap-6 mb-8">

              {/* Referrer */}

              <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Referrer Analytics
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <PieChart>

                    <Pie
                      data={analytics.referrerData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={110}
                      label
                    />

                    <Tooltip />

                    <Legend />

                  </PieChart>
                </ResponsiveContainer>

              </div>

              {/* Trend */}

              <div className="bg-white rounded-xl shadow p-5">

                <h2 className="text-xl font-semibold mb-4">
                  Last 5 Days Click Trend
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={320}
                >
                  <LineChart
                    data={analytics.clickTrend}
                  >
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="date" />

                    <YAxis />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="clicks"
                    />
                  </LineChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-2xl font-semibold mb-5">
                Recent Click Activity
              </h2>

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="border-b">

                      <th className="text-left p-3">
                        Country
                      </th>

                      <th className="text-left p-3">
                        Device
                      </th>

                      <th className="text-left p-3">
                        Browser
                      </th>

                      <th className="text-left p-3">
                        OS
                      </th>

                      <th className="text-left p-3">
                        Referrer
                      </th>

                      <th className="text-left p-3">
                        Click Time
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {analytics.recentClicks?.map(
                      (click, index) => (
                        <tr
                          key={index}
                          className="border-b"
                        >
                          <td className="p-3">
                            {click.country}
                          </td>

                          <td className="p-3">
                            {click.device}
                          </td>

                          <td className="p-3">
                            {click.browser}
                          </td>

                          <td className="p-3">
                            {click.os}
                          </td>

                          <td className="p-3">
                            {click.referrer}
                          </td>

                          <td className="p-3">
                            {new Date(
                              click.clickedAt
                            ).toLocaleString()}
                          </td>
                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;