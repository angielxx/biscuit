from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy import create_engine
from flask import Flask, current_app


#-----
#스케줄 실행 코드
def scheduler():
    print("Scheduler is alive!")

schedule = BackgroundScheduler(daemon=True, timezone='Asia/Seoul')
schedule.add_job(scheduler, 'interval', seconds=3)
schedule.start()
#-----

def create_app(test_config = None):
    app = Flask(__name__)
	
    # unit-test를 실행할 때 테스트 데이터 베이스에 대한 정보를 넣어준다.
    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)
	
    # 데이터 베이스와 연동해준다.
    database = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
    app.database = database

    @app.route('/keyword', methods=['GET'])
    def keyword():
        
        return 'Hello, World!'
    
    return app

# FLASK_APP=__init__.py FLASK_DEBUG=1 flask run
if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)