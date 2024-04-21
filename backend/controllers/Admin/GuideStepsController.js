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
    const { guideTypes_id } = req.params;
    try {
        const guideSteps = await GuideSteps.findAll({ where: { guideTypes_id } });
        res.json(guideSteps);
    } catch (error) {
        console.error('Error fetching guide types by guide_id:', error);
        res.status(500).json({ message: 'Failed to fetch guide types', error: error.message });
    }
};




  // export const deleteGuideStepById = async (req, res) => {
  //   const { id } = req.params;
  
  //   try {
  //     const guideStep = await GuideSteps.findByPk(id);
  //     if (!guideStep) {
  //       return res.status(404).json({ message: 'Guide step not found' });
  //     }
  
  //     await guideStep.destroy();
  //     console.log(`Guide step with ID ${id} deleted successfully`);
  //     return res.json({ message: 'Guide step deleted successfully' });
  //   } catch (error) {
  //     console.error('Failed to delete guide step:', error);
  //     return res.status(500).json({ message: 'Failed to delete guide step' });
  //   }
  // };
  
  export const deleteGuideStepById = async (req, res) =>{
    try{
      const {id} = req.params;
      await GuideSteps.destroy({where:{id}});
      res.status(200).json({message: 'Guide steps deleted successfully'})
    } catch(error){
      res.status(500).json({message:'Failed to delete Guide Steps'})
    }
  };