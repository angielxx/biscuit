import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// components
import BigCategory from './BigCategory';
import AsideButton from './AsideButton';

// css
import tw, { css, styled } from 'twin.macro';

// icons
import close from '../../assets/icons/close.svg';
import setting from '../../assets/icons/setting.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import history from '../../assets/icons/history.svg';
import { useQuery } from '@tanstack/react-query';
import { get_categories } from '../../api/category';

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

  const { data, isLoading } = useQuery(
    ['get_categories'],
    () => get_categories()
  )

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
        <Nickname onClick={goToMypage}>유저네임 님</Nickname>
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

      {data?.map((item, index) => {
        return (
          <BigCategory
            key={item.id}
            isCategory={page === index ? isCategory : false}
            isClicked={isClicked}
            item={item}
            onClick={() => {
              setPage(index);
              // page !== index 일 경우, isCategory가 true면, 걍 true로 냅둬야한다.
              isCategory
                ? page === index
                  ? setIsCategory(false)
                  : setIsCategory(true)
                : setIsCategory(true);
            }}
          />
        );
      })}
    </Aside>
  );
};

export default Asidebar;
