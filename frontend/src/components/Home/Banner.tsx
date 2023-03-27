import tw, { styled, css } from 'twin.macro';
import BannerContent from './BannerContent';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  ${tw`gap-[6vh] bg-center bg-cover h-[35vh] flex flex-col justify-center items-center text-center text-[1.5rem]`}
  ${({ img }) => css`
    background-image: url('${img}');
  `}
`;

const SeeMoreBtn = styled.button`
  ${tw`bg-black text-sub text-primary rounded-full px-5 py-2 transition ease-in hover:scale-105`}
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

  return (
    <BannerContainer>
      <div className="carousel">
        <BannerBg key="1" img={gradient_bg}>
          <div className="flex flex-col">
            <span>나에게 딱! 맞는</span>
            <span className="relative">
              <strong>테크 컨텐츠</strong> 추천 서비스
              <div className="bg-primary w-full h-[2vh] absolute" />
            </span>
          </div>
          <SeeMoreBtn>자세히 보기</SeeMoreBtn>
        </BannerBg>
        {/* <Slider {...settings}>
          {bannerList?.map((banner) => {
            return (
              <BannerContent
                key={banner.uid}
                bannerUrl={banner.bannerUrl}
                imgUrl={banner.imgUrl}
              />
            );
          })}
        </Slider> */}
      </div>
    </BannerContainer>
  );
};

export default Banner;
