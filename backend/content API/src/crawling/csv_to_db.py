import csv
import datetime

import config


def insert_article():
    conn = config.connect()

    curs = conn.cursor()

    f = open("data/crawling_data.csv", "r", encoding="utf-8")

    csvReader = csv.reader(f)

    for row in csvReader:
        if len(row) == 0:
            continue
        source = row[0]
        title = row[1]
        channel = row[2]
        created_date = datetime.datetime.strptime(row[3], "%Y-%m-%d")
        categories = row[4]

        # article data 삽입
        article_insert_sql = """insert ignore into content (source, title, writer, channel, created_date, type) values (%s, %s, %s, %s, %s, article)"""
        curs.execute(
            article_insert_sql, (source, title, channel, channel, created_date)
        )

        for category in categories.split():
            print("title", title)
            print("channel", channel)
            print("created_date", created_date)
            print("category", category)

            category_insert_sql = """
                    insert ignore into category (name) values (%s)
                """
            curs.execute(category_insert_sql, (category))

            content_select_sql = """
                    select id from content where source = %s
                """
            curs.execute(content_select_sql, (source))

            category_select_sql = """
                    select id from category where name = %s
                """

            content_id, category_id = None, None
            content_row = curs.fetchone()
            print(content_row)
            if content_row:
                content_id = content_row[0]
                print("content_id", content_id)
            curs.execute(category_select_sql, (category))
            category_row = curs.fetchone()
            print(category_row)
            if category_row:
                category_id = category_row[0]
                print("category_id", category_id)
            if content_id and category_id:
                content_category_sql = """
                        insert into content_category (content_id, category_id) values ((select id from content where source = %s), (select id from category where name = %s))
                    """
                category_update_sql = """update biscuit.category set content_cnt = content_cnt + 1 where name = %s"""
                curs.execute(content_category_sql, (source, category))
                curs.execute(category_update_sql, (category))

        # db의 변화 저장

        conn.commit()

    f.close()

    conn.close()


def insert_video():
    conn = config.connect()

    curs = conn.cursor()

    f = open("data/youtube_to_db.csv", "r", encoding="utf-8")

    csvReader = csv.reader(f)

    for row in csvReader:

        video_id = row[0]
        title = row[1]
        channel = row[2]
        created_date = datetime.datetime.strptime(row[3], "%Y-%m-%d")
        category_id = row[4]

        content_insert_sql = """insert ignore into content (source, title, writer, channel, created_date) values (%s, %s, %s, %s, %s)"""

        curs.execute(
            content_insert_sql, (source, title, channel, channel, created_date)
        )
