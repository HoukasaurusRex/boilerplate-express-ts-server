DB_USER="postgres"
DB_PASSWORD="password"
DB_NAME="test"
DB_HOSTNAME="localhost"
DB_PORT=5432
DB_DIALECT="postgres"

docker pull postgres
mkdir -p $HOME/docker/volumes/postgres
docker run --rm --name pg-docker \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_USER=$DB_USER \
  -e POSTGRES_DB=$DB_NAME \
  -d \
  -p 5432:5432 \
  -v $HOME/docker/volumes/postgres:/var/lib/postgresql/data \
  postgres

# docker logs pg-docker # if there's an error
#docker exec -it <container_id> psql -U <user> -d <database>
