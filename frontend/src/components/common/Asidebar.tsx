import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import BigCategory from './BigCategory';
import SmallCategory from './SmallCategory';
import AsideButton from './AsideButton';

// css
import tw, { css, styled } from 'twin.macro';

// icons
import close from '../../assets/icons/close.svg';
import setting from '../../assets/icons/setting.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import history from '../../assets/icons/history.svg';

const Aside = styled.div`
  ${tw`h-full z-20 flex flex-col items-start p-2 fixed w-[314px] right-0 top-0 bg-[#1A1B1E]`}

  &.open {
    ${css`
      animation: asidebar-show 0.5s;
    `}
  }

  ${css`
    @keyframes asidebar-show {
      from {
        right: -100%;
      }
      to {
        right: 0;
      }
    }
  `}
`;

const Closeicon = styled.div`
  ${tw`flex justify-end items-start p-2 self-stretch`}
`;

const ProfileBox = styled.div`
  ${tw`flex flex-col justify-end items-start p-4 gap-5 self-stretch`}
`;

const Nickname = styled.button`
  ${tw`h-9 text-primary text-h2`}
`;

const AsideBtn = styled.div`
  ${tw`flex justify-between items-start self-stretch gap-2`}
`;

interface AsidebarStatus {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ClickHanlder = (item: string) => void;

const Asidebar = ({ isOpen, setIsOpen }: AsidebarStatus) => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();
  const navigate = useNavigate();

  const mainCateList = [
    {
      id: 0, //e.g. 03,
      mainName: 'FrontEnd', //e.g. "Frontend",
      subCategories: [
        {
          id: 0, //e.g. 123,
          subName: 'React', //e.g. "React",
        },
        {
          id: 1, //e.g. 123,
          subName: 'TypeScript', //e.g. "React",
        },
      ],
    },
    {
      id: 1, //e.g. 03,
      mainName: 'BackEnd', //e.g. "Frontend",
      subCategories: [
        {
          id: 0, //e.g. 123,
          subName: 'Django', //e.g. "React",
        },
        {
          id: 1, //e.g. 123,
          subName: 'Spring', //e.g. "React",
        },
      ],
    },
  ];

  const goToMypage = () => {
    navigate('/mypage');
    setIsOpen(false);
  };

  const isClicked: ClickHanlder = (item: string) => {
    navigate(`/category/${item}`);
    setIsOpen(false);
  };

  return (
    <Aside className={isOpen ? 'open' : ''}>
      <Closeicon>
        <img
          src={close}
          alt="close"
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        />
      </Closeicon>
      <ProfileBox>
        <Nickname onClick={goToMypage}>유진 님</Nickname>
        <AsideBtn>
          <AsideButton
            to="/setting"
            src={setting}
            alt="setting"
            title="계정설정"
          />
          <AsideButton
            to="/bookmark"
            src={bookmark}
            alt="bookmark"
            title="북마크"
          />
          <AsideButton
            to="/history"
            src={history}
            alt="history"
            title="히스토리"
          />
        </AsideBtn>
      </ProfileBox>
      {mainCateList.map((item, index) => {
        return (
          <BigCategory
            key={item.id}
            isCategory={page === index ? true : false}
            isClicked={isClicked}
            item={item}
            onClick={() => {
              setPage(index);
              isCategory ? setIsCategory(false) : setIsCategory(true);
            }}
          />
        );
      })}
    </Aside>
  );
};

export default Asidebar;
