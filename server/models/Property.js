import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    area: {
      type: String,
      required: [true, "Area is required"],
    },
    type: {
      type: String,
      enum: ["Agricultural Land", "Residential", "Commercial"],
      required: [true, "Type is required"],
    },
    description: {
      type: String,
      default: "",
    },
    // Primary image (backward compat)
    image: {
      type: String,
      default: "",
    },
    // Additional images
    images: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Under Negotiation"],
      default: "Available",
    },
    whatsappNumber: {
      type: String,
      default: "916299952667",
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;