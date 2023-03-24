import requests
from bs4 import BeautifulSoup
from collections import deque


def bfs(url):
    visited = list()
    queue = list()
    queue.append((url, 0, "start", "category"))

    while queue:
        top = queue.pop(0)
        cat = top[3]
        if top[0] not in visited :
            visited.append(top[0])
            nowUrl = baseUrl+top[0]
            # print("nowUrl : " + nowUrl)
            response = requests.get(nowUrl)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "lxml")
            # print("============================")
            boxs = soup.find_all('div', attrs={"class" : "Box-row"})
            for box in boxs:
                main_box = box.find('a', attrs={"class" : "js-navigation-open"})
                main_name = main_box.get_text()
                main_link = main_box["href"]
                if top[2] != "start" :
                    if categoryDic.get(top[3]) == None :
                        categoryDic[top[3]] = []
                    if top[1] != 1 and main_name != '\n.\u200a.\n':
                        categoryDic[top[3]].append(main_name)
                if top[1] < 2 and main_name != '\n.\u200a.\n':
                    if main_name == "content":
                        queue.append((main_link, top[1]+1, main_name, cat))
                    else :
                        queue.append((main_link, top[1]+1, main_name, main_name))
                # print(main_name, "https://github.com/"+main_link+"\n")
            
categoryDic = {}

baseUrl = "https://github.com"
startUrl = "/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps"

bfs(startUrl)

for key, value in categoryDic.items() :
    print(key, value)
    print("\n")



