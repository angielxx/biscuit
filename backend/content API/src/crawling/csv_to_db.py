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
        content_type = "ARTICLE"

        # article data 삽입
        article_insert_sql = """insert ignore into content (source, title, writer, channel, created_date, type) values (%s, %s, %s, %s, %s, %s)"""
        curs.execute(
            article_insert_sql,
            (source, title, channel, channel, created_date, content_type),
        )

        for category in categories.split():

            print("title", title)
            print("channel", channel)
            print("created_date", created_date)
            print("category", category)

            # insert_category_sql = """
            #         insert ignore into category (sub_name) values (%s)
            #     """
            select_content_id_sql = """
                    select id from content where source = %s
                """
            select_category_id_sql = """
                    select id from category where sub_name = %s
                """
            content_category_sql = """
                    insert into content_category (content_id, category_id) values (%s, %s)
                """
            # category_update_sql = """update biscuit.category set content_cnt = content_cnt + 1 where sub_name = %s"""

            # insert category
            # curs.execute(insert_category_sql, (category))

            # insert content_category
            curs.execute(select_content_id_sql, (source))
            content_row = curs.fetchone()
            curs.execute(select_category_id_sql, (category))
            category_row = curs.fetchone()
            if content_row and category_row:
                curs.execute(content_category_sql, (content_row[0], category_row[0]))
                # curs.execute(category_update_sql, (category))

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

        source = row[0]
        title = row[1]
        channel = row[2]
        created_date = datetime.datetime.strptime(row[3], "%Y-%m-%d")
        category_id = row[4]
        content_type = "VIDEO"

        print(
            "title",
            title,
            "channel",
            channel,
            "created_date",
            created_date,
            "category_id",
            category_id,
        )

        # video data 삽입
        video_insert_sql = """insert ignore into content (source, title, writer, channel, created_date, type) values (%s, %s, %s, %s, %s, %s)"""
        curs.execute(
            video_insert_sql,
            (source, title, channel, channel, created_date, content_type),
        )

        # content category 삽입
        content_category_sql = """
                    insert into content_category (content_id, category_id) values ((select id from content where source = %s), %d)
                """
        curs.execute(content_category_sql, (source, category_id))

        conn.commit()

    f.close()
    conn.close()
