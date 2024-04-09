import Service from '../../models/Service.js';

export const createService  = async (req, res) => {
  try {
      let info = {
          service_image: req.file.path || null,
          name: req.body.name,
          parent_id: req.body.parent_id || null,
          description: req.body.description,
      }
    
      const service = await Service.create(info);
      res.status(201).json({ message: 'Service created successfully', service });

  } catch (error) {
      res.status(500).send('Error creating service: ' + error.message);
  }
}

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    const servicesWithImage = await Promise.all(services.map(async service => {
      const parentService = await Service.findByPk(service.parent_id);
      return {
        id: service.id,
        name: service.name,
        description: service.description,
        service_image: service.service_image,
        parent_id: service.parent_id,
        parent_name: parentService ? parentService.name : null
      };
    }));
    res.json(servicesWithImage);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

export const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
};

export const updateServiceById = async (req, res) => {
  const { id } = req.params;

  try {
      let info = {
        name: req.body.name,
        parent_id: req.body.parent_id || null,
        description: req.body.description,
      };

      if (req.file) {
          info.service_image = req.file.path;
      }

      const service = await Service.findByPk(id);

      if (!service) {
          return res.status(404).json({ message: 'Service not found' });
      }

      await service.update(info);

      res.json({ message: 'Service updated successfully', service });
  } catch (error) {
      res.status(500).send('Error updating service: ' + error.message);
  }
};

export const deleteServiceById = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.destroy();

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Failed to delete service' });
  }
};
