import configparser
import pymysql

import category


def insert_category():
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

    baseUrl = "https://github.com"
    startUrl = "/kamranahmedse/developer-roadmap/tree/master/src/data/roadmaps"
    categoryDic = category.bfs(baseUrl, startUrl)

    main_code = 10
    for key in categoryDic.keys():
        for value in categoryDic[key]:
            main_name = str(key)
            sub_code, *sub_name = value.split("-")
            if not sub_code.isdigit():
                continue
            sub_name = " ".join(sub_name)
            code = int(str(main_code) + sub_code)

            main_name = main_name.replace("-", " ")

            if ".md" in sub_name:
                continue
            sub_name = sub_name.replace("ci cd", "ci/cd")

            print("code:", code, "/ main_name:", main_name, "/ sub_name:", sub_name)
            sql = "insert into category (code, main_name, sub_name) values (%s, %s, %s)"
            curs.execute(sql, (code, main_name, sub_name))
        print("=====================================")
        main_code += 1
    conn.commit()  # db의 변화 저장

    conn.close()
