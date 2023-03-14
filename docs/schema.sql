\encoding UTF8

DROP TABLE IF EXISTS email;
DROP TABLE IF EXISTS emailUser;
DROP TABLE IF EXISTS userAccount;

CREATE TABLE email (
  id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL,
  recipient TEXT NOT NULL,
  sender TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL
);

CREATE TABLE emailUser (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE userAccount (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  password TEXT NOT NULL
);
INSERT INTO email (user_id, recipient, sender, subject, message)
  VALUES
  (1, 'Bob Joe', 'Jerry Go', 'This is the subject', 'This is the message')
