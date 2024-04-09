import Guide from '../../models/Guide.js';

export const createguide = async (req, res) => {
  try {
    let info = {
      image_url: req.file ? req.file.path : null,
      name: req.body.name,
      description: req.body.description,
    };

    const guide = await Guide.create(info);
    res.status(201).json({ message: 'Guide created successfully', guide });
  } catch (error) {
    console.error('Error creating guide:', error);
    res.status(500).json({ message: 'Failed to create guide', error: error.message });
  }
};

export const getAllguides = async (req, res) => {
  try {
    const Guides = await Guide.findAll();
    const GuidesWithImage = await Promise.all(Guides.map(async Guide => {
      return {
        id: Guide.id,
        name: Guide.name,
        description: Guide.description,
        image_url: Guide.image_url,
      };
    }));
    res.json(GuidesWithImage);
  } catch (error) {
    console.error('Error fetching Guides:', error);
    res.status(500).json({ message: 'Failed to fetch Guides' });
  }
};

export const getguideById = async (req, res) => {
  const { id } = req.params;
  try {
    const guide = await Guide.findByPk(id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.json(guide);
  } catch (error) {
    console.error('Error fetching guide:', error);
    res.status(500).json({ message: 'Failed to fetch guide', error: error.message });
  }
};

export const updateguideById = async (req, res) => {
  const { id } = req.params;
  try {
    let info = {
      name: req.body.name,
      description: req.body.description,
    };

    if (req.file) {
      info.image_url = req.file.path;
    }

    const guide = await Guide.findByPk(id);

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    await guide.update(info);

    res.json({ message: 'Guide updated successfully', guide });
  } catch (error) {
    console.error('Error updating guide:', error);
    res.status(500).json({ message: 'Failed to update guide', error: error.message });
  }
};

export const deleteguideById = async (req, res) => {
  const { id } = req.params;
  try {
    const guide = await Guide.findByPk(id);

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    await guide.destroy();

    res.json({ message: 'Guide deleted successfully' });
  } catch (error) {
    console.error('Error deleting guide:', error);
    res.status(500).json({ message: 'Failed to delete guide', error: error.message });
  }
};
