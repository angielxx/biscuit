// css
import styled from "styled-components";

// icons
import close from '../../assets/icons/close.svg';
import setdefault from '../../assets/icons/Property 1=default.svg';
import dropdown from '../../assets/icons/arrow_drop_down.svg';

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;

  position: fixed;
  width: 298px;
  height: 828px;

  right: -55%;
  top: 0;
  position: fixed;

  &.open {
    right: 0;
  }
`

const Closeicon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  gap: 19px;

  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`

const Nickname = styled.div`
  width: 136px;
  height: 34px;

  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 140%;

  color: #3FE5EF;

  flex: none;
  order: 2;
  flex-grow: 0;
`

const Sidemenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 4px 0px;
  gap: 10px;

  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
`

const Category = styled.div`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  gap: 10px;

  width: 298px;
  height: 52px;

  border-bottom: 1px solid #252B30;
  color: #FFFFFF;

  flex: none;
  order: 4;
  align-self: stretch;
  flex-grow: 0;
`

export default function Asidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) {
  const category = [
    { name: "Frontend"},
    { name: "Backend"},
    { name: "DevOps"},
    { name: "Android"},
    { name: "QA"},
  ];

  return (
    <Aside className={isOpen ? 'open' : ''}>
      <Closeicon><img src={close} alt="close" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} /></Closeicon>
      <Middle>
        <Nickname>Jiny님</Nickname>
        <Sidemenu>
          <img src={setdefault} alt="default" />
          <img src={setdefault} alt="default" />
          <img src={setdefault} alt="default" />
        </Sidemenu>
      </Middle>
      {category.map((data) => (
        <>
          <Category>
            <p>{data.name}</p>
            <img src={dropdown} alt="dropdown" />
          </Category>
        </>
      ))}
    </Aside>
  )
}
