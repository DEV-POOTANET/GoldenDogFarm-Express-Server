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