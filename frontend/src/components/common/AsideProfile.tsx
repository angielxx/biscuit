import { useNavigate, useParams } from "react-router-dom";
import AsideButton from "./AsideButton";

// css
import tw, { styled } from "twin.macro";

// icons
import setting from '../../assets/icons/setting.svg';
import bookmark from '../../assets/icons/bookmark.svg';
import history from '../../assets/icons/history.svg';

const ProfileBox = styled.div`
  ${tw`flex flex-col justify-end items-start p-4 gap-5 self-stretch`}
`;

const Nickname = styled.button`
  ${tw`h-9 text-primary text-h2`}
`;

const AsideBtn = styled.div`
  ${tw`flex justify-between items-start self-stretch gap-2`}
`;

interface ProfileProps {
  isName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AsideProfile = ({isName, onClick, setIsOpen}: ProfileProps) => {
  const asideState = () => {
    setIsOpen(false);
  }
  
  return (
    <ProfileBox>
      <Nickname onClick={onClick}>{isName} 님</Nickname>
      <AsideBtn>
        <AsideButton
          to="/editProfile"
          src={setting}
          alt="setting"
          title="계정설정"
          onClick={asideState}
        />
        <AsideButton
          to="/mystore/0"
          src={bookmark}
          alt="bookmark"
          title="북마크"
          onClick={asideState}

        />
        <AsideButton
          to="/mystore/1"
          src={history}
          alt="history"
          title="히스토리"
          onClick={asideState}
        />
      </AsideBtn>
    </ProfileBox>
  )
}

export default AsideProfile;