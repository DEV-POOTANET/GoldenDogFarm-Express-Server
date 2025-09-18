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





CREATE TABLE Dog_Position (
  dp_ID        INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  dog_ID       INT UNSIGNED NOT NULL,
  position_ID  INT UNSIGNED NOT NULL,
  dp_Year      YEAR NOT NULL,
  dp_Status    VARCHAR(1) NOT NULL CHECK (dp_Status IN ('1','2')),

  CONSTRAINT fk_dp_dog FOREIGN KEY (dog_ID) REFERENCES Dogs(dog_ID) ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT `fk_dp_position` FOREIGN KEY (`position_ID`) REFERENCES `position` (`position_ID`) ON DELETE CASCADE ON UPDATE CASCADE
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