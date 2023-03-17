import tw, { styled } from "twin.macro";

const SmallCate = styled.div`
  ${tw`flex items-center w-[298px] h-13 box-border px-3 py-4 text-white order-5 border-b border-solid border-dark-evaluated`}
`

const SmallCategory = () => {
  return (
    <SmallCate>
      <img />
      <p className="text-h3">섭카테</p>
    </SmallCate>
  )
}

export default SmallCategory;