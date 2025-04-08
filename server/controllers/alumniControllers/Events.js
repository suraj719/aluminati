const Event = require("../../models/EventModel");
const Alumni = require("../../models/AlumniModel");
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

const registerForEvent = async (req, res) => {
  const { eventId, alumniId } = req.body;

  try {
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res
        .status(404)
        .json({ message: "Event not found", success: false });
    }

    // Check if alumni exists
    const alumni = await Alumni.findById(alumniId);
    if (!alumni) {
      return res
        .status(404)
        .json({ message: "Alumni not found", success: false });
    }

    // Check if already registered
    const alreadyRegistered = event.registeredAlumni.includes(alumniId);
    if (alreadyRegistered) {
      return res
        .status(400)
        .json({ message: "Already registered", success: false });
    }
    alumni.password = undefined; // Remove password from alumni object
    // Register alumni
    event.registeredAlumni.push(alumni);
    await event.save();

    res.status(200).json({
      message: "Registration successful",
      success: true,
      eventId: event._id,
      alumniId: alumni._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong!",
      success: false,
    });
  }
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  registerForEvent,
};
