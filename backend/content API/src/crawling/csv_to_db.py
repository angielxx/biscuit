import configparser
import csv
import datetime

import pymysql

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


f = open("data/crawling_data.csv", "r", encoding="utf-8")

csvReader = csv.reader(f)


for row in csvReader:

    url = row[0]
    title = row[1]
    credit_by = row[2]
    created_date = datetime.datetime.strptime(row[3], "%Y-%m-%d")
    tags = row[4]

    content_insert_sql = """insert into content (url, title, writer, credit_by, created_date) values (%s, %s, %s, %s, %s)"""

    curs.execute(content_insert_sql, (url, title, credit_by, credit_by, created_date))

    for tag in tags.split():
        print("title", title)
        print("credit_by", credit_by)
        print("created_date", created_date)
        print("tag", tag)

        tag_insert_sql = """
                insert ignore into tag (name) values (%s)
            """
        # content_select_sql = """
        #         select id from content where url = %s
        #     """
        # tag_select_sql = """
        #         select id from tag where name = %s
        #     """

        curs.execute(tag_insert_sql, (tag))
        # curs.execute(content_select_sql, (url))
        # content_id, tag_id = None, None
        # content_row = curs.fetchone()
        # print(content_row)
        # if content_row:
        #     content_id = content_row[0]
        #     print("content_id", content_id)
        # curs.execute(tag_select_sql, (tag))
        # tag_row = curs.fetchone()
        # print(tag_row)
        # if tag_row:
        #     tag_id = tag_row[0]
        #     print("tag_id", tag_id)
        # if content_id and tag_id:
        content_tag_sql = """
                insert into content_tag (content_id, tag_id) values ((select id from content where url = %s), (select id from tag where name = %s))
            """
        tag_update_sql = (
            """update biscuit.tag set content_cnt = content_cnt + 1 where name = %s"""
        )
        curs.execute(content_tag_sql, (url, tag))
        curs.execute(tag_update_sql, (tag))

    # db의 변화 저장

    conn.commit()


f.close()

conn.close()
