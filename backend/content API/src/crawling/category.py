from collections import deque
import requests
from bs4 import BeautifulSoup


def bfs(baseUrl, startUrl):
    categoryDic = {}

    visited = list()
    queue = deque()
    queue.append((startUrl, 0, "start", "category"))

    while queue:
        top = queue.popleft()
        cat = top[3]
        if top[0] not in visited:
            visited.append(top[0])
            nowUrl = baseUrl + top[0]
            # print("nowUrl : " + nowUrl)
            response = requests.get(nowUrl)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "lxml")
            # print("============================")
            boxs = soup.find_all("div", attrs={"class": "Box-row"})
            for box in boxs:
                main_box = box.find("a", attrs={"class": "js-navigation-open"})
                main_name = main_box.get_text()
                main_link = main_box["href"]
                if top[2] != "start":
                    if categoryDic.get(top[3]) == None:
                        categoryDic[top[3]] = []
                    if top[1] != 1 and main_name != "\n.\u200a.\n":
                        categoryDic[top[3]].append(main_name)
                if top[1] < 2 and main_name != "\n.\u200a.\n":
                    if main_name == "content":
                        queue.append((main_link, top[1] + 1, main_name, cat))
                    else:
                        queue.append((main_link, top[1] + 1, main_name, main_name))
                # print(main_name, "https://github.com/"+main_link+"\n")
    return categoryDic
