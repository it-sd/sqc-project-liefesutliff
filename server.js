require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5163

const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const query = async function (sql, params) {
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = await client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  }
  if (client) client.release()
  return results
}

const queryAllEmails = async function () {
  const sql = `SELECT *
    FROM email
    ORDER BY id;`
  const results = await query(sql)
  return { emails: results }
}

module.exports = {
  query,
  queryAllEmails
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', async function (req, res) {
    const emails = await queryAllEmails()
    res.render('pages/index', emails)
  })
  .get('/sent', function (req, res) {
    const ejsData = {

    }
    console.log(ejsData)
    res.render('pages/sent', ejsData)
  })
  .get('/health', async function (req, res) {
    const emails = await queryAllEmails
    if (emails != null) {
      res.status(200).send('healthy')
    } else {
      res.status(500).send('Something failed in the database')
    }
  })
  .get('/about', function (req, res) {
    const ejsData = {

    }
    console.log(ejsData)
    res.render('pages/about', ejsData)
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
