import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isNameState, isStartModalState } from '../../recoils/Start/Atoms';
import { isNoobState } from '../../recoils/Start/Atoms';
import ReactDOM from 'react-dom';

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
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCookie } from 'typescript-cookie';
import Logout from './Logout';

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

const BackdropWrapper = styled.div`
  ${css`
    background: rgba(0, 0, 0, 0.75);
  `}
  ${tw`fixed top-0 left-0 w-full h-full z-20`}
`;

interface BackdropProps {
  onClose?: () => void;
}

function Backdrop({ onClose }: BackdropProps) {
  return <BackdropWrapper onClick={onClose} />;
}

interface AsidebarStatus {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ClickHanlder = (event: any, item: string) => void;

const Asidebar = ({ isOpen, setIsOpen }: AsidebarStatus) => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();
  const [isStartModal, setIsStartModal] = useRecoilState(isStartModalState);
  const navigate = useNavigate();

  const isName = useRecoilValue(isNameState);
  const [isNoob, setIsNoob] = useRecoilState(isNoobState);

  const { data, isLoading } = useQuery(['get_categories'], () =>
    get_categories()
  );

  const isClicked: ClickHanlder = (event: any, item: string) => {
    navigate(`/category/${item}`);
    setIsOpen(false);
  };

  const startModal = () => {
    setIsStartModal(true);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!getCookie('access-token')) {
      setIsNoob(true);
    }
  }, []);

  const goToMypage = () => {
    navigate('/mypage');
    setIsOpen(false);
  };

  return (
    <>
      <Backdrop onClose={() => setIsOpen(false)} />

      <Aside className={isOpen ? 'open' : ''}>
        <Closeicon>
          <img
            src={close}
            alt="close"
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          />
        </Closeicon>

        {isNoob === false ? (
          <AsideProfile isName={isName} onClick={goToMypage} setIsOpen={setIsOpen} />
        ) : (
          <AsideLogin onClick={startModal} />
        )}

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
        
        {/* 로그아웃 버튼 좀 추가할게 고마워 */}
        {isNoob === false 
          ? <Logout />
          : null 
        }
      </Aside>
    
    </>
  );
};

export default Asidebar;
