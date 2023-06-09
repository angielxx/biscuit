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
};

const btnStatus: BtnStatusType = {
  active: tw`bg-secondary text-black hover:bg-secondary-var`,
  disabled: tw`bg-grey20 text-grey40`,
  danger: tw`bg-danger text-black`,
};

const Btn = styled.button((props: { status: StatusType }) => [
  tw`w-full h-12 rounded-full flex justify-center items-center`,
  btnStatus[props.status],
]);

const Text = tw.span`text-h4`;

/** title : 버튼 내용,
 * status : "active", "disabled", "danger", "activeHover" */
const Button = ({ title, status, onClick }: ButtonProps) => {
  return (
    <Btn status={status} onClick={onClick}>
      <Text>{title}</Text>
    </Btn>
  );
};

export default Button;
