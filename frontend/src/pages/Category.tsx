import { useState, useEffect } from "react";
import requests from "../api/requests";
import axios from "axios";

const CategoryPage = () => {
  const [category, setCategory] = useState<string>("");
  const [categoryList, setCategoryList] = useState<[]>([]);
  
  const cate = location.href.substring(location.href.indexOf('contents/') + 9)
  useEffect(() => {
    console.log('1111')
    async function getCategory() {
      await axios
        .get(requests.category.getCategory(cate))
        .then((response) => {
          setCategory(response.data.category);
          setCategoryList(response.data.results.items);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCategory();
    console.log('2222')
  }, []);

  return (
    <>
      <div className="text-white">카테고리 페이지</div>
      {categoryList.map((item, index) => {
        return (
          <></>
        )
      })}
    </>
  )
}

export default CategoryPage;