import { useState } from "react";
import BigCategory from "./BigCategory";
import AsideButton from "./AsideButton";

// css
import styled from "styled-components";

// icons
import close from '../../assets/icons/close.svg';

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 8px;
  background: #1A1B1E;

  position: fixed;
  width: 314px;
  height: 844px;

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

export default function Asidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any; }) {
  const [name, setName] = useState<string>("");

  return (
    <Aside className={isOpen ? 'open' : ''}>
      <Closeicon><img src={close} alt="close" onClick={() => isOpen ? setIsOpen(false) : setIsOpen(true)} /></Closeicon>
      <Middle>
        {/* <Nickname>{name} 님</Nickname> */}
        <Nickname>유진 님</Nickname>
        <AsideButton />
      </Middle>
      <BigCategory />
    </Aside>
  )
}
