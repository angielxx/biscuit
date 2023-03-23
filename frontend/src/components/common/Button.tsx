import tw, { styled, TwStyle } from 'twin.macro';

interface ButtonProps {
  title: string;
  status: StatusType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

type StatusType = 'active' | 'disabled' | 'danger' | 'activeHover';
type BtnStatusType = {
  [index: string]: TwStyle;
  active: TwStyle;
  disabled: TwStyle;
  danger: TwStyle;
  activeHover: TwStyle;
};

const btnStatus: BtnStatusType = {
  active: tw`bg-dark-secondary text-black`,
  disabled: tw`bg-dark-grey20 text-dark-grey40`,
  danger: tw`bg-dark-danger text-black`,
  activeHover: tw`bg-dark-secondary-var text-black`,
};

const Btn = styled.button((props: { status: StatusType }) => [
  tw`w-80 h-12 rounded-full flex justify-center items-center`, 
  btnStatus[props.status],
]);

const Text = tw.span`text-h4`;

/** title : 버튼 내용,
 * status : "active", "disabled", "danger", "activeHover" */
const Button = ({title, status, onClick}: ButtonProps) => {
  return (
    <Btn status={status} onClick={onClick}>
      <Text>{title}</Text>
    </Btn>
  );
};

export default Button;