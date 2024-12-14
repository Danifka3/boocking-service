const Booking = require('../models/booking');
const Location = require('../models/location');

exports.getAvailableSlots = async (req, res) => {
    try {
        const { date, location_id } = req.query;

        // Проверяем, указаны ли дата и ID локации
        if (!date || !location_id) {
            return res.status(400).json({ message: 'Date and location_id are required' });
        }

        // Получаем информацию о локации
        const location = await Location.findById(location_id);
        if (!location) {
            return res.status(404).json({ message: 'Location not found' });
        }

        // Дефолтные временные слоты с разницей в 1 час
        const timeSlots = [
            '09:00', '10:00', '11:00', '12:00', '13:00',
            '14:00', '15:00', '16:00', '17:00', '18:00',
        ];

        // Получаем бронирования для данной локации и даты
        const bookings = await Booking.find({
            location_id,
            date,
            status: 'confirmed',
        });

        // Словарь для подсчета занятых мест на каждый временной слот
        const slotOccupancy = {};

        // Инициализируем занятость для всех временных слотов
        timeSlots.forEach(slot => {
            slotOccupancy[slot] = 0;
        });

        // Обрабатываем бронирования
        bookings.forEach(booking => {
            const bookingTime = booking.time;
            const bookingEnd = getTimePlusTwoHours(bookingTime);

            timeSlots.forEach(slot => {
                if (isTimeWithinRange(slot, bookingTime, bookingEnd)) {
                    slotOccupancy[slot] += 1;
                }
            });
        });

        // Формируем список доступных временных слотов
        const availableSlots = timeSlots.filter(slot => slotOccupancy[slot] < location.capacity);

        res.json({ date, location_id, availableSlots });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching available slots', error });
    }
};

// Вспомогательная функция: добавляет 2 часа к времени
function getTimePlusTwoHours(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours + 2, minutes, 0);
    return date.toTimeString().slice(0, 5);
}

// Вспомогательная функция: проверяет, входит ли время в диапазон
function isTimeWithinRange(slot, startTime, endTime) {
    const [slotHours, slotMinutes] = slot.split(':').map(Number);
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const slotTime = slotHours * 60 + slotMinutes;
    const startTimeMinutes = startHours * 60 + startMinutes;
    const endTimeMinutes = endHours * 60 + endMinutes;

    return slotTime >= startTimeMinutes && slotTime < endTimeMinutes;
}
