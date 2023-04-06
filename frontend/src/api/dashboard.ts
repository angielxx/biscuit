import { authInstance } from "./axios";
import { requests } from "./requests";

type History = {
  date: string;
  count: number;
}

type Graph = {
  category: string;
  count: number;
}

interface DashboardContent {
  status: number;
  message: string;
  histories: History[];
  graphs: Graph[];
  point: number;
}

export const get_dashboard = async (): Promise<DashboardContent> => {
  const response = await authInstance.get(requests.GET_DASHBOARD());
  return response.data;
}