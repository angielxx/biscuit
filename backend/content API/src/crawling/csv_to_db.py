import configparser
import csv
import datetime

import pymysql

config = configparser.ConfigParser()
config.read("src/config.ini")

conn = pymysql.connect(
    host=config["DB"]["HOST"],
    user=config["DB"]["USER"],
    password=config["DB"]["PASSWORD"],
    db=config["DB"]["DATABASE"],
    charset="utf8",
)

curs = conn.cursor()

conn.commit()


f = open("crawling_data.csv", "r")

csvReader = csv.reader(f)


for row in csvReader:

    url = row[0]
    title = row[1]
    credit_by = row[2]
    created_date = datetime.datetime.strptime(row[3], "%Y-%m-%d")
    tags = row[4]

    for tag in tags.split():
        print("title", title)
        print("credit_by", credit_by)
        print("created_date", created_date)
        print("tag", tag)

        sql = """insert into mat (url, title, credit_by, created_date, tag) values (%s, %s, %s, %s, %s)"""

        curs.execute(sql, (url, title, credit_by, created_date, tag))


# db의 변화 저장

conn.commit()


f.close()

conn.close()
