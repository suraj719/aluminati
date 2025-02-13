const Event = require("../../models/EventModel");
const uploadToS3 = require("../../util/AWSUpload");

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      message: "Events retrieved successfully",
      success: true,
      events: events,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong!",
      success: false,
    });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }
    res.status(200).json({
      message: "Event retrieved successfully",
      success: true,
      event: event,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

const createEvent = async (req, res) => {
  const { title, description, date, location } = req.body;
  const file = req.file;
  let imgUrl = null;
  try {
    if (file) {
      imgUrl = await uploadToS3(file);
    }
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      image: imgUrl,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json({
      event: savedEvent,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
};
