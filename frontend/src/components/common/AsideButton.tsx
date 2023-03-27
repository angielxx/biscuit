import { Link } from "react-router-dom";

// css
import tw, { styled } from "twin.macro";

const Btn = styled.div`
  ${tw`flex flex-col justify-center items-center w-[83px] bg-dark-grey10 p-4 gap-2 rounded-10 text-h6 text-white font-light`}

  &:hover {
    ${tw`bg-dark-primary-var text-black`}
  }
`

interface AsideBtnProps {
  to: string;
  src: string;
  alt: string;
  title: string;
}

const AsideButton = ({to, src, alt, title}: AsideBtnProps) => {
  return (
    <Link to={to}>
      <Btn>
        <img src={src} alt={alt} />
        <span>{title}</span>
      </Btn>
    </Link>
  )
}

export default AsideButton;
