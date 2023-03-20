import { useRecoilState, useRecoilValue } from "recoil"
import Button from "../components/common/Button";
import DropDown from "../components/common/DropDown/DropDown";
import FilterBar from "../components/common/FilterBar/FilterBar";
import { functionToggleState } from "../recoils/FuntionToggle/Atoms"
import { homeFilterBtnState, homeFilterTimeState } from "../recoils/Home/Atoms";

export default function Home() {
  const functionToggle = useRecoilValue(functionToggleState);

  const clickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('클릭!');
  };

  // 피드백 모달 표시 여부
  const [showContentModal, setShowContentModal] = useState(true);
  // 퀴즈 모달 표시 여부
  const [showQuizModal, setShowQuizModal] = useState(false);
  // 유저가 가장 최근에 본 콘텐츠 정보
  const [recentContent, setRecentContent] = useState({});

  // 더미 데이터
  const dummy_content = {
    image:
      'https://content.surfit.io/thumbs/image/wnyb5/jlo8J/1004562377641287ed49a24.png/cover-center-1x.webp',
    url: 'https://blog.tosspayments.com/articles/semo-94',
    channelImg: 'https://api.surfit.io/v1/channel/logo/wnyb5/1x',
    title:
      '[사장님백서] 애플페이가 국내에 도입되면 알아야 할 온오프라인 결제 변화',
    author: '토스페이먼츠',
    date: '2023.03.17',
    isMarked: false,
    tags: ['일반 기획', '비즈니스 트렌드'],
  };

  const closeModal = () => {
    console.log('clicked');
    setShowContentModal(false);
  };

  const dropDownList = [
    { id: 1, content: "Frontend" },
    { id: 2, content: "Backend" },
    { id: 3, content: "DevOps" },
  ]

  const [filterBtnState, setFilterBtnState] = useRecoilState(homeFilterBtnState);
  const [filterTimeState, setFilterTimeState] = useRecoilState(homeFilterTimeState);

  return (
    <div>
      <h1>Home</h1>
      { functionToggle.homePageToggle ? <p>Toggle On</p> : <p>Toggle Off</p>}
      { functionToggle.buttonToggle ? <Button title="퀴즈 풀래요" status="active" onClick={clickBtn}/> : null}
      { functionToggle.dropDownToggle ? <DropDown itemList={dropDownList} placeHolder="직무 선택" /> : null}
      { functionToggle.filterBarToggle
        ? <FilterBar 
          filterBtnState={filterBtnState}
          setFilterBtnState={setFilterBtnState}
          filterTimeState={filterTimeState}
          setFilterTimeState={setFilterTimeState}
        />
        : null}
    </div>
  );
}
