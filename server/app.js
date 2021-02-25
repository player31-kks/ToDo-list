const express = require('express')
const http = require('http')
const router = require('./router')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require("dotenv").config()


export class App extends http.Server {
  constructor() {
    this.app = express()
    this.setDB()
    this.setMiddleWare()
    this.setRouter()
    this.setPageErrorHandler()
    this.setErrorHandler()
  }

  setDB = async () => {
    const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mogodbstudy.tqsgd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true })
    console.log("mongodb is connected")
  }

  setMiddelWare() {
    this.app.use(morgan('dev'));
    this.app.use(express.static(path.join(__dirname, 'view/css')));
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
    this.app.use(session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }));
    this.app.use(passport.initialize())
    this.app.use(passport.session())
  }

  setRouter() {
    this.app.use(router)
  }

  setPageErrorHandler() {
    this.app.use((req, res, next) => {
      res.status(400).send("page is not founded")
    })
  }

  setErrorHandler() {
    this.app.use((err, req, res, next) => {
      res.status(500).send("server has internal error")
    })
  }
}