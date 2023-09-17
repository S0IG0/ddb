from django.db.models.signals import post_migrate
from django.dispatch import receiver

from employee.models import Position


class DefaultPosition(object):
    manager = 'Менеджер'
    developer = 'Разработчик'


positions = [
    value for key, value in DefaultPosition.__dict__.items()
    if not key.startswith("__") and isinstance(value, str)
]


@receiver(post_migrate)
def create_default_position(sender, **kwargs):
    for position in positions:
        if not Position.objects.filter(name=position).exists():
            Position.objects.create(name=position)
