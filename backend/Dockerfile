# Use the Python 3.10 image as the base
FROM python:3.10

# Set the working directory
WORKDIR /app

# Set up a virtual environment
RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

# Upgrade pip and install dependencies
COPY requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the project files to the container
COPY . .

# Specify the command to run the application using the virtual environment
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
