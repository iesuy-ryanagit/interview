// src/data/questions.ts

import { collection, getDocs, doc, setDoc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../utils/firebase";

// 型定義
export interface CompanyQuestions {
  [company: string]: string[];
}

// Firestore から取得する関数
export const getQuestionsFromFirestore = async (): Promise<CompanyQuestions> => {
  const snapshot = await getDocs(collection(db, "questions"));
  const result: CompanyQuestions = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    const arr: string[] = Object.values(data); // 0,1,2,... の値を配列に
    result[doc.id] = arr;
  });

  return result;
};

// 企業を追加する関数
export const addCompany = async (companyName: string): Promise<void> => {
  const docRef = doc(db, "questions", companyName);
  await setDoc(docRef, {}, { merge: true });
};

// 質問を追加する関数
export const addQuestion = async (companyName: string, question: string): Promise<void> => {
  const questions = await getQuestionsFromFirestore();
  const companyQuestions = questions[companyName] || [];
  const nextIndex = companyQuestions.length;
  
  const docRef = doc(db, "questions", companyName);
  await updateDoc(docRef, {
    [nextIndex]: question
  });
};

// 質問を削除する関数
export const deleteQuestion = async (companyName: string, questionIndex: number): Promise<void> => {
  const docRef = doc(db, "questions", companyName);
  await updateDoc(docRef, {
    [questionIndex]: deleteField()
  });
};

// 企業を削除する関数
export const deleteCompany = async (companyName: string): Promise<void> => {
  const docRef = doc(db, "questions", companyName);
  await setDoc(docRef, {});
};

