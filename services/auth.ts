import { User, UserRole } from '../types';

// 更新為您的正式部署網址 (已自動將 /dev 修正為 /exec 以確保公開存取權限)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznsZNrdEz8CJfB1GI02VgEnmRwjJpzCbW9_MtCaeKn/exec'; 

const DB_KEY_CURRENT_USER = 'GY_CURRENT_USER';

// 預設 Demo 帳號資料 (僅在 API 連線失敗時作為備援)
const DEMO_USERS: Record<string, User> = {
  'admin@test.com': { id: 'user-admin', name: '系統管理員', email: 'admin@test.com', role: UserRole.ADMIN, level: '系統管理', points: 9999, avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff', streak: 999, phoneNumber: '0900000000' },
  'member@test.com': { id: 'user-member', name: '王小美', email: 'member@test.com', role: UserRole.MEMBER, level: 'L1', points: 100, avatar: 'https://ui-avatars.com/api/?name=Mei&background=random', streak: 12, phoneNumber: '0911111111' },
  'investor@test.com': { id: 'user-investor', name: '陳大戶', email: 'investor@test.com', role: UserRole.INVESTOR, level: '天使投資人', points: 500, avatar: 'https://ui-avatars.com/api/?name=Chen&background=amber', streak: 5, phoneNumber: '0922222222' },
  'promoter@test.com': { id: 'user-promoter', name: '張推廣', email: 'promoter@test.com', role: UserRole.PROMOTER, level: '推廣實習生', points: 200, avatar: 'https://ui-avatars.com/api/?name=Zhang&background=emerald', streak: 30, phoneNumber: '0933333333' },
  'teacher@test.com': { id: 'user-teacher', name: '廣圓老師', email: 'teacher@test.com', role: UserRole.TEACHER, level: '特約講師', points: 300, avatar: 'https://ui-avatars.com/api/?name=Teacher&background=indigo', streak: 15, phoneNumber: '0944444444' }
};

// Helper function for safe GAS fetching
const safeFetch = async (payload: any) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'cors', // Explicitly use CORS
      credentials: 'omit', // Explicitly omit credentials for public script
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
        // GAS often returns 401 if permissions are wrong
        throw new Error(`HTTP Error: ${response.status} (請檢查 Google Script 權限設定)`);
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error('GAS Parse Error:', text.substring(0, 100)); // Log first 100 chars
      throw new Error('伺服器回應格式錯誤 (可能為維護中)');
    }
  } catch (error: any) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('請求逾時，請檢查網路連線');
    }
    // Catch common CORS/Network errors
    if (error.message === 'Failed to fetch' || error.message === 'Load failed') {
        throw new Error('無法連接伺服器。請確認：\n1. Google Script 已部署為 "Anyone"\n2. 網址正確\n3. 網路連線正常');
    }
    throw error;
  }
};

export const AuthService = {
  getCurrentUser: (): User | null => {
    const json = localStorage.getItem(DB_KEY_CURRENT_USER);
    return json ? JSON.parse(json) : null;
  },

  logout: () => {
    localStorage.removeItem(DB_KEY_CURRENT_USER);
  },

  login: async (email: string, password: string): Promise<User> => {
    // 優先檢查是否為快速開發用的 Demo 帳號
    if (DEMO_USERS[email] && password === '123456') {
      const user = DEMO_USERS[email];
      localStorage.setItem(DB_KEY_CURRENT_USER, JSON.stringify(user));
      return user;
    }

    try {
      const result = await safeFetch({ action: 'login', email, password });
      
      if (result.success) {
        localStorage.setItem(DB_KEY_CURRENT_USER, JSON.stringify(result.user));
        return result.user;
      } else {
        throw new Error(result.message || '帳號或密碼錯誤');
      }
    } catch (error: any) {
      console.error('API Login failed:', error);
      throw new Error(error.message || '登入失敗');
    }
  },

  register: async (name: string, email: string, password: string, role: UserRole, phoneNumber: string): Promise<User> => {
    let initialLevel = 'L1';
    if (role === UserRole.INVESTOR) initialLevel = '天使投資人';
    if (role === UserRole.PROMOTER) initialLevel = '推廣實習生';
    if (role === UserRole.TEACHER) initialLevel = '特約講師';

    const newUserBase = {
      id: `user-${Date.now()}`,
      name,
      email,
      phoneNumber,
      role,
      level: initialLevel,
      points: 100,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      streak: 0,
    };

    try {
      const result = await safeFetch({
        action: 'register',
        user: { ...newUserBase, password }
      });

      if (result.success) {
        localStorage.setItem(DB_KEY_CURRENT_USER, JSON.stringify(result.user));
        return result.user;
      } else {
        throw new Error(result.message || '註冊失敗');
      }
    } catch (error: any) {
      console.error('Register error:', error);
      throw new Error(error.message || '無法連接伺服器，請檢查網路連線或稍後再試');
    }
  }
};