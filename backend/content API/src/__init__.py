from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask


#-----
#스케줄 실행 코드
def scheduler():
    print("Scheduler is alive!")

schedule = BackgroundScheduler(daemon=True, timezone='Asia/Seoul')
schedule.add_job(scheduler, 'interval', seconds=3)
schedule.start()
#-----


app = Flask(__name__)

@app.route('/keyword', methods=['GET'])
def keyword():
    
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)