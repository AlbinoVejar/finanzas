DROP TABLE IF EXISTS accounts;
create TABLE IF NOT EXISTS accounts (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  credit bool NOT NULL DEFAULT false,
  created_at date NOT NULL DEFAULT CURRENT_DATE(),
  modified date,
  deleted date
);
DROP TABLE IF EXISTS users;
create TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  name varchar(60) NOT NULL,
  email varchar (80) NOT NULL,
  password text NOT NULL,
  created_at date NOT NULL DEFAULT CURRENT_DATE(),
  modified date,
  deleted date
);
DROP TABLE IF EXISTS rel_user_account;
CREATE TABLE IF NOT EXISTS rel_user_account (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_user INTEGER NOT NULL,
  id_account INTEGER NOT NULL,
  FOREIGN KEY (id_user) REFERENCES users (id),
  FOREIGN KEY (id_account) REFERENCES accounts (id)
);
DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  created_at date NOT NULL DEFAULT CURRENT_DATE()
);
DROP TABLE IF EXISTS expenses;
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  description varchar(120) NOT NULL,
  amount float NOT NULL DEFAULT 0
);
DROP TABLE IF EXISTS rel_expense;
CREATE TABLE IF NOT EXISTS rel_expense (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_expense INTEGER NOT NULL,
  id_category INTEGER NOT NULL,
  id_rel_account INTEGER NULL,
  created_at date NOT NULL DEFAULT CURRENT_DATE(),
  modified date,
  deleted date,
  FOREIGN KEY (id_category) REFERENCES categories (id),
  FOREIGN KEY (id_expense) REFERENCES expenses (id),
  FOREIGN KEY (id_rel_account) REFERENCES rel_user_account (id)
);


DELIMITER //
CREATE PROCEDURE login_user(
  _email varchar(80)
)
BEGIN
	SELECT * FROM users WHERE email like _email;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_user(
  _id_user integer
)
BEGIN
	SELECT * FROM users WHERE id_user = _id_user;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_user(
  _name varchar(60),
  _email varchar(80),
  _password text
)
BEGIN
	INSERT INTO users(name, email, password)
    VALUES(_name, _email, _password) RETURNING id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_user(
  _id_user integer,
  _name varchar(60),
  _email varchar(80),
  _password text
)
BEGIN
	UPDATE users
    SET 
    	name = _name,
        email = _email,
        password = _password
    WHERE
    	id_user = _id_user;
END;
//
DELIMITER ;
DELIMITER //
CREATE PROCEDURE get_accounts(
  _id_user integer
)
BEGIN
	SELECT B.id, B.name, B.created_at 
    FROM rel_user_account AS A 
    inner JOIN accounts AS B 
    	ON A.id_account = B.id 
    WHERE A.id_user = _id_user;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_account(
  _name varchar(50),
  _is_credit bool
)
BEGIN
	INSERT INTO accounts(name, credit)
    VALUES(_name, _is_credit) RETURNING id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_account(
  _id_account integer,
  _name varchar(60),
  _is_credit bool
)
BEGIN
	UPDATE accounts
    SET 
    	name = _name,
        credit = _is_credit
    WHERE
    	id = _id_account;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_categories()
BEGIN
	SELECT id, name, created_at
    FROM categories;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_category(
  _name varchar(50)
)
BEGIN
	INSERT INTO categories(name)
    VALUES(_name) RETURNING id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE update_expense(
  _id_expense integer,
  _description text,
  _amount float
)
BEGIN
   UPDATE expenses
   SET
   	  description = _description,
      amount = _amount
   WHERE
      id_expense = _id_expense;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE create_expense(
  _id_category integer,
  _description text,
  _amount float,
  _id_user_account integer
)
BEGIN
    SET @id_expense = 0;
    INSERT INTO expenses(amount,description) VALUES(_amount, _description) RETURNING id;
    SELECT LAST_INSERT_ID() INTO @id_expense;
    
    INSERT INTO rel_expense(id_expense, id_category, id_rel_account)
    VALUES(
        @id_expense,
        _id_category,
        _id_user_account
    ) RETURNING id;
END;
//
DELIMITER ;