function stringToBoolean(str: string) {
  if (typeof str !== "string") return false; // safeguard
  switch (str.trim().toLowerCase()) {
    case "true":
    case "1":
    case "yes":
    case "on":
      return true;
    case "false":
    case "0":
    case "no":
    case "off":
      return false;
    default:
      return Boolean(str); // fallback: any non-empty string becomes true
  }
}
export default stringToBoolean;
