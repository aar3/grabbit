from lib.managers import BaseManager


class DealManager(BaseManager):
    def create(self, title, value, discount, description, merchant_name, img_url, url):
        instance = self.model(
            title=title,
            value=value,
            discount=discount,
            description=description,
            merchant_name=merchant_name,
            img_url=img_url,
            url=url,
        )

        instance.set_uid()
        return instance.save()
