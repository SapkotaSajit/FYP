import PageSetting from "../../models/PageSetting.js";

export const getAllPageSettings = async (req, res) => {
  try {
    const settings = await PageSetting.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error fetching page settings:", error);
    res.status(500).json({ message: "Failed to fetch page settings" });
  }
};

export const updatePageSetting = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;
  try {
    const setting = await PageSetting.findByPk(id);
    if (!setting) {
      return res.status(404).json({ message: "Page setting not found" });
    }
    await setting.update({ is_active });
    res
      .status(200)
      .json({ message: "Page visibility updated successfully", setting });
  } catch (error) {
    console.error("Error updating page setting:", error);
    res.status(500).json({ message: "Failed to update page setting" });
  }
};
