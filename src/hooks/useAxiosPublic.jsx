import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://tesseract-server-gold.vercel.app",
});

export default function useAxiosPublic() {
  return axiosPublic;
}
