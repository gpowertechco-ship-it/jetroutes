export interface PassengerInfo {
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportNumber: string;
  passportExpiry: string;
  nationality: string;
  email: string;
  phone: string;
}

export interface FlightInfo {
  id: string;
  airlineData: {
    name: string;
    code: string;
  };
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  price: number;
  [key: string]: any;
}

export interface BookingConfirmation {
  bookingReference: string;
  bookingDate: string;
  passengerInfo: PassengerInfo;
  flight: FlightInfo;
  searchParams: any;
  totalPrice: number;
  selectedSeats?: string[];
  seatUpgradeCost?: number;
  selectedBaggage?: string;
  baggageCost?: number;
  selectedAddons?: string[];
  addonsCost?: number;
  selectedMethod?: string;
  selectedWallet?: string;
}

/**
 * Generate a professional booking confirmation email template
 */
export const generateConfirmationEmail = (booking: BookingConfirmation): string => {
  const {
    bookingReference,
    bookingDate,
    passengerInfo,
    flight,
    searchParams,
    totalPrice,
    selectedSeats,
    seatUpgradeCost = 0,
    selectedBaggage = "0",
    baggageCost = 0,
    selectedAddons = [],
    addonsCost = 0,
    selectedMethod,
    selectedWallet,
  } = booking;

  const flightSubtotal = flight.price * ((searchParams?.adults || 0) + (searchParams?.children || 0));
  const taxesAndFees = totalPrice - flightSubtotal - seatUpgradeCost - baggageCost - addonsCost;

  return `
====================================================================
                    JetRoutes - BOOKING CONFIRMATION
====================================================================

Dear ${passengerInfo.title} ${passengerInfo.firstName} ${passengerInfo.lastName},

Thank you for choosing JetRoutes for your flight booking! Your flight has been 
successfully confirmed. Please save this confirmation for future reference.

====================================================================
BOOKING REFERENCE: ${bookingReference}
Confirmation Date: ${bookingDate}
====================================================================

PASSENGER INFORMATION
--------------------------------------------------------------------
Name:                 ${passengerInfo.title} ${passengerInfo.firstName} ${passengerInfo.lastName}
Email:                ${passengerInfo.email}
Phone:                ${passengerInfo.phone}
Date of Birth:        ${new Date(passengerInfo.dateOfBirth).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}
Nationality:          ${passengerInfo.nationality}
Passport Number:      ${passengerInfo.passportNumber}
Passport Expiry:      ${new Date(passengerInfo.passportExpiry).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}

====================================================================
FLIGHT DETAILS
--------------------------------------------------------------------
Airline:              ${flight.airlineData.name} (${flight.airlineData.code})
Route:                ${searchParams?.from} → ${searchParams?.to}
Departure Date:       ${searchParams?.departDate}
Departure Time:       ${formatTime(flight.departTime)}
Arrival Time:         ${formatTime(flight.arriveTime)}
Flight Duration:      ${flight.duration}
Stops:                ${flight.stops === 0 ? "Nonstop" : `${flight.stops} Stop(s)`}
${selectedSeats && selectedSeats.length > 0 ? `Seat Number:          ${selectedSeats[0]}\n` : ""}
${selectedBaggage !== "0" ? `Baggage:              ${selectedBaggage === "1" ? "1 Checked Bag" : "2 Checked Bags"}\n` : ""}

${searchParams?.tripType === "roundtrip" && flight.returnDepartTime ? `
Return Flight:
- Departure:          ${formatTime(flight.returnDepartTime)}
- Arrival:            ${formatTime(flight.returnArriveTime)}
- Duration:           ${flight.returnDuration}
- Stops:              ${flight.returnStops === 0 ? "Nonstop" : `${flight.returnStops} Stop(s)`}
` : ""}

====================================================================
PRICE BREAKDOWN
--------------------------------------------------------------------
Base Fare (Flight):    $${flightSubtotal.toFixed(2)}
${seatUpgradeCost > 0 ? `Seat Upgrade:         $${seatUpgradeCost.toFixed(2)}\n` : ""}${baggageCost > 0 ? `Baggage:              $${baggageCost.toFixed(2)}\n` : ""}${addonsCost > 0 ? `Add-ons:              $${addonsCost.toFixed(2)}\n` : ""}Taxes & Fees:        $${taxesAndFees.toFixed(2)}
--------------------------------------------------------------------
TOTAL AMOUNT:          $${totalPrice.toFixed(2)}

Payment Method:        ${getPaymentMethodLabel(selectedMethod, selectedWallet)}

====================================================================
IMPORTANT INFORMATION
====================================================================

✓ Check-in opens 24 hours before departure
✓ Please arrive at least 2-3 hours before international flights
✓ Bring your valid passport matching your booking name
✓ Keep your passport valid for at least 6 months beyond travel date
✓ WiFi and power outlets included in your booking

====================================================================
BOOKING CHANGES & CANCELLATIONS
====================================================================

To modify or cancel your booking, visit:
https://www.jetroutes.com/manage-trips

Or contact our customer support:
Email: support@jetroutes.com
Phone: +1-800-JETROUTES (1-800-538-7688)
Hours: 24/7 Customer Support

====================================================================
TERMS & CONDITIONS
====================================================================

By accepting this confirmation, you agree to our Terms of Service
and Conditions of Carriage. For more details, visit:
https://www.jetroutes.com/terms

========================================= - ========================
Need Help?

Support Email: support@jetroutes.com
Live Chat: Available at www.jetroutes.com
Phone: +1-800-JETROUTES (1-800-538-7688)

Thank you for flying with JetRoutes!

====================================================================
`;
};

/**
 * Send confirmation email (logs to console in development)
 */
export const sendConfirmationEmail = (booking: BookingConfirmation): void => {
  const emailContent = generateConfirmationEmail(booking);

  // In development, log to console
  if (import.meta.env.DEV) {
    console.log("📧 CONFIRMATION EMAIL SENT TO:", booking.passengerInfo.email);
    console.log("═".repeat(80));
    console.log(emailContent);
    console.log("═".repeat(80));
  }

  // Store email in localStorage for display purposes
  try {
    const emailHistory = JSON.parse(localStorage.getItem("emailHistory") || "[]");
    emailHistory.push({
      bookingReference: booking.bookingReference,
      emailContent,
      sentAt: new Date().toISOString(),
      recipientEmail: booking.passengerInfo.email,
    });
    localStorage.setItem("emailHistory", JSON.stringify(emailHistory));
  } catch (e) {
    console.error("Failed to store email history", e);
  }

  // In production, send to backend API
  sendEmailViaAPI({
    to: booking.passengerInfo.email,
    subject: `Your JetRoutes Booking Confirmation - ${booking.bookingReference}`,
    content: emailContent,
    bookingReference: booking.bookingReference,
  }).catch((error) => {
    console.error("Failed to send confirmation email:", error);
    // Show error toast or user notification here
  });
};

/**
 * Send email via backend API
 */
const sendEmailViaAPI = async (emailData: {
  to: string;
  subject: string;
  content: string;
  bookingReference: string;
}): Promise<void> => {
  const apiBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  const emailServiceURL = import.meta.env.VITE_EMAIL_SERVICE_URL || `${apiBaseURL}/email`;

  try {
    const response = await fetch(`${emailServiceURL}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: emailData.to,
        subject: emailData.subject,
        htmlContent: emailData.content,
        textContent: emailData.content.replace(/<[^>]*>/g, ""),
        bookingReference: emailData.bookingReference,
      }),
      timeout: 30000,
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.statusText}`);
    }

    console.log("✅ Email sent successfully to:", emailData.to);
  } catch (error) {
    console.error("⚠️ Email delivery failed:", error);
    // Email will still be in localStorage even if API fails
    if (import.meta.env.DEV) {
      console.log("Email stored locally. In production, configure VITE_EMAIL_SERVICE_URL");
    }
  }
};

/**
 * Backend API Expected Response Format:
 * {
 *   success: true,
 *   messageId: "...",
 *   timestamp: "2024-...",
 *   recipient: "user@example.com"
 * }
 *
 * Backend Implementation Guide:
 * - Use SendGrid, Mailgun, AWS SES, or similar
 * - Endpoint: POST /email/send
 * - Required body fields: to, subject, htmlContent, textContent
 * - Optional: bookingReference, attachments
 */

/**
 * Helper function to format time in 12-hour format
 */
const formatTime = (timeString: string): string => {
  if (!timeString) return "";
  if (timeString.includes(" AM") || timeString.includes(" PM")) {
    return timeString;
  }
  const [time] = timeString.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  const hour = parseInt(hourStr);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour.toString().padStart(2, "0")}:${minuteStr} ${ampm}`;
};

/**
 * Helper function to get payment method label
 */
const getPaymentMethodLabel = (method?: string, wallet?: string): string => {
  if (method === "card") return "Credit/Debit Card";
  if (method === "wallet") {
    if (wallet === "apple") return "Apple Pay";
    if (wallet === "paypal") return "PayPal";
    if (wallet === "crypto") return "Cryptocurrency (USDT - TRC20)";
    return "Digital Wallet";
  }
  if (method === "bank") return "Bank Transfer";
  return "Unknown Payment Method";
};
