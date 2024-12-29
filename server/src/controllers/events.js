import { Event } from "../models/eventModel.js";

export const createEvent = async (req, res) => {
    const { title, description, location, category, visibility } = req.body;

    try {
        const newEvent = await Event.create({
            title,
            description,
            location,
            category,
            visibility,
            creator: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Event added successfully",
            event: newEvent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
      // Query events based on visibility (public or creator matches the logged-in user)
      const events = await Event.find({
        $or: [
          { visibility: 'public' }, // Public events
          { creator: req.user._id }, // Private events created by the logged-in user
        ]
      });
  
      // Check if events exist
      if (!events || events.length === 0) {
        return res.status(404).json({
          success: false,
          message: "There are no events",
        });
      }
  
      // Return the events in the response
      res.json({
        success: true,
        message: "All events",
        events,
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };