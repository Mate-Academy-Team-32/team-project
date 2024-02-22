import os

from celery import Celery


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PerfuMe_API.settings")
BROKER_URL = "redis://localhost:6379/0"

app = Celery("PerfuMe_API")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()


@app.task(bind=True, ignore_result=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
