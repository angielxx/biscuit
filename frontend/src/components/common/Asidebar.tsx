import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isStartModalState } from '../../recoils/Start/Atoms';

// components
import BigCategory from './BigCategory';

// css
import tw, { css, styled } from 'twin.macro';

// icons
import close from '../../assets/icons/close.svg';
import { useQuery } from '@tanstack/react-query';
import { get_categories } from '../../api/category';
import AsideProfile from './AsideProfile';
import AsideLogin from './AsideLogin';
import { useRecoilState } from 'recoil';

const Aside = styled.div`
  ${tw`h-full z-20 flex flex-col items-start p-2 fixed w-[314px] right-0 top-0 bg-black`}

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

interface AsidebarStatus {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ClickHanlder = (item: string) => void;

const Asidebar = ({ isOpen, setIsOpen }: AsidebarStatus) => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();
  const [isStartModal, setIsStartModal] = useRecoilState(isStartModalState);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery(
    ['get_categories'],
    () => get_categories()
  )

  const isClicked: ClickHanlder = (item: string) => {
    navigate(`/category/${item}`);
    setIsOpen(false);
  };

  const startModal = () => {
    setIsStartModal(true);
    setIsOpen(false);
  }

  return (
    <Aside className={isOpen ? 'open' : ''}>
      <Closeicon>
        <img
          src={close}
          alt="close"
          onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
        />
      </Closeicon>

      {/* 로그인 안했을 때 */}
      <AsideLogin onClick={startModal} />
      

      {/* 로그인 했을 때 */}
      {/* <AsideProfile /> */}
      

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
            selectList={[]}
            locate="aside"
          />
        );
      })}
    </Aside>
  );
};

export default Asidebar;
