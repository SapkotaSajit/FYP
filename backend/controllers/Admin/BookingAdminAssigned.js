import Booking from '../../models/Booking.js';
import BookingAssign from '../../models/BookingAssign.js';
import Service from '../../models/Service.js';
import Users from '../../models/User.js';

export const getAllPendingBooking = async (req, res) => {
    try {

      
      const userPendingBookings = await BookingAssign.findAll({
      
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

        where: {
          status: 'Pending'
        }
      });
  
      res.status(200).json(userPendingBookings);
    } catch (error) {
      console.error('Error fetching user pending bookings:', error);
      res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
    }
  };

  export const getAllCompletedBooking = async (req, res) => {
    try {

      
      const userPendingBookings = await BookingAssign.findAll({
      
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

        where: {
          status: 'Completed'
        }
      });
  
      res.status(200).json(userPendingBookings);
    } catch (error) {
      console.error('Error fetching user pending bookings:', error);
      res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
    }
  };
  
  export const getAllAcceptBooking = async (req, res) => {
    try {

      
      const userPendingBookings = await BookingAssign.findAll({
      
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

        where: {
          status: 'Accept'
        }
      });
  
      res.status(200).json(userPendingBookings);
    } catch (error) {
      console.error('Error fetching user pending bookings:', error);
      res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
    }
  };
  
  export const getAllRejectBooking = async (req, res) => {
    try {

      
      const userPendingBookings = await BookingAssign.findAll({
      
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

        where: {
          status: 'Reject'
        }
      });
  
      res.status(200).json(userPendingBookings);
    } catch (error) {
      console.error('Error fetching user pending bookings:', error);
      res.status(500).json({ message: 'Error fetching user pending bookings', error: error.message });
    }
  };