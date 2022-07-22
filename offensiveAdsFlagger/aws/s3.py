import io
import json
from typing import Dict, Any, Optional
from transformers import pipeline

from django.conf import settings


class S3Client:
    """S3 client class that abstracts the interactions with AWS S3"""

    def __init__(self, clinet, bucket_name: Optional[str] = None):
        self.client = clinet
        if bucket_name is None:
            # default to settings.AWS_S3_BUCKET if none was provided
            self.bucket_name = settings.AWS_S3_BUCKET
        else:
            self.bucket_name = bucket_name

    def upload_file(self, filename: str, content: io.BytesIO, bucket_name: Optional[str] = None):
        """upload a file to s3"""
        bucket_name = bucket_name or self.bucket_name

        self.client.upload_fileobj(
            Fileobj=content,
            Bucket=bucket_name,
            Key=filename,
        )

    def download_file(self, filename: str, bucket_name: Optional[str] = None) -> io.BytesIO:
        """download a file from s3"""
        bucket_name = bucket_name or self.bucket_name

        buffer = io.BytesIO()
        self.client.download_fileobj(
            Bucket=bucket_name,
            Key=filename,
            Fileobj=buffer,
        )
        buffer.seek(0)
        return buffer

    def download_transcription_job(self, filename: str, bucket_name: Optional[str] = None) -> Dict[str, Any]:
        """Download a transciption from an AWS bucket.

        Transciptions are assumed to be formatted as JSON
        """
        # Transforms the data so that it's in the format defined here:
        # https://unified-slack.slack.com/archives/C03LPCF0FT2/p1658439058408359
        buffer = io.TextIOWrapper(self.download_file(filename, bucket_name))
        buffer = json.loads(buffer.read())
        transcript = buffer['results']['transcripts'][0]['transcript']
        result = {'transcript': transcript}
        cc = []
        for token in buffer['results']['items']:
            if token['type'] == 'pronunciation':
                cc.append({
                    'text': token['alternatives'][0]['content'],
                    'start': float(token['start_time']),
                    'end': float(token['end_time'])
                })
        result['cc'] = cc
        return result

    @staticmethod
    def forage_for_food(transcript):
        classifier = pipeline("zero-shot-classification")
        score = classifier(transcript, ['food'])
        return(score['scores'][0])


def s3_url(bucket_name: str, filename: str) -> str:
    """return the S3 URL"""
    return f"https://s3.amazon.com/{bucket_name}/{filename}"
