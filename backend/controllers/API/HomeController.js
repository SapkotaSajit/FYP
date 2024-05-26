import Service from "../../models/Service.js";

export const getServicesWithNullParentId = async (req, res) => {
  try {
    const services = await Service.findAll({
      where: {
        parent_id: null,
      },
    });

    res.json(services);
  } catch (error) {
    console.error("Error fetching services with parent_id as null:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch services with parent_id as null" });
  }
};

export const getServicesByParentId = async (req, res) => {
  const { parentId } = req.params;

  try {
    const services = await Service.findAll({
      where: {
        parent_id: parentId,
      },
    });

    res.json(services);
  } catch (error) {
    console.error(`Error fetching services with parent_id ${parentId}:`, error);
    res
      .status(500)
      .json({ message: `Failed to fetch services with parent_id ${parentId}` });
  }
};
