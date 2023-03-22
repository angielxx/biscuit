import React, { useState, ChangeEvent } from "react";
import tw, { css, styled, TwStyle } from "twin.macro";

interface TextInputProps {
  status: StatusType;
}

type StatusType = 'primary' | 'error' | 'success';
type InputStatusType = {
  primary: TwStyle;
  error: TwStyle;
  success: TwStyle;
};

const InputStatus: InputStatusType = {
  primary: tw`border-none`,
  error: tw`border-2 border-dark-danger`,
  success: tw`border-2 border-secondary`
};

const Input = styled.input((props: { status: StatusType }) => [
  tw`w-full h-11 p-4 gap-2 bg-dark-grey20 rounded-10 text-dark-grey70`,
  css`
    :focus {
      outline: none;
    }
  `,
  InputStatus[props.status]
]);

const TextInput = ({status}: TextInputProps) => {
  const [isName, setIsName] = useState<string>("");
  const [isCount, setIsCount] = useState<number>(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setIsName(value);
    setIsCount(e.target.value.replace(/<br\s*\/?>/gm, "\n").length);
  }

  return (
    <div className="w-full flex flex-col items-start p-2 gap-2">
      <Input 
        placeholder="닉네임을 입력하세요" 
        status={status}
        onChange={onChange}
      />
      <div className="w-full flex justify-end px-1">
        <span className="text-subColor text-tiny">{isCount} / 10</span>
      </div>
    </div>
  );
};

export default TextInput;