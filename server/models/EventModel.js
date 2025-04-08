const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    date: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    registeredAlumni: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
