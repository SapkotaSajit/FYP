import GuideSteps from '../../models/GuideSteps.js';

export const createGuideSteps  = async (req, res) => {
  try {
      let info = {
          guideSteps_image: req.file.path || null,
          name: req.body.name,
          guideTypes_id: req.body.guideTypes_id || null,
          description: req.body.description,
      }
    
      const guideSteps = await GuideSteps.create(info);
      res.status(201).json({ message: 'GuideSteps created successfully', guideSteps });

  } catch (error) {
      res.status(500).send('Error creating GuideSteps: ' + error.message);
  }
}
export const getGuideStepsByGuideTypeId = async (req, res) => {
    const { guideTypes_id } = req.params;
    try {
        const guideSteps = await GuideSteps.findAll({ where: { guideTypes_id } });
        res.json(guideSteps);
    } catch (error) {
        console.error('Error fetching guide types by guide_id:', error);
        res.status(500).json({ message: 'Failed to fetch guide types', error: error.message });
    }
};