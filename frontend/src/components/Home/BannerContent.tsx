import tw, { styled, css } from "twin.macro";

type BannerProps = {
  bannerUrl: string;
  imgUrl: string;
}

const BannerContainer = styled.img<{image: string}>`
  ${tw`w-[300px] h-[200px] bg-cover flex`}
  ${({ image }) =>
    css`
      background-image: url(${image});
  `};
`;

const BannerContent = ({bannerUrl, imgUrl}: BannerProps) => {

  const onClickBanner = () => {
    window.open(bannerUrl, "_blank")
  }

  return (
    <BannerContainer onClick={onClickBanner} image={imgUrl}/>
  )
}

export default BannerContent;