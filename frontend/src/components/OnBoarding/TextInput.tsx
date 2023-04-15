import React, { useState, ChangeEvent } from 'react';
import tw, { css, styled, TwStyle } from 'twin.macro';

type ChangeHanlder = (e: any) => void;

interface TextInputProps {
  status: StatusType;
  isCount: number;
  onChange: ChangeHanlder;
  value: string;
}

type StatusType = 'primary' | 'error' | 'success';
type InputStatusType = {
  primary: TwStyle;
  error: TwStyle;
  success: TwStyle;
};

const InputStatus: InputStatusType = {
  primary: tw`border-none`,
  error: tw`border-2 border-danger`,
  success: tw`border-2 border-secondary`,
};

const Input = styled.input((props: { status: StatusType }) => [
  tw`w-full h-11 p-4 gap-2 bg-grey20 rounded-10 text-sub text-grey70`,
  css`
    :focus {
      outline: none;
    }
  `,
  InputStatus[props.status],
]);

const TextInput = ({ status, isCount, onChange, value }: TextInputProps) => {
  return (
    <div className="w-full flex flex-col items-start p-2 gap-2">
      <Input
        placeholder="닉네임을 입력하세요"
        maxLength={10}
        status={status}
        onChange={onChange}
        value={value}
      />
      <div className="w-full flex justify-end px-1">
        <span className="text-subColor text-tiny">{isCount} / 10</span>
      </div>
    </div>
  );
};

export default TextInput;
