from datetime import date, timedelta
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager

def date_format(created_date):
    today = date.today()

    if created_date == '오늘':
        return today.strftime('%Y-%m-%d')
    
    if created_date.find('일 전') == 1:
        created_date = int(created_date[:1])
        return (today - timedelta(days=created_date)).strftime('%Y-%m-%d')
    
    return created_date

service = Service(ChromeDriverManager().install())
service.start()
options = webdriver.ChromeOptions()
options.add_experimental_option("excludeSwitches", ["enable-logging"])
options.add_experimental_option("detach", True)  # to keep browser open
driver = webdriver.Remote(service.service_url, options=options)
driver.get(url="https://mornit.com/")

# POST 데이터 가져오기
li_tags = driver.find_elements(By.CLASS_NAME, "post-item")

for li in li_tags:
    url = li.find_element(By.TAG_NAME, "a").get_attribute("href")

    title = li.find_element(By.CLASS_NAME, "post-info").find_element(By.CLASS_NAME, "post-title").text
    title = title.replace(',', ' ')
    # host_img = li.find_element(By.CLASS_NAME, "post-info").find_element(By.CLASS_NAME, "post-host").find_element(By.TAG_NAME, "img").get_attribute("src")
    credit_at = li.find_element(By.CLASS_NAME, "post-info").find_element(By.CLASS_NAME, "post-host").find_element(By.TAG_NAME, "img").get_attribute("alt")
    created_date = li.find_element(By.CLASS_NAME, "post-info").find_element(By.CLASS_NAME, "post-category").find_element(By.CLASS_NAME, "date").text
    created_date = date_format(created_date)
    categories = li.find_element(By.CLASS_NAME, "post-info").find_element(By.CLASS_NAME, "post-category").find_element(By.CLASS_NAME, "v-slide-group__content").text.split('\n')[:-1]

    print(url, title, credit_at, created_date, categories)
    