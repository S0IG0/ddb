# Generated by Django 4.1.7 on 2023-09-10 13:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='salary',
            field=models.DecimalField(decimal_places=2, default=150000, max_digits=20),
        ),
    ]
