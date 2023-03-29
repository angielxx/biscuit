import React from 'react';
import tw, { styled } from 'twin.macro';

interface PageTitleProps {
  title: string;
  desc: string;
}

const PageTitle = ({ title, desc }: PageTitleProps) => {
  return (
    <div className="flex flex-col gap-1 break-keep">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default PageTitle;
