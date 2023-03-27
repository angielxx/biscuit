import { baseInstance } from "./axios";
import { requests } from "./requests";

interface content {
  id: number;
  mainName: string;
  subCategories: {
    id: number;
    subName: string;
  }[]
}

export const get_categories = async (
): Promise<content[]> => {
  const { data } = await baseInstance.get(
    requests.GET_CATEGORIES()
  );
  return data.categories;
}