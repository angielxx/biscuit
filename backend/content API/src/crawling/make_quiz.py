# import config
import os
import openai
import config

OPENAI_API_KEY = "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"
openai.api_key = OPENAI_API_KEY


def make_quiz_api(text):
    model = "gpt-3.5-turbo"
    query = (
        text
        + " please make 5 questions with three multiple choices and an one answer in korean about korean text"
    )
    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": query},
    ]
    response = openai.ChatCompletion.create(model=model, messages=messages)

    answer = response["choices"][0]["message"]["content"]
    print(answer)


def insert_quiz():

    conn = config.connect()
    curs = conn.cursor()

    config.close(conn)


base_path = "../data/content"
os.getcwd()
content_dir_list = os.scandir(base_path)
documents = []
for content_dir in content_dir_list:
    if not content_dir.is_dir():
        continue
    content_list = os.scandir(content_dir)
    for content in content_list:
        if not content.is_file():
            continue
        file = open(content.path, "r", encoding="utf-8")
        text = file.read()
        make_quiz_api(text)
        break
