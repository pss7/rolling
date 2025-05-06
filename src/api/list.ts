import axios from "axios";
import { BASE_URL } from "../constants/api";

export async function getList() {
  try {
    const response = await axios.get(`${BASE_URL}/12-4/recipients/`);
    return response.data;
  } catch (error) {
    console.error("롤링페이퍼 목록 불러오기 실패:", error);
    throw error; 
  }
}
