-- appointments

CREATE TABLE IF NOT EXISTS appointment (
  id                  SERIAL PRIMARY KEY,
  name                VARCHAR (255),
  age                 INT,
  sex                 VARCHAR (255),
  height              VARCHAR (255),
  weight              VARCHAR (255),
  hospital_id         VARCHAR (255),
  mri_examination     VARCHAR (255),
  suspected_pathology VARCHAR (255),
  referring_physician VARCHAR (255),
  tel                 VARCHAR (255),
  email               VARCHAR (255),
  address             TEXT,
  start               VARCHAR (255),
  finish              VARCHAR (255)
);
