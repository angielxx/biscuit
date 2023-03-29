import time
import os
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
import re
import csv
import traceback

def make_file(url, credit_at, create_date, title):
    # 페이지 가져오기
    response = requests.get(f"{url}")
    

    # BeautifulSoup 객체 만들기
    soup = BeautifulSoup(response.content, "html.parser")

    # article 태그 가져오기
    article_tag = soup.find("article")

    if article_tag is None or credit_at == '카카오':
        output = open(f"../output/error/error.txt", "a", encoding="utf-8")
        # article 태그의 내용 출력
        output.write(f"{url},{credit_at},{create_date},{title}\n")
        return

    # 파일명에 사용할 수 없는 문자 제거
    filename = f'{credit_at}_{title}'
    filename = re.sub('[\/:*?"<>|],','',filename)
    # filename = re.sub("[\/:*?\"<>|]", "", filename)
    try:
        if not os.path.exists(f"../output/content/{create_date}"):
            os.makedirs(f"../output/content/{create_date}")
            
        output = open(f'../output/content/{create_date}/{filename}.txt', 'a', encoding='utf-8')
        post_index = open(f'../output/content/{create_date}/index.txt', 'a', encoding='utf-8')
        
        # article 태그의 내용 출력

        
        pre_list = article_tag.find_all("pre")
        for _ in pre_list:
            article_tag.find("pre").decompose()
        print(article_tag.get_text())

        output.write(article_tag.get_text())
        post_index.write(f'{url}\n')
    except:
        traceback.print_exc()
        output = open(f"../output/error/error.txt", "a", encoding="utf-8")
        output.write(f"{url},{credit_at},{create_date},{title}\n")
        pass

f = open('../output/content/crawling_data2.csv', 'r', encoding='utf-8')
records = csv.reader(f)

# record = [url, title, credit_at, created_Date, ...category]
for record in records:
    url = record[0]
    title = record[1]
    credit_at = record[2]
    created_date = record[3]

    print(url, credit_at, created_date, title)

    make_file(url, credit_at, created_date, title)

f.close()
