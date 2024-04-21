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


export const allSteps = async (req, res) => {
    try {
      const guideSteps = await GuideSteps.findAll();
      res.json(guideSteps);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      res.status(500).json({ message: 'Failed to fetch contacts' });
    }
  };
export const getGuideStepsByGuideTypeId = async (req, res) => {
  const { id } = req.params;
  try {
    const guideSteps = await GuideSteps.findByPk(id);
    if (!guideSteps) {
      return res.status(404).json({ message: 'Guide steps not found' });
    }
    res.json(guideSteps);
  } catch (error) {
    console.error('Error fetching guide steps:', error.message);
    res.status(500).json({ message: 'Failed to fetch guide steps', error: error.message });
  }
};


export const updateGuideStepsById = async (req, res) => {
  const { id } = req.params;
  try {
    const guideSteps = await GuideSteps.findByPk(id);
    if (!guideSteps) {
      return res.status(404).json({ message: 'Guide steps not found' });
    }

    // Update guide steps fields
    guideSteps.name = req.body.name || guideSteps.name;
    guideSteps.description = req.body.description || guideSteps.description;
    guideSteps.guide_id = req.body.guide_id || guideSteps.guide_id;

    if (req.file) {
      guideSteps.guideSteps_image = req.file.path;
    }

    await guideSteps.save();
    res.json({ message: 'Guide steps updated successfully', guideSteps });
  } catch (error) {
    console.error('Error updating guide steps:', error.message);
    res.status(500).json({ message: 'Failed to update guide steps', error: error.message });
  }
};




  
  export const deleteGuideStepById = async (req, res) =>{
    try{
      const {id} = req.params;
      await GuideSteps.destroy({where:{id}});
      res.status(200).json({message: 'Guide steps deleted successfully'})
    } catch(error){
      res.status(500).json({message:'Failed to delete Guide Steps'})
    }
  };




