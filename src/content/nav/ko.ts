/**
 * Navigation labels for the Korean locale.
 * This file defines all the labels used in the sidebar navigation.
 */

const nav = {
  home: "홈",

  journal: "연습 일지",
  "journal.current": "현재 연습 중",
  "journal.logs": "일지",

  guides: "골프 가이드",
  "guides.fundamentals": "기초",
  "guides.technique": "세부사항",
  "guides.technique.driving": "드라이버",
  "guides.technique.iron": "아이언",
  "guides.technique.approach": "어프로치",
  "guides.technique.putting": "퍼팅",

  reference: "추천 참고자료",

  qna: "Q&A",
} as const;

export default nav;
export type NavKey = keyof typeof nav;
