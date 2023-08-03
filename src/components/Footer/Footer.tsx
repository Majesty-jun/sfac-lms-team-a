import Image from "next/image";
import Link from "next/link";

import facebookLogo from "/public/images/facebookLogo.svg";
import instagramLogo from "/public/images/instagramLogo.svg";
import youtubeLogo from "/public/images/youtubeLogo.svg";

export default function Footer() {
  return (
    <footer className="m-auto flex flex-col items-center border-t-2">
      <p className="font-bold">인사이드아웃 사회적 협동조합</p>
      <ul className="mb-16 m-auto flex flex-col items-center">
        <li>고유번호 : 324-82-00580 | 이사장 : 염민호 (와이엠에스닷코)</li>
        <li>통신판매업 신고번호 : 2022-경기김포-3659</li>
        <li>
          주소 : 서울특별시 강서구 마곡중앙2로 11, 3층 305호(마곡동, M밸리 W
          TOWER III)
        </li>
        <li>연락처 : 050-6683-1001</li>
        <li>고객센터 : cs@sniperfactory.com</li>
      </ul>
      <div className="grid grid-cols-3 ml-20">
        <div>
          <Link className="px-1 underline underline-offset-[3px]" href="">
            개인정보 처리방침
          </Link>
          <span className="w-1">|</span>
        </div>
        <div>
          <Link className="px-1 underline underline-offset-[3px]" href="">
            서비스 이용약관
          </Link>
          <span className="w-1">|</span>
        </div>

        <Link
          className="px-1 h-5 -ml-4 underline underline-offset-[3px]"
          href=""
        >
          환불규정
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-8 mt-8">
        <Image className="cursor-pointer" src={facebookLogo} alt="페이스북" />
        <Image className="cursor-pointer" src={instagramLogo} alt="링크드인" />
        <Image className="cursor-pointer" src={youtubeLogo} alt="유튜브" />
      </div>
    </footer>
  );
}
