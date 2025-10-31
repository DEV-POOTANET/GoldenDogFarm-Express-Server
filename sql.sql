CREATE TABLE users
(
    user_ID       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_Email    VARCHAR(60)  NOT NULL UNIQUE,
    user_Password VARCHAR(100) NOT NULL,
    user_Name     VARCHAR(50)  NOT NULL,
    user_Phone    VARCHAR(10),
    user_Role     VARCHAR(1)   NOT NULL DEFAULT 'S' CHECK (user_Role IN ('S', 'A')),
    user_Status   VARCHAR(1)   NOT NULL DEFAULT '1' CHECK (user_Status IN ('1', '2'))
);

CREATE TABLE dogs_color
(
    color_ID     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    color_Name   VARCHAR(50) NOT NULL,
    color_Status VARCHAR(1)  NOT NULL CHECK (color_Status IN ('1', '2'))
);



CREATE TABLE position
(
    position_ID     INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    position_Name   VARCHAR(50) NOT NULL,
    position_Status VARCHAR(1)  NOT NULL CHECK (position_Status IN ('1', '2'))
);


CREATE TABLE clinic (
    clinic_ID       INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    clinic_Name     VARCHAR(100) NOT NULL,
    clinic_Address  TEXT,
    clinic_Phone    VARCHAR(15),
    clinic_Status   VARCHAR(1) NOT NULL CHECK (clinic_Status IN ('1', '2'))
);


CREATE TABLE vet (
     vet_ID         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     vet_Name       VARCHAR(100) NOT NULL,
     vet_Phone      VARCHAR(15),
     vet_Clinic_ID  INT UNSIGNED,
     vet_Status     VARCHAR(1) NOT NULL CHECK (vet_Status IN ('1', '2')),

     FOREIGN KEY (vet_Clinic_ID) REFERENCES clinic(clinic_ID)
);


CREATE TABLE vaccine_list (
     vaccine_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
     vaccine_Name VARCHAR(100) NOT NULL,
     vaccine_Description TEXT,
     vaccine_Status VARCHAR(1) NOT NULL CHECK (vaccine_Status IN ('1', '2'))
);

CREATE TABLE health_check_list (
   hCL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   hCL_Name VARCHAR(100) NOT NULL,
   hCL_Description TEXT,
   hCL_Status VARCHAR(1) NOT NULL CHECK (hCL_Status IN ('1', '2'))
);

CREATE TABLE treatment_list (
    tL_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tL_Name VARCHAR(100) NOT NULL,
    tL_Description TEXT,
    tL_Status VARCHAR(1) NOT NULL CHECK (tL_Status IN ('1', '2'))
);




CREATE TABLE Customers
(
    cus_ID        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cus_Name      VARCHAR(50)  NOT NULL,
    cus_Phone     VARCHAR(10)  NOT NULL,
    cus_Email     VARCHAR(100),
    cus_Facebook  VARCHAR(255),
    cus_Line      VARCHAR(255),
    cus_Status    VARCHAR(1)   NOT NULL DEFAULT '1' CHECK (cus_Status IN ('1','2'))
);



CREATE TABLE Dogs (
      dog_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      dog_Microchip VARCHAR(100),
      dog_RegNo VARCHAR(20),
      dog_Name VARCHAR(50) NOT NULL,
      dog_CallName VARCHAR(50),
      dog_Birthday DATE,
      dog_PedigreePDF VARCHAR(50),
      dog_Status VARCHAR(1) NOT NULL CHECK (dog_Status IN ('1','2','3','4','5','6')),
      dog_StatusBreeding VARCHAR(1) NOT NULL CHECK (dog_StatusBreeding IN ('1','2','3','4','5')),
      dog_StatusSale VARCHAR(1) NOT NULL CHECK (dog_StatusSale IN ('1','2','3','4')),
      dog_StatusDel VARCHAR(1) NOT NULL CHECK (dog_StatusDel IN ('1','2')),
      dog_Owner VARCHAR(100),
      dog_Breeder VARCHAR(100),
      dog_Gender VARCHAR(1) NOT NULL CHECK (dog_Gender IN ('M','F')),
      dog_K9Url VARCHAR(255),
      dog_Price DECIMAL(15,2) NOT NULL,
      color_ID INT UNSIGNED NOT NULL,
      dog_Dad INT UNSIGNED,
      dog_Mom INT UNSIGNED,
      breeding_ID INT UNSIGNED,

-- กำหนดความสัมพันธ์กับตัวเอง (พ่อ-แม่)
      CONSTRAINT fk_dog_dad FOREIGN KEY (dog_Dad) REFERENCES Dogs(dog_ID) ON DELETE SET NULL,
      CONSTRAINT fk_dog_mom FOREIGN KEY (dog_Mom) REFERENCES Dogs(dog_ID) ON DELETE SET NULL
);


ALTER TABLE Dogs
    ADD CONSTRAINT fk_dog_color
        FOREIGN KEY (color_ID) REFERENCES dogs_color(color_ID)
            ON DELETE RESTRICT
            ON UPDATE CASCADE;

-- ตารางรูปสุนัข
CREATE TABLE Dog_Images (
        img_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        dog_ID INT UNSIGNED NOT NULL,
        img_URL VARCHAR(255) NOT NULL,
        img_Type VARCHAR(1) NOT NULL CHECK (img_Type IN ('1','2','3')),
        img_Status VARCHAR(1) NOT NULL CHECK (img_Status IN ('1','2')),

    -- ความสัมพันธ์กับ Dogs
        CONSTRAINT fk_image_dog FOREIGN KEY (dog_ID) REFERENCES Dogs(dog_ID) ON DELETE CASCADE
);



-- ตารางการผสมพันธุ์
CREATE TABLE Breeding (
      breed_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      mother_ID INT UNSIGNED NOT NULL,
      breed_DueDate DATE,
      breed_ActualBirth DATE,
      breed_Notes TEXT,
      puppy_Count INT,
      breed_Status VARCHAR(1) NOT NULL CHECK (breed_Status IN ('1','2','3','4')),

-- ความสัมพันธ์กับแม่สุนัข
      CONSTRAINT fk_breeding_mother FOREIGN KEY (mother_ID) REFERENCES Dogs(dog_ID) ON DELETE CASCADE
);

-- เพิ่ม constraint ให้ Dogs อ้างอิง Breeding
ALTER TABLE Dogs
    ADD CONSTRAINT fk_dog_breeding FOREIGN KEY (breeding_ID) REFERENCES Breeding(breed_ID) ON DELETE SET NULL;

-- ตารางการพยายามผสมพันธุ์
CREATE TABLE BreedingAttempt (
 attempt_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 breed_ID INT UNSIGNED NOT NULL,
 father_ID INT UNSIGNED NOT NULL,
 attempt_Date DATE NOT NULL,
 attempt_Notes TEXT,
 attempt_TypeBreed VARCHAR(1) NOT NULL CHECK (attempt_TypeBreed IN ('1','2')),
 attempt_Status VARCHAR(1) NOT NULL CHECK (attempt_Status IN ('1','2','3')),

-- ความสัมพันธ์กับการผสมพันธุ์
 CONSTRAINT fk_breedingattempt_breed FOREIGN KEY (breed_ID) REFERENCES Breeding(breed_ID) ON DELETE CASCADE,
-- ความสัมพันธ์กับพ่อสุนัข
 CONSTRAINT fk_breedingattempt_father FOREIGN KEY (father_ID) REFERENCES Dogs(dog_ID) ON DELETE CASCADE
);



CREATE TABLE Dog_Position (
  dp_ID        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dog_ID       INT UNSIGNED NOT NULL,
  position_ID  INT UNSIGNED NOT NULL,
  dp_Year      YEAR NOT NULL,
  dp_Status    VARCHAR(1) NOT NULL CHECK (dp_Status IN ('1','2')),

  CONSTRAINT fk_dp_dog FOREIGN KEY (dog_ID) REFERENCES Dogs(dog_ID) ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `fk_dp_position` FOREIGN KEY (`position_ID`) REFERENCES `position` (`position_ID`) ON DELETE CASCADE ON UPDATE CASCADE
);




CREATE TABLE vaccination_records (
 vR_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 vaccine_ID INT UNSIGNED NOT NULL,
 dog_ID INT UNSIGNED NOT NULL,
 user_ID INT UNSIGNED NOT NULL,
 vR_Status VARCHAR(1) NOT NULL CHECK (vR_Status IN ('1', '2', '3', '4')),
 FOREIGN KEY (vaccine_ID) REFERENCES vaccine_list(vaccine_ID),
 FOREIGN KEY (dog_ID) REFERENCES dogs(dog_ID),
 FOREIGN KEY (user_ID) REFERENCES users(user_ID)
);

CREATE TABLE dose_schedules (
    dS_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    vR_ID INT UNSIGNED NOT NULL,
    vet_ID INT UNSIGNED,
    dS_Number INT NOT NULL,
    dS_ScheduledDate DATE NOT NULL,
    dS_ActualDate DATE,
    dS_Notes TEXT,
    dS_Status VARCHAR(1) NOT NULL CHECK (dS_Status IN ('1', '2', '3', '4')),
    FOREIGN KEY (vR_ID) REFERENCES vaccination_records(vR_ID),
    FOREIGN KEY (vet_ID) REFERENCES vet(vet_ID)
);




CREATE TABLE DogHealthCheck (
    dHC_ID INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    dog_ID INT UNSIGNED NOT NULL,
    hCL_ID INT UNSIGNED NOT NULL,
    vet_ID INT UNSIGNED NOT NULL,
    dHC_ScheduledDate DATE NOT NULL,
    dHC_ActualDate DATE NULL,
    dHC_Notes TEXT NULL,
    dHC_Status VARCHAR(1) NOT NULL CHECK (dHC_Status IN ('1','2','3','4')),
    dHC_Result VARCHAR(1) NOT NULL CHECK (dHC_Result IN ('1','2','3')),

    FOREIGN KEY (dog_ID) REFERENCES Dogs(dog_ID),
    FOREIGN KEY (hCL_ID) REFERENCES health_check_list(hCL_ID),
    FOREIGN KEY (vet_ID) REFERENCES vet(vet_ID)
);


CREATE TABLE TreatmentRecords (
  tR_ID INT  UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tL_ID INT UNSIGNED NOT NULL,
  dog_ID INT UNSIGNED NOT NULL,
  vet_ID INT UNSIGNED NOT NULL,
  user_ID INT UNSIGNED NOT NULL,
  tR_Status VARCHAR(1) NOT NULL CHECK (tR_Status IN ('1','2','3','4')),
  tR_StartDate DATE NOT NULL,
  tR_EndDate DATE,

  FOREIGN KEY (tL_ID) REFERENCES TreatmentList(tL_ID),
  FOREIGN KEY (dog_ID) REFERENCES Dogs(dog_ID),
  FOREIGN KEY (vet_ID) REFERENCES Vet(vet_ID),
  FOREIGN KEY (user_ID) REFERENCES User(user_ID)

);







INSERT INTO users
(user_Email,
 user_Password,
 user_Name,
 user_Phone,
 user_Role,
 user_Status)
VALUES ('admin@gmail.com',
        '$2b$10$VzluZhAys0/1tDvJ5Bo7T.6NHKjbUgkrFB6w6W0eikWToYLIYYp96',
        'Pootanet Rampuey',
        '0123456789',
        'A',
        '1');


INSERT INTO `users` (`user_ID`, `user_Email`, `user_Password`, `user_Name`, `user_Phone`, `user_Role`, `user_Status`)
VALUES (1, 'admin@gmail.com', '$2b$10$VzluZhAys0/1tDvJ5Bo7T.6NHKjbUgkrFB6w6W0eikWToYLIYYp96', 'Pootanet Rampuey',
        '0123456789', 'A', '1'),
       (2, 'test@example.com', '$2b$10$VzluZhAys0/1tDvJ5Bo7T.6NHKjbUgkrFB6w6W0eikWToYLIYYp96', 'นายเทส ทดสอบ',
        '0812345678', 'S', '1'),
       (3, 'hatsanai1@gmail.com', '$2b$10$w1jfVPjBAueDt.iAZtLUAudVn.qpYY1mkxhxBEJTowkHDsc85Ok3m', 'นายหัสนัย หม้อยา1',
        '0612161314', 'A', '1');


///// reset data in table

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE dog_images;
TRUNCATE TABLE dogs;
SET FOREIGN_KEY_CHECKS = 1;