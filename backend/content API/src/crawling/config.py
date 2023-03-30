import configparser

import pymysql
import os


def connect():
    ini_path = os.getcwd().split("src")[0] + "\src\config.ini"
    config = configparser.ConfigParser()
    config.read(ini_path, encoding="utf-8")
    print(ini_path)

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
