'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useSignStore from '@/stores/signStore';
import useUserStore from '@/stores/userStore';

import Logo from '../Logo';
import HeaderLink from './HeaderLink';
import { useEffect, useState } from 'react';
import useHistoryStore from '@/stores/historyStore';

export default function Header() {
  const router = useRouter();
  const setBoards = useHistoryStore((state) => state.setBoards);
  const { getSigninForm, getSignupForm } = useSignStore();
  const { isLogin, isGoogleLogin, profileImageUrl, setClear } = useUserStore();
  const isClient = useClient();

  const logout = () => {
    sessionStorage.clear();
    setClear();
    setBoards({ boardWritten: [], boardLiked: [], commentWritten: [] });

    getSigninForm(false);
    getSignupForm(false);

    router.push('/');
  };

  const profileImage = () => {
    if (!profileImageUrl) return '/assets/img/bg_default_profile.png';

    if (isLogin || isGoogleLogin) {
      return profileImageUrl as string;
    }

    return '/assets/img/profile_avocado.png';
  };

  // 1. 문제인식을 나는 어떻게 했는가? 2.문제를 해결하기 위한 삽질과정 3.결과 4. 느낀점

  return (
    <header
      className="
        flex
        justify-between
        items-center
        bg-[url('/assets/img/bg_wood_yellow.png')] 
        bg-contain
        h-[64px] 
        border-b-[8px] 
        border-border-10
        shadow-outer/down 
        px-[15px]
        ">
      <Logo size="small" />
      <ul className="flex gap-[10px]">
        <li>
          <HeaderLink location="/garden/1" content="activity" title="garden" />
        </li>
        <li>
          <HeaderLink location="/board" content="activity" title="community" />
        </li>
        <li>
          <HeaderLink location="/leafs/1" content="activity" title="leafCard" />
        </li>
        {isClient && (isLogin || isGoogleLogin) ? ( // 서버에 있을때 다르게 동작
          <li>
            <Image
              src={profileImage()}
              alt="profile_img"
              className={`rounded-[50%] border-brown-50 border-[3px] w-11 h-11 cursor-pointer `}
              onClick={logout}
              width={44}
              height={44}
            />
            {/* <img
              src={profileImage()}
              alt="profile_img"
              className="w-11 h-11 rounded-[50%] border-brown-50 border-[3px] cursor-pointer"
              onClick={logout}
            /> */}
          </li>
        ) : (
          <li>
            <HeaderLink location="/signin" content="auth" title="signin" />
          </li>
        )}
      </ul>
    </header>
  );
}

const useClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};
