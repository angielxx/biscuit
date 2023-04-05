import tw, { styled, css } from 'twin.macro';
import { useState, useEffect } from 'react';

const Logo = tw.img`w-9 h-9 mr-2`;

const Icon = ({ category }: { category: string }) => {
  const [imgSrc, setImgSrc] = useState(
    `src/assets/icons/category/${category}.svg`
  );
  const [isExists, setIsExists] = useState(false);

  function checkLocalImgFileExists(imgSrc: string) {
    let img = new Image();
    img.src = imgSrc;
    img.onload = function () {
      setIsExists(true);
    };
    img.onerror = function () {
      setImgSrc('src/assets/icons/category/Default.svg');
      setIsExists(false);
    };
  }

  useEffect(() => {
    checkLocalImgFileExists(imgSrc);
  }, [imgSrc]);

  return <Logo src={imgSrc} />;
};

export default Icon;
