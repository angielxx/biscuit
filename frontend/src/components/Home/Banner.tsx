import tw, { styled, css } from 'twin.macro';
import BannerContent from './BannerContent';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isNoobState, isStartModalState } from '../../recoils/Start/Atoms';

// 배너 배경 이미지
import gradient_bg from '../../assets/image/banner_background.svg';

type BannerObj = {
  uid: number;
  bannerUrl: string;
  imgUrl: string;
};

const BannerContainer = tw.div`
  w-full h-fit
`;

const BannerBg = styled.div<{ img: any }>`
  ${tw`px-[10%] gap-[1vh] bg-center bg-cover h-[28vh] min-h-[300px] flex flex-col justify-evenly items-start text-center text-[1.5rem]`}
  ${({ img }) => css`
    background-image: url('${img}');
  `}
`;

const SeeMoreBtn = styled.button`
  ${tw`shadow-md bg-black text-main text-primary rounded-full px-5 py-2 transition ease-in hover:scale-105 hover:text-main-bold hover:text-black hover:bg-white`}
`;

const Banner = () => {
  const bannerList: BannerObj[] = [
    {
      uid: 1,
      bannerUrl:
        'https://medium.com/pinkfong/jotai는-조-타이-라고-읽습니다-6498535abe11',
      imgUrl:
        'https://miro.medium.com/v2/resize:fit:720/format:webp/1*T14136UddV7nGfmh6zSzjA.png',
    },
    {
      uid: 2,
      bannerUrl: 'https://velog.io/@94applekoo/45.-프로미스',
      imgUrl:
        'https://velog.velcdn.com/images/94applekoo/post/5b147a23-0e76-4abc-9280-6fce0fc98289/image.png',
    },
    {
      uid: 3,
      bannerUrl: 'https://velog.io/@heelieben/개발진스-짤-데려가세요',
      imgUrl:
        'https://velog.velcdn.com/images/heelieben/post/c3dce497-2507-4097-8538-9e3d37cc4933/image.png',
    },
  ];

  const settings = {
    autoplay: true,
    dots: false,
    infinite: true,
    fade: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [isStartModal, setIsStartModal] = useRecoilState(isStartModalState);

  const startModal = () => {
    setIsStartModal(true);
  };

  const isNoob = useRecoilValue(isNoobState);

  return (
    <BannerContainer>
      <div className="carousel">
        <Slider {...settings}>
          
          {isNoob === true
            ?
              <div>
                <BannerBg key="1" img={gradient_bg}>
                  <div className="flex flex-col items-start gap-[2vh]">
                    <div className="flex flex-col items-start text-left text-[2rem] leading-10 tracking-tight relative z-auto px-1">
                      <span className="z-10">
                        나에게 딱! 맞는 <br />
                        <span className="underline underline-offset-[-8px] decoration-primary decoration-[1rem] break-keep">
                          <strong className="text-bold">테크 컨텐츠</strong> 추천
                          서비스
                        </span>
                      </span>
                      {/* <div className="bg-dark-primary w-full h-[1rem] absolute bottom-0 left-[1px]" /> */}
                    </div>
                    <span className="text-main px-1">
                      지금 가입하고 바로 만나보세요.
                    </span>
                  </div>
                  <SeeMoreBtn onClick={startModal}>비스킷 시작하기</SeeMoreBtn>
                </BannerBg>
              </div>
            : null
          }
          {/* {bannerList?.map((banner) => {
            return (
              <BannerContent
                key={banner.uid}
                bannerUrl={banner.bannerUrl}
                imgUrl={banner.imgUrl}
              />
            );
          })} */}
        </Slider>
      </div>
    </BannerContainer>
  );
};

export default Banner;
