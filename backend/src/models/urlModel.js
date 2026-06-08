import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },

    shortUrl: {
        type: String,
        required: true,
        unique: true
    },

    totalClicks: {
        type: Number,
        default: 0
    },

    clicks: [
        {
            country: String,

            referrer: {
                type: String,
                default: "Direct"
            },

            device: String,

            browser: String,

            os: String,

            clickedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
},
{
    timestamps: true
});

export default mongoose.model("Url", urlSchema);