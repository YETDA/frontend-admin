import { create } from 'zustand';

interface CommonUserInfo {
  userId: string;
  isAuthenticated: boolean;
}

export interface UserInfo {
  email: string;
  name: string;
  image: string;
  portfolioAddress?: string;
  introduce?: string;
}

type User = CommonUserInfo & UserInfo;

const defaultUser: User = {
  userId: '',
  isAuthenticated: false,
  email: '',
  name: '',
  image: '',
  portfolioAddress: '',
  introduce: '',
};

type UserStore = {
  user: User;
  setUser: (data: Partial<User>) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
};

// persist 제거하고 세션 상태로만 관리
export const useUserStore = create<UserStore>()((set, get) => ({
  user: defaultUser,
  setUser: data =>
    set(state => ({
      user: { ...state.user, ...data },
    })),
  clearUser: () => set({ user: defaultUser }),
  isAuthenticated: () => Boolean(get().user.isAuthenticated),
}));
