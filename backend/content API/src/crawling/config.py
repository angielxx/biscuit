import configparser

import pymysql


def connect():
    config = configparser.ConfigParser()
    config.read("src/config.ini", encoding="utf-8")

    conn = pymysql.connect(
        host=config["DB"]["HOST"],
        user=config["DB"]["USER"],
        password=config["DB"]["PASSWORD"],
        db=config["DB"]["DATABASE"],
        charset="utf8",
    )

    return conn


def close(conn):
    conn.close()
