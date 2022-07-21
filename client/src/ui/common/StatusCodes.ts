export enum StatusCodes {
 PENDING = "PENDING",
 APPROVED = "APPROVED",
 REJECTED = "REJECTED",
}
export default StatusCodes;

export const getStatusColor = (): string => {
 if ((status = StatusCodes.APPROVED)) {
  return "green";
 }
 if ((status = StatusCodes.REJECTED)) {
  return "red";
 }
 return "yellow";
};
