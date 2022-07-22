# Generated by Django 3.2.5 on 2022-07-22 01:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offensiveAdsFlagger', '0002_auto_20220722_0038'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='examplemodel',
            name='name',
        ),
        migrations.RemoveField(
            model_name='examplemodel',
            name='phone',
        ),
        migrations.AddField(
            model_name='examplemodel',
            name='ad_name',
            field=models.TextField(default='Test'),
        ),
        migrations.AddField(
            model_name='examplemodel',
            name='audio_file_name',
            field=models.TextField(default='test.mp3'),
        ),
        migrations.AddField(
            model_name='examplemodel',
            name='description',
            field=models.TextField(default='Test Description'),
        ),
        migrations.AddField(
            model_name='examplemodel',
            name='status',
            field=models.TextField(default='ACTIVE'),
        ),
        migrations.AddField(
            model_name='examplemodel',
            name='title',
            field=models.TextField(default='Test Title'),
        ),
        migrations.AddField(
            model_name='examplemodel',
            name='transcription',
            field=models.TextField(default='Test Transcription'),
        ),
        migrations.AlterField(
            model_name='examplemodel',
            name='id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
    ]