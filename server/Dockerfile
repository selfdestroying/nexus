FROM python:3.10-slim
WORKDIR /nexus
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./nexus .
RUN python manage.py collectstatic --noinput
EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "nexus.wsgi:application"]