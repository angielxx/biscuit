import { useState } from 'react';
import BigCategory from '../common/BigCategory';
import Button from '../common/Button';

// icons
import backspace from '../../assets/icons/backspace.svg';
import { useQuery } from '@tanstack/react-query';
import { get_categories } from '../../api/category';

type ClickHanlder = (event: any, item: string) => void;

interface AboutInterestProps {
  isBack: () => void;
  isSend: () => void;
  isClicked: ClickHanlder;
  selectList: string[];
}

const AboutInterest = ({
  isBack,
  isSend,
  isClicked,
  selectList,
}: AboutInterestProps) => {
  const [isCategory, setIsCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>();

  const { data, isLoading } = useQuery(['get_categories'], () =>
    get_categories()
  );

  return (
    <>
      <div className="flex items-start">
        <img src={backspace} onClick={isBack} />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <span className="text-h3">어떤 기술에 관심이 있으신가요?</span>
        <span className="text-tiny text-subColor">
          관심사에 맞춘 컨텐츠를 홈 화면에서 추천드려요.
        </span>
      </div>
      <hr className="my-4 border-[1px] border-dark-grey20" />
      <ul className="h-[320px] overflow-scroll">
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
              selectList={selectList}
              locate="onboard"
            />
          );
        })}
      </ul>
      <div className="flex justify-center px-2 gap-2 mt-6">
        <Button
          title="선택 완료"
          status={selectList.length !== 0 ? 'active' : 'disabled'}
          onClick={isSend}
        />
      </div>
    </>
  );
};

export default AboutInterest;
