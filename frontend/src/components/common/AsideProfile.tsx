import { useNavigate } from "react-router-dom";
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

const AsideProfile = () => {
  const navigate = useNavigate();

  const goToMypage = () => {
    navigate('/mypage');
    // setIsOpen(false);
  };

  return (
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
  )
}

export default AsideProfile;