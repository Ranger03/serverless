# Use the official PostgreSQL image from the Docker Hub
FROM postgres:9.6

# Environment variables to set up the database
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=pass
ENV POSTGRES_DB=LeaderBoard

# Copy the initialization script into the container
COPY init.sql /docker-entrypoint-initdb.d/

# Build the Docker Image:
#     From the root of your project directory, build the Docker image:
#           docker build -t my-postgres-db .

#     Run the Docker Container:
#           docker run --name my_postgres_container -p 5432:5432 -d my-postgres-db
# Access the db running in the docker container using the terminal
#       docker exec -it my_postgres_container psql -U user -d LeaderBoard