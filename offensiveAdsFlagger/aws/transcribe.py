import uuid
from time import sleep
from typing import Optional

from django.conf import settings

from .s3 import s3_url

class TranscribeClient:
    def __init__(
        self,
        client,
        language_code: str = 'en-US',
        media_format="mp3",
        input_bucket_name: Optional[str] = None,
        output_bucket_name: Optional[str] = None,
    ):
        self.client = client
        self.language_code = language_code
        self.media_format = media_format
        if output_bucket_name is None:
            # default to settings.AWS_S3_BUCKET if none was provided
            self.output_bucket_name = settings.AWS_S3_BUCKET
        else:
            self.output_bucket_name = output_bucket_name

        if input_bucket_name is None:
            # default to settings.AWS_S3_BUCKET if none was provided
            self.input_bucket_name = settings.AWS_S3_BUCKET
        else:
            self.input_bucket_name = input_bucket_name

    def transcribe_file(
        self,
        filename: str,
        input_bucket_name: Optional[str] = None,
        output_bucket_name: Optional[str] = None,
        transciption_job_id: Optional[str] = None,
    ) -> str:
        """Transcribe a file with AWS

        Returns
        -------
        str
            When the transciption job finishes successfully the name of the output file is returned.
        """
        input_bucket_name = input_bucket_name or self.input_bucket_name
        output_bucket_name = output_bucket_name or self.output_bucket_name
        object_url = s3_url(input_bucket_name, filename)

        # If an id isn't provided we generate one
        job_id = transciption_job_id or str(uuid.uuid4())
        output_filename = f"{job_id}.json"

        # Kick off the transciption job
        # See docs on start_transcription_job
        # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/transcribe.html#TranscribeService.Client.start_transcription_job
        response = self.client.start_transcription_job(
            # Unique ID for each job. If we try to start a job with the same
            # name as an existing job then a ConflictException is raised
            TranscriptionJobName=job_id,
            LanguageCode=self.language_code,
            MediaFormat=self.media_format,
            Media={
                'MediaFileUri': object_url
            },
            OutputBucketName=output_bucket_name,
            OutputKey=output_filename,
        )

        # Poll the transciption job until we succeed or fail
        while True:
            status = response["TranscriptionJob"]["TranscriptionJobStatus"]
            if status == "COMPLETED":
                return output_filename
            elif status == "FAILED":
                raise Exception(response["TranscriptionJob"]["FailureReason"])

            # Otherwise the status was QUEUED or IN_PROGRESS
            sleep(settings.SLEEP_SECONDS)

            # See docs on get_transcription_job
            # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/transcribe.html#TranscribeService.Client.get_transcription_job
            response = self.client.get_transcription_job(
                TranscriptionJobName=job_id
            )
