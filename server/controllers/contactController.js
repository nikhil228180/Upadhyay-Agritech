import Contact from "../models/Contact.js";

// @route  POST /api/contact
// @access Public
export const submitContact = async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, phone and message are required",
      });
    }

    const contact = await Contact.create({ name, phone, email, message });

    res.status(201).json({
      success: true,
      message: "Message submitted successfully. We will contact you shortly!",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route  GET /api/contact
// @access Private / Admin
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @route  PATCH /api/contact/:id/read
// @access Private / Admin
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact inquiry not found",
      });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
