export interface SlotData {
  id: string;
  tutorProfileId: string;
  title: string | null;
  subject: string | null;
  details: string | null;
  location: string | null;
  slot: string; // ISO String from backend
  timeDuration: string | null; // stored as minutes string, e.g., "120"
  pricePerHour: number | null;
  status: string;
  isBooked: boolean;
  paymentMethod: string; // "cash" | "stripe" | "both"
}
