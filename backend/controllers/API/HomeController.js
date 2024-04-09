import Service from '../../models/Service.js';

// Controller to get services with parent_id as null
export const getServicesWithNullParentId = async (req, res) => {
    try {
        // Fetch services with parent_id as null from the database
        const services = await Service.findAll({
            where: {
                parent_id: null
            }
        });

        // Return the list of services with parent_id as null
        res.json(services);
    } catch (error) {
        // Handle errors
        console.error('Error fetching services with parent_id as null:', error);
        res.status(500).json({ message: 'Failed to fetch services with parent_id as null' });
    }
};

// Controller to get services based on parent_id
export const getServicesByParentId = async (req, res) => {
    const { parentId } = req.params;

    try {
        // Fetch services with the specified parent_id from the database
        const services = await Service.findAll({
            where: {
                parent_id: parentId
            }
        });

        // Return the list of services with the specified parent_id
        res.json(services);
    } catch (error) {
        // Handle errors
        console.error(`Error fetching services with parent_id ${parentId}:`, error);
        res.status(500).json({ message: `Failed to fetch services with parent_id ${parentId}` });
    }
};