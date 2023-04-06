import tw, { styled, css } from 'twin.macro';
import HomeContentList from './HomeContentList';
import PersonalContentList from './PersonalContentList';
import FitContent from './FitContent';
import { isNoobState } from '../../recoils/Start/Atoms';
import { useRecoilValue } from 'recoil';

const HomeContentsContainer = tw.div`
  flex-col w-full h-fit
`;

const HomeContents = ({}: Object) => {
  const unAuthContents = ['id', 'hit', 'category'];
  const authContent = ['favorite', 'bookmarked', 'similar'];
  const isNoob = useRecoilValue(isNoobState);

  return (
    <HomeContentsContainer>
      {isNoob === false
        ? <>
          <FitContent option={"fit"} />
          {authContent?.map((category) => {
              return <>
                <PersonalContentList key={category} option={category} />
              </>;
          })}
        </>
        : unAuthContents?.map((category) => {
            return <HomeContentList key={category} category={category} />;
          })}
    </HomeContentsContainer>
  );
};

export default HomeContents;
