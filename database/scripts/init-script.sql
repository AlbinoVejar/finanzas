DROP TABLE IF EXISTS accounts;
CREATE TABLE IF NOT EXISTS accounts (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name varchar(50) NOT NULL, 
  credit bool NOT NULL DEFAULT false
);
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  name varchar(60) NOT NULL, 
  email varchar(80) NOT NULL, 
  password text NOT NULL, 
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
  name varchar(50) NOT NULL
);
DROP TABLE IF EXISTS expenses;
CREATE TABLE IF NOT EXISTS expenses (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  description varchar(120) NOT NULL, 
  amount float NOT NULL DEFAULT 0
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
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), 
  modified TIMESTAMP, 
  deleted TIMESTAMP, 
  FOREIGN KEY (id_rel_category) REFERENCES rel_user_category (id), 
  FOREIGN KEY (id_expense) REFERENCES expenses (id), 
  FOREIGN KEY (id_rel_account) REFERENCES rel_user_account (id)
);

DELIMITER // 

DROP PROCEDURE IF EXISTS login_user //
CREATE PROCEDURE login_user (
  _email varchar(80)
) BEGIN 
  SELECT 
    * 
  FROM 
    users 
  WHERE 
    email LIKE _email;
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
  _name varchar(60), 
  _email varchar(80), 
  _password text
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
INSERT INTO accounts(`name`) 
VALUES 
  ('Debito');
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
  _name varchar(60), 
  _email varchar(80), 
  _password text
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
CREATE PROCEDURE get_accounts(_id_user integer) BEGIN 
SELECT 
  A.id, 
  B.name
FROM 
  rel_user_account AS A 
  INNER JOIN accounts AS B ON A.id_account = B.id 
WHERE 
  A.id_user = _id_user;
END //

DROP PROCEDURE IF EXISTS create_account //
CREATE PROCEDURE create_account(
  _name varchar(50), 
  _is_credit bool, 
  _id_user integer
) BEGIN INSERT INTO accounts(name, credit) 
VALUES 
  (_name, _is_credit) RETURNING id;
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
  _name varchar(60), 
  _is_credit bool
) BEGIN 
UPDATE 
  accounts 
SET 
  name = _name, 
  credit = _is_credit 
WHERE 
  id = _id_account;
END //

DROP PROCEDURE IF EXISTS get_categories //
CREATE PROCEDURE get_categories(
  IN _id_user integer
) 
BEGIN 
SELECT 
  A.id, 
  B.name
FROM 
    rel_user_category AS A
INNER JOIN categories AS B 
    ON B.id = A.id_category
WHERE
    A.id_user = _id_user;
END //

DROP PROCEDURE IF EXISTS create_category //
CREATE PROCEDURE create_category(
  _name varchar(50)
) BEGIN INSERT INTO categories(name) 
VALUES 
  (_name) RETURNING id;
END //

DROP PROCEDURE IF EXISTS create_category //
CREATE PROCEDURE create_category(
  _name varchar(50)
) BEGIN INSERT INTO categories(name) 
VALUES 
  (_name) RETURNING id;
END //

DROP PROCEDURE IF EXISTS update_expense //
CREATE PROCEDURE update_expense(
  _id_expense integer, _description text, 
  _amount float
) BEGIN 
UPDATE 
  expenses 
SET 
  description = _description, 
  amount = _amount 
WHERE 
  id_expense = _id_expense;
END //

DROP PROCEDURE IF EXISTS create_expense //
CREATE PROCEDURE create_expense(
  _id_rel_category integer, 
  _description text, 
  _amount float, 
  _id_rel_account integer
) BEGIN 
SET 
  @id_expense = 0;
INSERT INTO expenses(amount, description) 
VALUES 
  (_amount, _description) RETURNING id;
SELECT 
  LAST_INSERT_ID() INTO @id_expense;
INSERT INTO rel_expense(
  id_expense, id_rel_category, id_rel_account
) 
VALUES 
  (
    @id_expense, _id_rel_category, _id_rel_account
  ) RETURNING id;
END // 

DROP PROCEDURE IF EXISTS get_resume_category //
CREATE PROCEDURE get_resume_category(
  _id_user integer
) BEGIN
select 
  id, 
  id_expense, 
  amount, 
  description, 
  id_account, 
  account, 
  credit, 
  id_category, 
  category,
  created_at
from
  (
    select 
      a.id, 
      b.id as id_expense, 
      b.amount as amount, 
      b.description as description, 
      ca.id as id_account, 
      ca.name as account, 
      ca.credit as credit, 
      da.id as id_category, 
      da.name as category, 
      row_number() over (
        partition by a.id_rel_category 
        order by 
          a.created_at desc
      ) as row_number,
      a.created_at
    from 
      rel_expense as a 
      inner join expenses as b on a.id_expense = b.id 
      inner join rel_user_account as c on a.id_rel_account = c.id 
      inner join accounts as ca on c.id_account = ca.id 
      inner join rel_user_category as d on a.id_rel_category = d.id 
      inner join categories as da on d.id_category = da.id 
    where 
      a.deleted is not null
      and c.id_user = _id_user
      and d.id_user = _id_user
  ) as data 
where 
  row_number <= 3;
END //

DROP PROCEDURE IF EXISTS get_details_category //
CREATE PROCEDURE get_details_category(
  IN _id_rel_category integer,
  IN _page_number integer,
  IN _row_per_page integer
) 
BEGIN
DECLARE offset_value INT;
SET offset_value = _row_per_page * (_page_number - 1);
SELECT
  A.id,
  B.id AS Id_expense,
  B.amount AS Amount,
  B.descriptiON AS Description,
  CA.id AS Id_category,
  CA.name AS Category
FROM
  rel_expense AS A
  inner join expenses AS B ON A.id_expense = B.id
  inner join rel_user_category AS C ON A.id_rel_category = C.id
  inner join categories AS CA ON C.id_category = CA.id
WHERE
  A.deleted IS NOT NULL
  AND C.id = _id_rel_category
ORDER BY
  A.created_at DESC
LIMIT
  _row_per_page
OFFSET offset_value;
END //

DROP PROCEDURE IF EXISTS get_totals_account //
CREATE PROCEDURE get_totals_account(
    IN _id_user integer,
    IN _id_account integer,
    IN _init_date date,
    IN _end_date date
)
BEGIN
SELECT
  DA.id AS Id_account,
  DA.name AS Account_name,
  CA.id AS Id_category,
  CA.name AS Category,
  SUM(B.amount) AS Total,
  A.id_rel_category AS Id_rel_category,
  A.id_rel_account AS Id_rel_account
FROM rel_expense  AS A
INNER JOIN expenses AS B
    ON B.id = A.id_expense
INNER JOIN rel_user_category AS C
    ON C.id = A.id_rel_category
INNER JOIN categories AS CA
    ON CA.id = C.id_category
INNER JOIN rel_user_account AS D
    ON D.id = A.id_rel_account
INNER JOIN accounts AS DA
    ON DA.id = D.id_account
WHERE
    CAST(A.created_at AS Date) BETWEEN _init_date  AND _end_date
    AND C.id_user = _id_user
    AND D.id_user = _id_user
    AND DA.id = _id_account
GROUP BY
    A.id_rel_category;
END //

DELIMITER ;
