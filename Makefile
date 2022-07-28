SHELL:=/bin/bash 
.PHONY: pg-sqlcheck

include .env
export $(shell sed 's/=.*//' .env)

dev-server:
	npm run dev -- 

foo:
	[$(docker ps | grep -q coffee-rater-postgresss)] && echo "did find" || echo "not found "

pg-sql-check:
	# [[ docker ps | grep -q coffee-rater-postgres ]] && docker run --name coffee-rater-postgres --rm -e POSTGRES_PASSWORD=mysecretpassword -d postgres
	# [[ $(docker ps | grep -q coffee-rater-postgresxx) -ne 0 ]] && echo hey
	docker cp ./setup.sql coffee-rater-postgres:setup.sql
	docker exec -it coffee-rater-postgres dropdb -U postgres postgres
	docker exec -it coffee-rater-postgres createdb -U postgres postgres
	docker exec -it coffee-rater-postgres psql -U postgres -d postgres -f setup.sql

src/types.ts:
	echo "creating types file in 'types/supabase.ts'..."
	npx openapi-typescript $$SUPABASE_PROJECT_URL/rest/v1/?apikey=$$SUPABASE_ANON_KEY --output src/types.ts

pg-cli:
	# \d for tables, 
	docker exec -it coffee-rater-postgres psql -U postgres

fmt:
	prettier -w --tab-width 4 src
