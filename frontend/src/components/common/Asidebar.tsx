import { useEffect, useState } from "react";
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
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Asidebar = ({ isOpen, setIsOpen }: AsidebarStatus) => {
  // const [name, setName] = useState<string>("");
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();
  // const [mainCateList, setMainCateList] = useState<[]>([]);

  const mainCateList = [
    { id: 1, mainName: "FrontEnd", subName: ["React", "TypeScript"] },
    { id: 2, mainName: "BackEnd", subName: ["Django", "Spring"] },
    { id: 3, mainName: "DevOps", subName: ["히히", "속았징 ?"] },
  ]

  return (
    <Aside className={isOpen ? 'open' : ''}>
      <Closeicon><img src={close} alt="close" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} /></Closeicon>
      <ProfileBox>
        <Nickname>유진 님</Nickname>
        <AsideBtn>
          <AsideButton to="/setting" src={setting} alt="setting" title="계정설정" />
          <AsideButton to="/bookmark" src={bookmark} alt="bookmark" title="북마크" />
          <AsideButton to="/history" src={history} alt="history" title="히스토리" />
        </AsideBtn>
      </ProfileBox>
      {mainCateList.map((item, index) => {
        return (
          <BigCategory 
            key={item.id} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
            isCategory={page === index ? true : false} 
            title={item.mainName}
            content={item.subName}
            onClick={() => {setPage(index); (isCategory ? setIsCategory(false) : setIsCategory(true));}}
          />
        )
      })}
    </Aside>
  )
}

export default Asidebar;
