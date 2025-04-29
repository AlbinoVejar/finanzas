DROP TABLE IF EXISTS accounts;
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(50) NOT NULL, 
  credit BOOL NOT NULL DEFAULT false,
  limit_amount FLOAT NOT NULL DEFAULT 1000
);
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(60) NOT NULL, 
  email VARCHAR(80) NOT NULL, 
  password TEXT NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
  modified TIMESTAMP, 
  deleted TIMESTAMP
);
DROP TABLE IF EXISTS rel_user_account;
CREATE TABLE IF NOT EXISTS rel_user_account (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  id_user INTEGER NOT NULL, 
  id_account INTEGER NOT NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
  modified TIMESTAMP, 
  deleted TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users (id), 
  FOREIGN KEY (id_account) REFERENCES accounts (id)
);
DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name VARCHAR(50) NOT NULL
);
DROP TABLE IF EXISTS expenses;
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  description VARCHAR(120) NOT NULL, 
  amount FLOAT NOT NULL DEFAULT 0,
  date_expense DATE
);
DROP TABLE IF EXISTS rel_user_category;
CREATE TABLE IF NOT EXISTS rel_user_category (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  id_category INTEGER NOT NULL, 
  id_user INTEGER NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
  modified TIMESTAMP, 
  deleted TIMESTAMP, 
  FOREIGN KEY (id_category) REFERENCES categories (id), 
  FOREIGN KEY (id_user) REFERENCES users (id)
);
DROP TABLE IF EXISTS rel_expense;
CREATE TABLE IF NOT EXISTS rel_expense (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  id_expense INTEGER NOT NULL, 
  id_rel_category INTEGER NOT NULL, 
  id_rel_account INTEGER NULL, 
  id_user INTEGER NULL, 
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
  modified TIMESTAMP, 
  deleted TIMESTAMP, 
  FOREIGN KEY (id_rel_category) REFERENCES rel_user_category (id), 
  FOREIGN KEY (id_expense) REFERENCES expenses (id), 
  FOREIGN KEY (id_rel_account) REFERENCES rel_user_account (id),
  FOREIGN KEY (id_user) REFERENCES users (id)
);

DELIMITER // 

DROP PROCEDURE IF EXISTS login_user //
CREATE PROCEDURE login_user (
  _email VARCHAR(80)
) BEGIN 
  SELECT 
    * 
  FROM 
    users 
  WHERE 
    email LIKE _email
    AND 
    deleted = '0000-00-00 00:00:00';
END //

DROP PROCEDURE IF EXISTS get_user //
CREATE PROCEDURE get_user (_id_user integer) 
BEGIN 
  SELECT 
    * 
  FROM 
    users 
  WHERE 
    id_user = _id_user;
END //


DROP PROCEDURE IF EXISTS create_user //
CREATE PROCEDURE create_user(
  _name VARCHAR(60), 
  _email VARCHAR(80), 
  _password TEXT
) BEGIN 
SET 
  @user_id = 0;
INSERT INTO users(name, email, password) 
VALUES 
  (_name, _email, _password);
SELECT 
  LAST_INSERT_ID() INTO @user_id;
INSERT INTO categories (`name`) 
VALUES 
  ('Personales');
INSERT INTO rel_user_category(id_category, id_user) 
VALUES 
  (
    LAST_INSERT_ID(), 
    @user_id
  );
INSERT INTO categories (`name`) 
VALUES 
  ('Bancos');
INSERT INTO rel_user_category(id_category, id_user) 
VALUES 
  (
    LAST_INSERT_ID(), 
    @user_id
  );
INSERT INTO categories (`name`) 
VALUES 
  ('Lujos');
INSERT INTO rel_user_category(id_category, id_user) 
VALUES 
  (
    LAST_INSERT_ID(), 
    @user_id
  );
INSERT INTO accounts(`name`, limit_amount)
VALUES 
  ('Debito', 1000.00);
INSERT INTO rel_user_account(id_user, id_account) 
VALUES 
  (
    @user_id, 
    LAST_INSERT_ID()
  );
END //

DROP PROCEDURE IF EXISTS update_user //
CREATE PROCEDURE update_user(
  _id_user integer, 
  _name VARCHAR(60), 
  _email VARCHAR(80), 
  _password TEXT
) BEGIN 
UPDATE 
  users 
SET 
  name = _name, 
  email = _email, 
  password = _password 
WHERE 
  id_user = _id_user;
END //

DROP PROCEDURE IF EXISTS get_accounts //
CREATE PROCEDURE get_accounts(_id_user integer) 
BEGIN 
SELECT 
  B.id, 
  B.name,
  B.credit,
  B.limit_amount,
  A.created_at
FROM 
  rel_user_account AS A 
  INNER JOIN accounts AS B ON A.id_account = B.id
WHERE 
  A.id_user = _id_user
  AND 
  A.deleted = '0000-00-00 00:00:00';
END //

DROP PROCEDURE IF EXISTS get_total_waste_by_account //
CREATE PROCEDURE get_total_waste_by_account(
    IN _id_user integer,
    IN _id_account integer,
    IN _init_date date,
    IN _end_date date
)
BEGIN 
IF _id_account = 0 THEN
    SET _id_account = null;
END IF;
SELECT
  CA.id AS Id_Account,
  C.id AS Id_rel_Account,
  CA.name AS Account,
  CA.credit AS Credit,
  CA.limit_amount AS Limit_amount,
  IFNULL(SUM(B.amount), 0) AS Total,
  C.created_at AS Create_at
FROM accounts AS CA
INNER JOIN users AS U
    ON U.id = _id_user
INNER JOIN rel_user_account AS C
    ON CA.id = C.id_account
    AND U.id = C.id_user
    AND C.deleted = '0000-00-00 00:00:00'
LEFT JOIN rel_expense  AS A
    ON A.id_rel_account = C.id
    AND A.id_user = U.id
    AND A.deleted = '0000-00-00 00:00:00'
LEFT JOIN expenses AS B
    ON B.id = A.id_expense
    AND CAST(B.date_expense AS Date) BETWEEN _init_date AND _end_date
WHERE
  C.id = _id_account OR _id_account IS NULL
GROUP BY
    CA.id;
END //

DROP PROCEDURE IF EXISTS create_account //
CREATE PROCEDURE create_account(
  _name VARCHAR(50), 
  _is_credit bool, 
  _id_user integer,
  _limit_amount float
) BEGIN INSERT INTO accounts(name, credit, limit_amount) 
VALUES 
  (_name, _is_credit, _limit_amount) RETURNING id;
INSERT INTO rel_user_account(id_user, id_account) 
VALUES 
  (
    _id_user, 
    LAST_INSERT_ID()
  ) RETURNING id;
END //

DROP PROCEDURE IF EXISTS update_account //
CREATE PROCEDURE update_account(
  _id_account integer, 
  _name VARCHAR(60), 
  _is_credit bool,
  _limit_amount float
) BEGIN 
UPDATE 
  accounts 
SET 
  name = _name, 
  credit = _is_credit,
  limit_amount = _limit_amount
WHERE 
  id = _id_account;
UPDATE
  rel_user_account
SET
  modified = CURRENT_TIMESTAMP()
WHERE
  id_account = _id_account;
END //

DROP PROCEDURE IF EXISTS delete_account //
CREATE PROCEDURE delete_account(
  _id_account integer
) BEGIN 
UPDATE rel_user_account AS A
SET A.deleted = CURRENT_TIMESTAMP()
WHERE A.id_account = _id_account;
END //

DROP PROCEDURE IF EXISTS get_categories //
CREATE PROCEDURE get_categories(
  IN _id_user integer
) 
BEGIN 
SELECT 
  B.id, 
  B.name,
  A.created_at
FROM 
    rel_user_category AS A
INNER JOIN categories AS B 
    ON B.id = A.id_category
WHERE
    A.id_user = _id_user
    AND 
    A.deleted = '0000-00-00 00:00:00';
END //

DROP PROCEDURE IF EXISTS get_categories_by_account //
CREATE PROCEDURE get_categories_by_account(
    IN _id_user integer,
    IN _id_account integer,
    IN _init_date date,
    IN _end_date date
)
BEGIN
SELECT
  A.id_expense AS Id,
  A.id AS Id_rel_Expense,
  CA.name AS Category,
  SUM(B.amount) AS Total,
  CA.id AS Id_Category,
  A.id_rel_category AS Id_rel_Category,
  B.date_expense as Created_at
FROM rel_expense  AS A
INNER JOIN expenses AS B
    ON B.id = A.id_expense
INNER JOIN rel_user_category AS C
    ON C.ID = A.id_rel_category
INNER JOIN categories AS CA
    ON CA.id = C.id_category
INNER JOIN users AS U
    ON U.id = A.id_user
WHERE
    A.deleted = '0000-00-00 00:00:00'
    AND CAST(B.date_expense AS Date) BETWEEN _init_date  AND _end_date
    AND A.id_user = _id_user
    AND A.id_rel_account = _id_account
GROUP BY
    A.id_rel_category;
END //

DROP PROCEDURE IF EXISTS create_category //
CREATE PROCEDURE create_category(
  _id_user integer,
  _name VARCHAR(50)
) BEGIN INSERT INTO categories(name) 
VALUES 
  (_name) RETURNING id;
INSERT INTO rel_user_category(id_user, id_category) 
VALUES 
  (
    _id_user, 
    LAST_INSERT_ID()
  ) RETURNING id;
END //

DROP PROCEDURE IF EXISTS update_category //
CREATE PROCEDURE update_category(
  _id_category integer, 
  _name VARCHAR(50)
) BEGIN 
UPDATE 
  categories
SET 
  name = _name
WHERE 
  id = _id_category;
UPDATE
  rel_user_category
SET
  modified = CURRENT_TIMESTAMP()
WHERE
  id_category = _id_category;
END //

DROP PROCEDURE IF EXISTS delete_category //
CREATE PROCEDURE delete_category(
  _id_category integer
) BEGIN 
UPDATE rel_user_category AS A
SET A.deleted = CURRENT_TIMESTAMP()
WHERE A.id_category = _id_category;
END //

DROP PROCEDURE IF EXISTS create_expense //
CREATE PROCEDURE create_expense(
  _id_user integer,
  _id_rel_account integer,
  _id_rel_category integer, 
  _description TEXT, 
  _amount FLOAT,
  _date_expense TIMESTAMP
) BEGIN 
SET 
  @id_expense = 0;
INSERT INTO expenses(amount, description, date_expense) 
VALUES 
  (_amount, _description, _date_expense) RETURNING id;
SELECT 
  LAST_INSERT_ID() INTO @id_expense;
INSERT INTO rel_expense(
  id_expense, id_rel_category, id_rel_account, id_user
) 
VALUES 
  (
    @id_expense, _id_rel_category, _id_rel_account, _id_user
  ) RETURNING id;
END // 

DROP PROCEDURE IF EXISTS update_expense //
CREATE PROCEDURE update_expense(
  _id_expense integer, 
  _description TEXT, 
  _amount FLOAT,
  _date TIMESTAMP
) BEGIN 
SET
  @id_rel_account = 0, @id_rel_category = 0;
SELECT 
  id_rel_account, id_rel_category INTO @id_rel_account, @id_rel_category
FROM rel_expense
WHERE
  id_expense = _id_expense;
UPDATE 
  expenses 
SET 
  description = _description, 
  amount = _amount,
  date_expense = _date
WHERE 
  id = _id_expense;
UPDATE
  rel_expense
SET
  modified = CURRENT_TIMESTAMP(),
  id_rel_account = @id_rel_account,
  id_rel_category = @id_rel_category
WHERE
  id_expense = _id_expense;
END //

DROP PROCEDURE IF EXISTS delete_expense //
CREATE PROCEDURE delete_expense(
  _id_expense integer, 
  _id_user integer
) BEGIN 
UPDATE 
  rel_expense
SET 
  deleted = CURRENT_TIMESTAMP()
WHERE 
  id = _id_expense
  AND
  id_user = _id_user;
END //

DROP PROCEDURE IF EXISTS get_expenses_by_account //
CREATE PROCEDURE get_expenses_by_account(
    IN _id_user integer,
    IN _id_account integer,
    IN _init_date date,
    IN _end_date date
)
BEGIN
SELECT
  A.id AS Id,
  A.id_expense AS Id_rel_Expense,
  A.id_rel_category AS Id_rel_Category,
  CA.name AS Category,
  A.id_rel_account AS Id_rel_Account,
  UAC.name AS Account,
  B.amount AS Amount,   
  B.description AS Description,
  B.date_expense AS Date_expense
FROM rel_expense  AS A
INNER JOIN expenses AS B
    ON B.id = A.id_expense 
    AND CAST(B.Date_expense AS Date) BETWEEN _init_date AND _end_date
    OR (_id_account = 0 OR A.id_rel_account = _id_account)
INNER JOIN rel_user_category AS C
    ON C.ID = A.id_rel_category AND C.id_user = A.id_user
INNER JOIN categories AS CA
    ON CA.id = C.id_category
INNER JOIN rel_user_account AS UA
    ON UA.id = A.id_rel_account AND UA.id_user = A.id_user
INNER JOIN accounts AS UAC
    ON UAC.id = UA.id_account
INNER JOIN users AS U
    ON U.id = A.id_user AND U.id = _id_user
WHERE
    A.deleted = '0000-00-00 00:00:00'
ORDER BY B.Date_expense DESC, A.id DESC;
END //

-- Initial User
CALL create_user('admin','admin@test.com', '$2a$10$EFH5F/PnlZNOn4ZSJ6g43eBxLt9r3nLtN8LTZwgZSsMGCpJ7Nz5EK');
END //

DELIMITER ;
