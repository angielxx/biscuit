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
  const authContent = ['fit', 'favor_category', 'bookmarked', 'similar_member'];
  const isNoob = useRecoilValue(isNoobState);

  return (
    <HomeContentsContainer>
      {isNoob === false
        ? authContent?.map((category) => {
            return <>
              <FitContent key={category} option={category} />
              <PersonalContentList key={category} option={category} />
            </>;
          })
        : unAuthContents?.map((category) => {
            return <HomeContentList key={category} category={category} />;
          })}
    </HomeContentsContainer>
  );
};

export default HomeContents;
