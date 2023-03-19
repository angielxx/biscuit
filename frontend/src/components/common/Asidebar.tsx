import { useState } from "react";
import BigCategory from "./BigCategory";
import AsideButton from "./AsideButton";

// css
import tw, { styled } from "twin.macro";

// icons
import close from '../../assets/icons/close.svg';
// icons
import setting from '../../assets/icons/setting.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import history from '../../assets/icons/history.svg';

const Aside = styled.div`
  ${tw`flex flex-col items-start p-2 fixed w-[314px] right-[-55%] top-0 bg-[#1A1B1E]`}

  &.open {
    ${tw`right-0`}
  }
`

const Closeicon = styled.div`
  ${tw`flex justify-end items-start p-[10px] gap-[10px] self-stretch`}
`

const ProfileBox = styled.div`
  ${tw`flex flex-col justify-end items-start p-[16px] gap-[19px] self-stretch`}
`

const Nickname = styled.div`
  ${tw`w-[136px] h-[34px] text-primary text-h2`}
`

const AsideBtn = styled.div`
  ${tw`flex justify-between items-start self-stretch px-1 py-0 gap-[10px]`}
`

interface AsidebarStatus {
  isOpen: boolean;
  setIsOpen: any;
}

const Asidebar = ({ isOpen, setIsOpen }: AsidebarStatus) => {
  // const [name, setName] = useState<string>("");

  return (
    <Aside className={isOpen ? 'open' : ''}>
      <Closeicon><img src={close} alt="close" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} /></Closeicon>
      <ProfileBox>
        {/* <Nickname>{name} 님</Nickname> */}
        <Nickname>유진 님</Nickname>
        <AsideBtn>
          <AsideButton to="/setting" src={setting} alt="setting" title="계정설정" />
          <AsideButton to="/bookmark" src={bookmark} alt="bookmark" title="북마크" />
          <AsideButton to="/history" src={history} alt="history" title="히스토리" />
        </AsideBtn>
      </ProfileBox>
      <BigCategory isOpen={isOpen} setIsOpen={setIsOpen} />
    </Aside>
  )
}

export default Asidebar;
