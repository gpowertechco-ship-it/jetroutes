/**
 * Ticket Generation & Download Utility
 * Generates e-tickets in HTML/PDF format for flight bookings
 */

import { BookingConfirmation } from './email-service';

/**
 * Generate HTML ticket content
 */
export const generateTicketHTML = (booking: BookingConfirmation): string => {
  const {
    bookingReference,
    bookingDate,
    passengerInfo,
    flight,
    searchParams,
    totalPrice,
    selectedSeats = [],
    selectedBaggage = "0",
  } = booking;

  const departureTime = flight.departTime.includes('AM') || flight.departTime.includes('PM') 
    ? flight.departTime 
    : new Date(`2024-01-01 ${flight.departTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  const arrivalTime = flight.arriveTime.includes('AM') || flight.arriveTime.includes('PM')
    ? flight.arriveTime
    : new Date(`2024-01-01 ${flight.arriveTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JetRoutes E-Ticket - ${bookingReference}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; padding: 20px; }
        .ticket { max-width: 800px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); overflow: hidden; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center; }
        .header h1 { font-size: 32px; margin-bottom: 10px; }
        .header p { font-size: 14px; opacity: 0.9; }
        .content { padding: 40px; }
        .booking-ref { background: #f0f4ff; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 8px; }
        .booking-ref .label { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
        .booking-ref .value { font-size: 24px; font-weight: bold; color: #667eea; font-family: 'Courier New', monospace; }
        .flight-details { margin-bottom: 30px; }
        .route { display: flex; align-items: center; justify-content: space-between; margin: 20px 0; }
        .airport { text-align: center; }
        .airport .code { font-size: 28px; font-weight: bold; color: #667eea; }
        .airport .city { color: #666; font-size: 14px; margin-top: 5px; }
        .airport .date { color: #999; font-size: 12px; margin-top: 3px; }
        .timeline { flex: 1; display: flex; align-items: center; margin: 0 20px; }
        .timeline-line { flex: 1; height: 2px; background: #ddd; position: relative; }
        .timeline-line::after { content: '✈'; position: absolute; right: -10px; top: -12px; color: #667eea; }
        .flight-info { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
        .info-item .label { color: #999; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
        .info-item .value { font-weight: 600; color: #333; }
        .passenger-section { margin-top: 30px; padding-top: 30px; border-top: 1px solid #eee; }
        .passenger-section h3 { color: #667eea; margin-bottom: 15px; font-size: 16px; }
        .passenger { background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 10px; }
        .passenger-name { font-weight: 600; color: #333; }
        .passenger-details { color: #666; font-size: 13px; margin-top: 5px; }
        .seats { margin-top: 10px; }
        .seat-badge { display: inline-block; background: #667eea; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-right: 8px; }
        .important-notes { background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px; padding: 20px; margin-top: 30px; }
        .important-notes h4 { color: #ff9800; margin-bottom: 10px; }
        .important-notes ul { margin-left: 20px; color: #333; font-size: 13px; }
        .important-notes li { margin-bottom: 8px; }
        .footer { background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px; border-top: 1px solid #eee; }
        .barcode { text-align: center; margin: 20px 0; }
        .barcode-text { font-family: 'Courier New', monospace; font-size: 18px; letter-spacing: 3px; font-weight: bold; color: #333; margin-top: 10px; }
        .benefits { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }
        .benefit { background: #f0f4ff; padding: 15px; border-radius: 8px; font-size: 13px; }
        .benefit strong { color: #667eea; }
        @media print {
            body { background: white; padding: 0; }
            .ticket { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="header">
            <h1>✈ JetRoutes E-Ticket</h1>
            <p>Your digital air ticket</p>
        </div>

        <div class="content">
            <!-- Booking Reference -->
            <div class="booking-ref">
                <div class="label">Booking Reference</div>
                <div class="value">${bookingReference}</div>
            </div>

            <!-- Flight Route -->
            <div class="flight-details">
                <div class="route">
                    <div class="airport">
                        <div class="code">${flight.departure}</div>
                        <div class="city">${searchParams?.from || 'Departure'}</div>
                        <div class="date">${searchParams?.departDate || new Date().toLocaleDateString()}</div>
                    </div>
                    <div class="timeline">
                        <div class="timeline-line"></div>
                    </div>
                    <div class="airport">
                        <div class="code">${flight.arrival}</div>
                        <div class="city">${searchParams?.to || 'Arrival'}</div>
                        <div class="date">${searchParams?.returnDate ? searchParams.returnDate : 'Same day'}</div>
                    </div>
                </div>
            </div>

            <!-- Flight Information -->
            <div class="flight-info">
                <div class="info-row">
                    <div class="info-item">
                        <div class="label">Airline</div>
                        <div class="value">${flight.airlineData?.name || 'JetRoutes Airways'}</div>
                    </div>
                    <div class="info-item">
                        <div class="label">Flight Number</div>
                        <div class="value">${flight.flightNumber || 'JR-0001'}</div>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-item">
                        <div class="label">Departure Time</div>
                        <div class="value">${departureTime}</div>
                    </div>
                    <div class="info-item">
                        <div class="label">Arrival Time</div>
                        <div class="value">${arrivalTime}</div>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-item">
                        <div class="label">Duration</div>
                        <div class="value">${flight.duration}</div>
                    </div>
                    <div class="info-item">
                        <div class="label">Aircraft</div>
                        <div class="value">${flight.aircraft || 'Boeing 737'}</div>
                    </div>
                </div>
            </div>

            <!-- Passenger Information -->
            <div class="passenger-section">
                <h3>Passenger Information</h3>
                <div class="passenger">
                    <div class="passenger-name">${passengerInfo.title} ${passengerInfo.firstName} ${passengerInfo.lastName}</div>
                    <div class="passenger-details">
                        <div>Passport: ${passengerInfo.passportNumber}</div>
                        <div>Nationality: ${passengerInfo.nationality}</div>
                    </div>
                    ${selectedSeats.length > 0 ? `<div class="seats"><span class="seat-badge">Seat: ${selectedSeats.join(', ')}</span></div>` : ''}
                    <div class="seats">
                        <span class="seat-badge">Baggage: ${selectedBaggage} kg</span>
                    </div>
                </div>
            </div>

            <!-- Barcode -->
            <div class="barcode">
                <div style="font-size: 12px; color: #666; margin-bottom: 10px;">Booking Code</div>
                <div class="barcode-text">${bookingReference}</div>
            </div>

            <!-- Benefits -->
            <div class="benefits">
                <div class="benefit">
                    <strong>✓ Confirmation</strong> Check your email for additional details
                </div>
                <div class="benefit">
                    <strong>✓ Mobile Boarding</strong> Show this ticket on your phone
                </div>
            </div>

            <!-- Important Notes -->
            <div class="important-notes">
                <h4>📋 Important Information</h4>
                <ul>
                    <li>Arrive at airport at least 3 hours before international flights, 2 hours for domestic</li>
                    <li>Bring a valid passport and any required travel documents</li>
                    <li>Check baggage allowance before traveling</li>
                    <li>Book seats online or at check-in counter</li>
                    <li>Cancellation is subject to terms and conditions</li>
                </ul>
            </div>
        </div>

        <div class="footer">
            <p><strong>JetRoutes</strong> | Your trusted flight booking partner</p>
            <p>Booking Date: ${bookingDate} | Total Paid: $${totalPrice.toFixed(2)}</p>
            <p>Support: support@jetroutes.com | +1-800-JETROUTES</p>
            <p style="margin-top: 15px; font-size: 11px;">This is an electronic ticket confirmation. No physical ticket is required.</p>
        </div>
    </div>
</body>
</html>
  `;
};

/**
 * Download ticket as HTML file
 */
export const downloadTicketHTML = (booking: BookingConfirmation): void => {
  const htmlContent = generateTicketHTML(booking);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `JetRoutes_Ticket_${booking.bookingReference}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Print ticket directly
 */
export const printTicket = (booking: BookingConfirmation): void => {
  const htmlContent = generateTicketHTML(booking);
  const printWindow = window.open('', '', 'width=900,height=700');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  }
};

/**
 * Open ticket in new tab for viewing
 */
export const viewTicket = (booking: BookingConfirmation): void => {
  const htmlContent = generateTicketHTML(booking);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
};
