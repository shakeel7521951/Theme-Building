import Stock from "../models/stockModel.js";

export const addStock = async (req, res) => {
  const userId = req.id;
  const { title, stockDescription } = req.body;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Stock image is required." });
    }

    const newStock = await Stock.create({
      title,
      stockImageUrl: `/uploads/${req.file.filename}`,
      stockDescription,
      author: userId,
    });

    return res.status(201).json({ success: true, stock: newStock });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add stock." });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find()
      .populate("author", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, stocks });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch stocks." });
  }
};

export const getStockById = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findById(id).populate("author", "fullName email");

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    return res.status(200).json({ success: true, stock });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch stock details." });
  }
};

export const updateStock = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;
  const { title, stockDescription } = req.body;

  try {
    const stock = await Stock.findById(id);

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    if (stock.author == userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this stock.",
      });
    }

    if (title) stock.title = title;
    if (stockDescription) stock.stockDescription = stockDescription;
    if (req.file) {
      stock.stockImageUrl = `/uploads/${req.file.filename}`;
    }

    await stock.save();

    return res
      .status(200)
      .json({ success: true, message: "Stock updated successfully.", stock });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update stock." });
  }
};

export const deleteStock = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  try {
    const stock = await Stock.findById(id);

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    if (stock.author !== userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this stock.",
      });
    }

    await Stock.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Stock deleted successfully." });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete stock." });
  }
};
