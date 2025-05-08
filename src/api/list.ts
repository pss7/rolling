import axios from "axios";
import { BASE_URL } from "../constants/api";

export async function getList(count?: number | null) {
  try {
    const response = await axios.get(`${BASE_URL}/12-4/recipients/?limit=${count}`);
    return response.data;
  } catch (error) {
    console.error("롤링페이퍼 목록 불러오기 실패:", error);
    throw error; 
  }
}
