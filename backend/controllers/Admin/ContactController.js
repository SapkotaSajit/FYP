import Contact from '../../models/Contact.js';

export const createContact = async (req, res) => {
  console.log("show me error")
  const { name, email, phone, description } = req.body;
  try {
    const newContact = await Contact.create({
      name,
      email,
      phone,
      description
    });
    res.status(201).json({ message: 'Contact created successfully', contact: newContact });
  } catch (error) {
    console.error('Failed to create contact:', error);
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

export const AllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      attributes: ['id', 'name', 'email', 'phone', 'description'],
    });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ contact });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Failed to fetch contact' });
  }
};


export const deleteContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByPk(id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    await contact.destroy();
    return res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Failed to delete contact:', error);
    return res.status(500).json({ message: 'Failed to delete contact' });
  }
};
