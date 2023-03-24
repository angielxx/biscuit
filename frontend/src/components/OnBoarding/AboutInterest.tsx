import { useState } from 'react';
import BigCategory from '../common/BigCategory';
import Button from '../common/Button';

// icons
import backspace from '../../assets/icons/backspace.svg';

type ClickHanlder = (event: any, item: string) => void;

const AboutInterest = () => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();

  const goBack = () => {
    console.log("뒤로 가기");
  }

  const mainCateList = [
    {
      id: 0,  //e.g. 03,
      mainName: "FrontEnd",  //e.g. "Frontend",
      subCategories: [
        {
          id: 0,  //e.g. 123,
          subName: "React",  //e.g. "React",
        },
        {
          id: 1,  //e.g. 123,
          subName: "TypeScript",  //e.g. "React",
        },
      ],
    },
    {
      id: 1,  //e.g. 03,
      mainName: "BackEnd",  //e.g. "Frontend",
      subCategories: [
        {
          id: 0,  //e.g. 123,
          subName: "Django",  //e.g. "React",
        },
        {
          id: 1,  //e.g. 123,
          subName: "Java",  //e.g. "React",
        },
      ],
    },
  ]

  const [selectList, setSelectList] = useState<string[]>([]);

  const isClicked: ClickHanlder = (event: any, item: string) => {
    event.stopPropagation();
    if (selectList.includes(item)) {
      // 이미 리스트에 들어있다면 해당 item 삭제
      const arr = selectList.filter((element) => element !== item);
      setSelectList(arr);
    } else {
      // 없으면 해당 item 추가
      setSelectList(selectList => [...selectList, item]);
    }
    console.log(selectList);
  }

  const isSend = () => {
    console.log("저장한 리스트 보내기");
  }

  return (
    <>
      <div className='flex items-start'>
        <img src={backspace} onClick={goBack} />
      </div>
      <div className='flex flex-col gap-2'>
        <span className='text-h3'>어떤 기술에 관심이 있으신가요?</span>
        <span className='text-sub text-subColor'>관심사에 맞춘 컨텐츠를 홈 화면에서 추천드려요.</span>
      </div>
      <hr className="border-[1px] border-dark-grey20" />
      <div className='h-[440px] overflow-scroll'>
        {mainCateList.map((item, index) => {
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
      </div>
      <div className="flex justify-center px-2 gap-2">
        <Button title="선택 완료" status={selectList.length !== 0 ? "active" : "disabled"} onClick={isSend} />   
      </div>
    </>
  )
}

export default AboutInterest;