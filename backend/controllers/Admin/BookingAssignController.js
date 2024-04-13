

import Booking from '../../models/Booking.js';
import BookingAssign from '../../models/BookingAssign.js';
import Service from '../../models/Service.js';
import Users from '../../models/User.js';

export const createBookingAssign = async (req, res) => {
  const { userId } = req.body;
  const { bookingId } = req.params;

  try {
      const bookingAssign = await BookingAssign.create({
          user_id: userId,
          status: 'Pending',
          booking_id: bookingId
      });
      await Booking.update({ status: '1' }, {
          where: { id: bookingId }
      });

      res.status(201).json({ message: 'Booking assignment created successfully', bookingAssign });
  } catch (error) {
      res.status(500).json({ message: 'Error creating booking assignment', error: error.message });
  }
};

export const getAllBookingAssignments = async (req, res) => {
  try {
    const bookingAssignments = await BookingAssign.findAll();
    
    res.status(200).json(bookingAssignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking assignments', error: error.message });
  }
};
export const getAllUserBookingAssignments = async (req, res) => {
  try {
    const userId = BigInt(req.params.userId);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const userPendingBookings = await BookingAssign.findAll({
      where: { 
        user_id: userId,
        status: 'Pending' 
      },
      include: [
        {
          model: Booking,
          attributes: ['id', 'user_id', 'booking_time', 'booking_date', 'service_id'],
          include: [
            {
              model: Users,
              attributes: ['id', 'name','phone'],
            },
            {
              model: Service,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(userPendingBookings);
  } catch (error) {
    console.error('Error fetching user pending bookings:', error);
    res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
  }
};

export const getAllUserBookingCompleteAssignments = async (req, res) => {
  try {
    const userId = BigInt(req.params.userId);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const userPendingBookings = await BookingAssign.findAll({
      where: { 
        user_id: userId,
        status: 'Completed' 
      },
      include: [
        {
  model: Users,
  attributes: ['id', 'name' ,'phone'],
},
        {
          model: Booking,
          attributes: ['id', 'user_id', 'booking_time', 'booking_date', 'service_id'],
          include: [
            {
              model: Users,
              attributes: ['id', 'name' ,'phone'],
            },
            {
              model: Service,
              attributes: ['id', 'name'],
            },
          ],
        }
      ],
    });

    res.status(200).json(userPendingBookings);
  } catch (error) {
    console.error('Error fetching user pending bookings:', error);
    res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
  }
};

export const getAllUserBookingAcceptAssignments = async (req, res) => {
  try {
    const userId = BigInt(req.params.userId);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const userPendingBookings = await BookingAssign.findAll({
      where: { 
        user_id: userId,
        status: 'Accept' 
      },
      include: [
        {
          model: Booking,
          attributes: ['id', 'user_id', 'booking_time', 'booking_date', 'service_id'],
          include: [
            {
              model: Users,
              attributes: ['id', 'name' ,'phone'],
            },
            {
              model: Service,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(userPendingBookings);
  } catch (error) {
    console.error('Error fetching user pending bookings:', error);
    res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
  }
};

export const getAllUserBookingRejectAssignments = async (req, res) => {
  try {
    const userId = BigInt(req.params.userId);

    if (!userId) {
      return res.status(401).json({ message: 'User ID not found in request' });
    }

    const userPendingBookings = await BookingAssign.findAll({
      where: { 
        user_id: userId,
        status: 'Reject' 
      },
      include: [
        {
  model: Users,
  attributes: ['id', 'name' ,'phone'],
},
        {
          model: Booking,
          attributes: ['id', 'user_id', 'booking_time', 'booking_date', 'service_id'],
          include: [
            {
              model: Users,
              attributes: ['id', 'name' ,'phone'],
            },
            {
              model: Service,
              attributes: ['id', 'name'],
            },
          ],
        },
      ],
    });

    res.status(200).json(userPendingBookings);
  } catch (error) {
    console.error('Error fetching user pending bookings:', error);
    res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
  }
};



export const getBookingAssignById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      res.status(404).json({ message: 'Booking assignment not found' });
      return;
    }
    res.status(200).json(bookingAssign);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking assignment', error: error.message });
  }
};

export const updateBookingAssignStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      return res.status(404).json({ message: 'Booking assignment not found' });
    }

    bookingAssign.status = status;
    await bookingAssign.save();

    return res.status(200).json({ message: 'Booking assignment status updated successfully', bookingAssign });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating booking assignment status', error: error.message });
  }
};

export const updateBookingAssignById = async (req, res) => {
  const { id } = req.params;
  const { user_id, status, booking_id } = req.body;
  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      res.status(404).json({ message: 'Booking assignment not found' });
      return;
    }
    await bookingAssign.update({ user_id, status, booking_id });
    res.status(200).json({ message: 'Booking assignment updated successfully', bookingAssign });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking assignment', error: error.message });
  }
};

export const deleteBookingAssignById = async (req, res) => {
  const { id } = req.params;
  try {
    const bookingAssign = await BookingAssign.findByPk(id);
    if (!bookingAssign) {
      res.status(404).json({ message: 'Booking assignment not found' });
      return;
    }
    await bookingAssign.destroy();
    res.status(200).json({ message: 'Booking assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking assignment', error: error.message });
  }
};
