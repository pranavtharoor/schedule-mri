# Schedule MRI
A tool used to reduce a patients waiting time for MRI scans. When an MRI scan is scheduled the time
window given for each MRI is determined by the time taken for the normal sequence timing. This time
provided for each scan to run usually varies due to the extra sequence taken which leads to delay in
other schedule cases. This further involves in increased patient waiting time. Schedule MRI provides
a web interface for the scheduling of patients' scans. It shows the MRI schedule of the day, week or
month and allows for easy alteration of the schedule.

## Built with
- Node
- Postgres
- React
- Redis

## Installation
To configure the api, copy `api/.env.example` to `api/.env` and modify the variables.
From the project root follow this to set up the database and run the project:
```
# setup database
createdb mri
psql -d mri -f db/sql-scripts/01_build.sql

# installs dependencies
npm install
```
For development run:
```
npm start
```
For production run:
```
npm run build
```

## Installation (Docker)
From the project root follow this to run the project with docker:
```
docker-compose up
```
