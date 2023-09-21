CREATE USER task_management WITH PASSWORD 'task_management' CREATEDB;
CREATE DATABASE task_management
    WITH
    OWNER = task_management
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;