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
  email: string;
  phoneNumber?: string;
  role: UserRole;
  level: string;
  points: number;
  referrerId?: string;
  avatar: string;
  streak: number;
  bio?: string;
}

export interface Chapter {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  difficulty: '初階' | '中階' | '高階';
  benefit: string;
  category: string;
  description?: string;
  chapters?: Chapter[];
  progress?: number;
  status: 'published' | 'draft';
  instructorId: string;
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
  vendorDirect?: boolean;
  isPackage?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: '已下單' | '處理中' | '已出貨' | '已完成';
  items: string[];
  total: number;
}