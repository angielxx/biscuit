// css
import styled from "styled-components";

// icons
import setting from '../../assets/icons/setting.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import history from '../../assets/icons/history.svg';

const AsideBtn = styled.div`
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

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
  gap: 8px;

  position: relative;
  width: 83px;

  background: #252B30;
  border-radius: 10px;
  color: #FFFFFF;
  font-size: 12px;

  &:hover {
    background: #2FB0CF;
    color: #000000;
  }
`

export default function AsideButton() {
  return (
    <AsideBtn>
      <Btn>
        <img src={setting} alt="setting" />
        <span>계정설정</span>
      </Btn>
      <Btn>
        <img src={bookmark} alt="bookmark" />
        <span>북마크</span>
      </Btn>
      <Btn>
        <img src={history} alt="history" />
        <span>히스토리</span>
      </Btn>
    </AsideBtn>
  )
}