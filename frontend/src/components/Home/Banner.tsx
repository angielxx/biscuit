import tw, { styled, css } from "twin.macro";
import Slider from "react-slick";
import BannerContent from "./BannerContent";

type BannerObj = {
  uid: number;
  bannerUrl: string;
  imgUrl: string;
}

const BannerContainer = tw.div`
  bg-white
`

const Banner = () => {
  const bannerList: BannerObj[] = [
    {
      uid: 1,
      bannerUrl: "https://medium.com/pinkfong/jotai는-조-타이-라고-읽습니다-6498535abe11",
      imgUrl: "https://miro.medium.com/v2/resize:fit:720/format:webp/1*T14136UddV7nGfmh6zSzjA.png",
    },
    {
      uid: 2,
      bannerUrl: "https://velog.io/@94applekoo/45.-프로미스",
      imgUrl: "https://velog.velcdn.com/images/94applekoo/post/5b147a23-0e76-4abc-9280-6fce0fc98289/image.png",
    },
    {
      uid: 3,
      bannerUrl: "https://velog.io/@heelieben/개발진스-짤-데려가세요",
      imgUrl: "https://velog.velcdn.com/images/heelieben/post/c3dce497-2507-4097-8538-9e3d37cc4933/image.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <BannerContainer>
      <Slider {...settings}>
        {bannerList?.map((banner) => {
          return (
            <a href={banner.bannerUrl}>
              <img
                key={banner.uid}
                src={banner.imgUrl}
                width={100}
                height={100}
              />
            </a>
          )
        })}
      </Slider>
    </BannerContainer>
  )
}

export default Banner;