import history from "../../../history";

export const shouldNavigateAwayIfBookingIsPaid = (bookingId, isPaid) => {
    console.log("shouldNavigateAwayIfBookingIsPaid");
    if (isPaid) {
        return history.push("/bookings/" + bookingId);
    }
    return;
};