import { useState } from "react";

// css
import styled from "styled-components";

// icons
import dropdown from '../../assets/icons/arrow_drop_down.svg';

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

export default function BigCategory() {
  const [isCategory, setIsCategory] = useState<boolean>(false);

  const category = [
    { name: "Frontend" },
    { name: "Backend" },
    { name: "DevOps" },
    { name: "Android" },
    { name: "QA" },
  ];

  return (
    <>
      {category.map((data) => (
        <>
          <Category>
            <p>{data.name}</p>
            <img src={dropdown} alt="dropdown" onClick={() => {isCategory ? setIsCategory(false) : setIsCategory(true); }} />
          </Category>
        </>
      ))}
    </>
  )
}