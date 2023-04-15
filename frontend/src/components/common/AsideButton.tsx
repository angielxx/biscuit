import { Link } from 'react-router-dom';

// css
import tw, { styled } from 'twin.macro';

const Btn = styled.div`
  ${tw`flex flex-col justify-center items-center w-[83px] bg-grey10 p-4 gap-2 rounded-10 text-h6 text-white font-light`}

  &:hover {
    ${tw`bg-primary-var text-black`}
  }
`;

interface AsideBtnProps {
  to: string;
  src: string;
  alt: string;
  title: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const AsideButton = ({ to, src, alt, title, onClick }: AsideBtnProps) => {
  return (
    <Link to={to} onClick={onClick}>
      <Btn>
        <img src={src} alt={alt} />
        <span>{title}</span>
      </Btn>
    </Link>
  );
};

export default AsideButton;
