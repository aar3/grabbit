from django.db import models
from lib.models import BaseModel


class ScraperStats(BaseModel):
    class Meta:
        db_table = "scraper_stats"

    name = models.CharField(max_length=255)
    metadata = models.JSONField(default=dict)
