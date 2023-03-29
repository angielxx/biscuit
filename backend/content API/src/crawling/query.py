import category
import config


# def insert_category():
#     conn = config.connection()
#     curs = conn.cursor()

#     baseUrl = "https://github.com"
#     startUrl = "/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps"
#     categoryDic = category.bfs(baseUrl, startUrl)

#     main_code = 10
#     for key in categoryDic.keys():
#         for value in categoryDic[key]:
#             main_name = str(key)
#             sub_code, *sub_name = value.split("-")
#             if not sub_code.isdigit():
#                 continue
#             sub_name = " ".join(sub_name)
#             code = int(str(main_code) + sub_code)

#             main_name = main_name.replace("-", " ")

#             if ".md" in sub_name:
#                 continue
#             sub_name = sub_name.replace("ci cd", "ci/cd")

#             print("code:", code, "/ main_name:", main_name, "/ sub_name:", sub_name)
#             sql = "insert into category (code, main_name, sub_name) values (%s, %s, %s)"
#             curs.execute(sql, (code, main_name, sub_name))
#         print("=====================================")
#         main_code += 1
#     conn.commit()  # db의 변화 저장

#     config.close(conn)


def insert_channel():
    conn = config.connect()
    curs = conn.cursor()

    sql = """select channel, url from content group by channel"""
    curs.execute(sql)
    channel_info = curs.fetchall()

    for channel, url in channel_info:
        urls = url.split("/")[2:4]
        if urls[0] == "medium.com":
            related = urls[1].split(".")
        else:
            related = urls[0].split(".")

        stopwords = set(
            [
                "com",
                "co",
                "kr",
                "dev",
                "blog",
                "github",
                "io",
                "techblog",
                "tech",
                "team",
                "net",
                "helloworld",
                "engineering",
                "tistory",
            ]
        )
        for word in related:
            if word in stopwords:
                continue
            # print(channel, word)
            channel_insert_sql = "insert into channel (name, related) values (%s, %s)"
            curs.execute(channel_insert_sql, (channel, word))

    conn.commit()  # db의 변화 저장

    config.close(conn)
