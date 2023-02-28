\encoding UTF8

DROP TABLE IF EXISTS email;
DROP TABLE IF EXISTS emailUser;

CREATE TABLE email (
  id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL,
  recipient TEXT NOT NULL,
  sender TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  star boolean
);

CREATE TABLE emailUser (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

INSERT INTO email (user_id, recipient, sender, subject, message)
  VALUES
  (1, 'Bob Joe', 'Jerry Go', 'This is the subject', 'This is the message')