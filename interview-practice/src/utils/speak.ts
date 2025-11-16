// src/utils/speak.ts
export const speak = (text: string) => {
  if ("speechSynthesis" in window) {
    // 読み上げ中のキャンセル
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP"; // 日本語
    utterance.rate = 1;       // 速度
    utterance.pitch = 1;      // 高さ
    window.speechSynthesis.speak(utterance);
  }
};
