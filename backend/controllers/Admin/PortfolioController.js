import Portfolio from "../../models/Portfolio.js";

export const createPortfolio = async (req, res) => {
  try {
    let info = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category || "notable",
      image: req.file ? req.file.path : null,
    };

    const portfolio = await Portfolio.create(info);
    res
      .status(201)
      .json({ message: "Portfolio item created successfully", portfolio });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    res
      .status(500)
      .json({ message: "Error creating portfolio item: " + error.message });
  }
};

export const getAllPortfolios = async (req, res) => {
  try {
    console.log("Fetching all portfolios sorted by updatedAt DESC...");
    const portfolios = await Portfolio.findAll({
      order: [
        ["updatedAt", "DESC"],
        ["id", "DESC"],
      ],
    });
    console.log(`Successfully fetched ${portfolios.length} portfolios.`);
    res.status(200).json(portfolios);
  } catch (error) {
    console.error("Error fetching portfolios:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch portfolios", error: error.message });
  }
};

export const getPortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    res.status(200).json(portfolio);
  } catch (error) {
    console.error("Error fetching portfolio item:", error);
    res.status(500).json({ message: "Failed to fetch portfolio item" });
  }
};

export const updatePortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    let info = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      info.image = req.file.path;
    }

    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }

    await portfolio.update(info);
    res
      .status(200)
      .json({ message: "Portfolio item updated successfully", portfolio });
  } catch (error) {
    console.error("Error updating portfolio item:", error);
    res
      .status(500)
      .json({ message: "Error updating portfolio item: " + error.message });
  }
};

export const deletePortfolioById = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await Portfolio.findByPk(id);
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio item not found" });
    }
    await portfolio.destroy();
    res.status(200).json({ message: "Portfolio item deleted successfully" });
  } catch (error) {
    console.error("Error deleting portfolio item:", error);
    res.status(500).json({ message: "Failed to delete portfolio item" });
  }
};
