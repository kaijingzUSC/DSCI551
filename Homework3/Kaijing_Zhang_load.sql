
use inf551;

CREATE TABLE inspections (
    serial_number VARCHAR(255) NOT NULL,
    activity_date DATE,
    facility_name VARCHAR(255),
    score INT,
    grade VARCHAR(255),
    service_code VARCHAR(255),
    service_description VARCHAR(255),
    employee_id VARCHAR(255),
    facility_address VARCHAR(255),
    facility_city VARCHAR(255),
    facility_id VARCHAR(255),
    facility_state VARCHAR(255),
    facility_zip VARCHAR(255),
    owner_id VARCHAR(255),
    owner_name VARCHAR(255),
    pe_description VARCHAR(255),
    program_element_pe INT,
    program_name VARCHAR(255),
    program_status VARCHAR(255),
    record_id VARCHAR(255),
    PRIMARY KEY (serial_number)
);

LOAD DATA LOCAL INFILE 'inspections.csv' 
INTO TABLE inspections 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;

CREATE TABLE violations (
    serial_number VARCHAR(255), 
    FOREIGN KEY (serial_number) REFERENCES inspections(serial_number),
    activity_date DATE,
    facility_name VARCHAR(255),
    violation_code VARCHAR(255),
    violation_description VARCHAR(255),
    violation_status VARCHAR(255),
    points INT,
    grade VARCHAR(255),
    facility_address VARCHAR(255),
    facility_city VARCHAR(255),
    facility_id VARCHAR(255),
    facility_state VARCHAR(255),
    facility_zip VARCHAR(255),
    employee_id VARCHAR(255),
    owner_id VARCHAR(255),
    owner_name VARCHAR(255),
    pe_description VARCHAR(255),
    program_element_pe INT,
    program_name VARCHAR(255),
    program_status VARCHAR(255),
    record_id VARCHAR(255),
    score INT,
    service_code INT,
    service_description VARCHAR(255),
    row_id VARCHAR(255)
);

LOAD DATA LOCAL INFILE 'violations.csv' 
INTO TABLE violations 
FIELDS TERMINATED BY ',' 
ENCLOSED BY '"' 
LINES TERMINATED BY '\n' 
IGNORE 1 ROWS;




