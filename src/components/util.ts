export default class Util {
  static baseURL = () => {
    if (process.env.ENV === "DEV") {
      return "http://localhost:4002";
    } else {
      return "https://goserver-production-47ea.up.railway.app/";
    }
  };
}
