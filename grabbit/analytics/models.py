from django.db import models
from lib.models import BaseModel


class ScraperStats(BaseModel):
    class Meta:
        db_table = "scraper_stats"

    metadata = models.JSONField(default=dict)
