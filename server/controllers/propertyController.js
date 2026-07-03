import Property from "../models/Property.js";

// @route  GET /api/properties
// @access Public
export const getProperties = async (req, res) => {
  try {
    const { search, type, status, featured, page = 1, limit = 12 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (type && type !== "All") {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    if (featured === "true") {
      query.featured = true;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Property.countDocuments(query);

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/properties/:id
// @access Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  POST /api/properties
// @access Private / Admin
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      success: true,
      message: "Property added successfully",
      data: property,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/properties/:id
// @access Private / Admin
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: property,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/properties/:id
// @access Private / Admin
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};