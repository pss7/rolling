import axios from "axios";
import { BASE_URL } from "../constants/api";

//롤링페이퍼 대상 목록 조회
export async function getList(count?: number | null) {
  try {
    const response = await axios.get(`${BASE_URL}/12-4/recipients/?limit=${count}/`);
    return response.data;
  } catch (error) {
    console.error("롤링페이퍼 대상 목록 불러오기 실패:", error);
    throw error; 
  }
}

//롤링페이퍼 대상 조회
export async function getDetail(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/12-4/recipients/${id}/`);
    return response.data;
  } catch (error) {
    console.error("롤링페이퍼 대상 불러오기 실패:", error);
    throw error; 
  }
}

//롤링페이퍼 대상 메세지 조회
export async function getMessage(id:string){
  try{
    const response = await axios.get(`${BASE_URL}/12-4/recipients/${id}/messages/`)
    return response.data;
  }catch(error){
    console.error("롤링페이퍼 메세지 불러오기 실패:", error);
  }
}

//리액션 조회
export async function getReaction(id:string){
  try{
    const response = await axios.get(`${BASE_URL}/12-4/recipients/${id}/reactions/`)
    return response.data;
  }catch(error){
    console.error("대상에게 단 리액션 불러오기 실패:", error);
  }
}

//리액션 달기
export async function postReaction(
  id: string,
  body: { emoji: string; type: "increase" | "decrease" }
) {
  try {
    const response = await axios.post(`${BASE_URL}/12-4/recipients/${id}/reactions/`, body);
    return response.data;
  } catch (error) {
    console.error("이모지 보내기 실패:", error);
  }
}
