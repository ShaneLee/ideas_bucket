const mysql = require('mysql')
require('dotenv').config()

const getDBConnection = (database) => {
  return mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: database
  })
}

const con = getDBConnection('idea_bucket')

const db = module.exports = {}

db.getIdeas = () => {
  const queryString = 'SELECT * FROM ideas'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /get_ideas: ' + err)
      return []
    }
    console.log('Getting data from database for /get_ideas')
    return rows
  })
}

db.getCategories = () => {
  const queryString = 'SELECT * FROM categories'
  con.query(queryString, (err, rows, fields) => {
    if (err) {
      console.log('Failed to query for /: ' + err)
    }
    console.log('Getting data from database for /')
    return rows
  })
}

db.submitIdea = (idea, category) => {
  queryString = 'INSERT INTO ideas (idea, category) VALUES (?, ?)'
  con.query(queryString, [idea, category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit idea. ' + err)
      return
    }
    const result ='Logged new idea ' + results
    console.log(result)
    return result
  })
}

db.submitCategory = (category) => {
  queryString = 'INSERT INTO categories (category) VALUES (?)'
  con.query(queryString, [category], (err, results, field) => {
    if (err) {
      console.log('Failed to submit category. ' + err)
      return
    }
    console.log('Logged new category ' + results)
  })
}

db.deleteIdea = (id) => {
  queryString = 'DELETE from ideas WHERE ideas_id = ?'
  con.query(queryString, [id], (err, results, field) => {
    if (err) {
      console.log('Failed to delete idea ' + err)
      return
    }
    console.log('Deleted idea' + results)
  })
  
}