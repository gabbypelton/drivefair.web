export const dispositionPipeline = {
  NEW: 0,
  PAID: 1,
  ACCEPTED_BY_VENDOR: 2,
  WAITING_FOR_DRIVER: 3,
  ACCEPTED_BY_DRIVER: 4,
  READY: 5,
  EN_ROUTE: 6,
  DELIVERED: 7,
  CANCELED: 7,
};

export const dispositionVerbiage = {
  NEW: "NEW",
  PAID: "Paid",
  ACCEPTED_BY_VENDOR: "Accepted by vendor",
  WAITING_FOR_DRIVER: "Requesting driver",
  ACCEPTED_BY_DRIVER: "Accepted by driver",
  READY: "Ready for pickup!",
  EN_ROUTE: "On the way!",
  DELIVERED: "Delivered!",
  CANCELED: "Canceled",
};
