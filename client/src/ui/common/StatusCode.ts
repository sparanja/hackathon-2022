export enum StatusCode {
 PENDING = "PENDING",
 APPROVED = "APPROVED",
 REJECTED = "REJECTED",
}
export default StatusCode;

export const getStatusColor = (status: StatusCode): string => {
 if (status == StatusCode.APPROVED) {
  return "green";
 }
 if (status == StatusCode.REJECTED) {
  return "red";
 }
 return "yellow.300";
};
