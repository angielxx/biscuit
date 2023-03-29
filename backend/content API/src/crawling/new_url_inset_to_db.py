import configparser
import pymysql
from cron_crawling import get_content

config = configparser.ConfigParser()
config.read("src/config.ini", encoding="utf-8")

conn = pymysql.connect(
    host=config["DB"]["HOST"],
    user=config["DB"]["USER"],
    password=config["DB"]["PASSWORD"],
    db=config["DB"]["DATABASE"],
    charset="utf8",
)

curs = conn.cursor()
conn.commit()
#
content_list = get_content()

for content in content_list:
    url = content.split(",")[0]
    title = content.split(",")[1]
    credit_by = content.split(",")[2]
    created_date = content.split(",")[3]
    categories = content.split(",")[4]
    
    query = f"SELECT * FROM content WHERE url = ('{url}')"
    exist_url = curs.execute(query)

    ## DB에 없는 url이면 insert
    if not exist_url:
        content_insert_sql = """insert into content (url, title, writer, credit_by, created_date) values (%s, %s, %s, %s, %s)"""
        curs.execute(content_insert_sql, (url, title, credit_by, credit_by, created_date))
        print("inserted")

        # 모델 불러주기 (Keyword Extract)

    
conn.commit()
conn.close()
