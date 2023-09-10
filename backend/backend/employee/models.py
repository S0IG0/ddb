from django.contrib.auth.models import User
from django.db import models


class Position(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f'{self.name}'


class Departament(models.Model):
    name = models.CharField(max_length=100, unique=True)
    address = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f'{self.name}'


class LevelPosition(models.Model):
    name = models.CharField(max_length=100)
    coefficient_salary = models.DecimalField(max_digits=3, decimal_places=2)

    def __str__(self):
        return f'{self.name}'


class Employee(models.Model):
    user: User = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='employees'
    )
    departament = models.ForeignKey(
        Departament,
        on_delete=models.CASCADE,
        related_name='employees'
    )
    position = models.ForeignKey(
        Position,
        on_delete=models.CASCADE,
        related_name='employees'
    )
    level_position = models.ForeignKey(
        LevelPosition,
        on_delete=models.CASCADE
        , related_name='employees'
    )

    def __str__(self):
        return f'{self.user.first_name, self.user.last_name}'
