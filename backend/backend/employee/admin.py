from django.contrib import admin

from employee.models import (
    Employee,
    Departament,
    LevelPosition,
    Position
)

# Register your models here.
models = [
    Employee,
    Departament,
    LevelPosition,
    Position
]

for model in models:
    admin.site.register(model)