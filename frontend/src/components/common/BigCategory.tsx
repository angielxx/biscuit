import { useState } from 'react';

// css
import tw, { css, styled } from 'twin.macro';

// icons
import dropdown from '../../assets/icons/arrow_drop_down.svg';
import SmallCategory from './SmallCategory';

const CategoryBox = styled.li`
  ${tw`w-full flex flex-col`}
`;

const Category = styled.button`
  ${tw`flex justify-between items-center w-full h-13 box-border px-3 py-4 text-white self-stretch border-b border-solid border-evaluated`}
`;

const Img = styled.img`
  &.open {
    ${css`
      transform: rotate(180deg);
      animation: open-rotate 0.6s;
    `}
  }

  &.close {
    ${css`
      animation: close-rotate 0.6s;
    `}
  }

  ${css`
    @keyframes open-rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(180deg);
      }
    }

    @keyframes close-rotate {
      from {
        transform: rotate(180deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
  `}
`;

const SubCategory = styled.div`
  &.show {
    max-height: 100vh;
    display: block;
    animation: show 3s ease;
  }

  &.hide {
    max-height: 0;
    display: none;
    animation: hide 3s ease;
  }

  ${css`
    @keyframes show {
      from {
        max-height: 0;
        display: none;
      }
      to {
        max-height: 100vh;
        display: block;
      }
    }

    @keyframes hide {
      from {
        max-height: 100vh;
        display: block;
      }
      to {
        max-height: 0;
        display: none;
      }
    }
  `}
`;

type Content = {
  id: number;
  mainName: string;
  subCategories: {
    id: number;
    subName: string;
  }[];
};

type ClickHanlder = (event: any, item: string) => void;

interface BigCategoryProps {
  item: Content;
  onClick: React.MouseEventHandler<HTMLLIElement>;
  isClicked: ClickHanlder;
  isCategory: boolean;
  selectList: string[];
  locate: string;
}

const BigCategory = ({
  item,
  onClick,
  isClicked,
  isCategory,
  selectList,
  locate,
}: BigCategoryProps) => {
  return (
    <CategoryBox onClick={onClick}>
      <Category className={locate === 'aside' ? 'bg-black' : 'bg-evaluated'}>
        <p className="text-h3">{item.mainName}</p>
        <Img
          src={dropdown}
          alt="dropdown"
          className={isCategory ? 'open' : 'close'}
        />
      </Category>
      <SubCategory className={isCategory ? 'show' : 'hide'}>
        <div>
          <ul>
            {item.subCategories.map((content, index) => {
              return (
                <SmallCategory
                  key={index}
                  isClicked={(e) => {
                    isClicked(e, content.subName);
                  }}
                  title={content.subName}
                  selectList={selectList}
                />
              );
            })}
          </ul>
        </div>
      </SubCategory>
    </CategoryBox>
  );
};

export default BigCategory;
