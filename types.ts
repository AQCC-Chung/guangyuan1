export enum UserRole {
  MEMBER = '學員',
  INVESTOR = '投資人',
  PROMOTER = '推廣夥伴',
  TEACHER = '講師',
  ADMIN = '管理員',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  streak: number; // 連續學習天數
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  difficulty: '初階' | '中階' | '高階';
  benefit: string;
  category: string;
  progress: number;
}

export interface AssetRecord {
  period: number;
  date: string;
  amount: number;
  status: 'PAID' | 'PENDING';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  tags: string[];
  vendorDirect?: boolean; // 廠商直送
  isPackage?: boolean; // 是否為套裝
}

export interface Order {
  id: string;
  date: string;
  status: '已下單' | '處理中' | '已出貨' | '已完成';
  items: string[];
  total: number;
}
