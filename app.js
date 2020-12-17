const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
// const user = require('./routes/user')
const student = require('./routes/student')


const mongoose = require('mongoose')
const dbconfig = require('./db/config')
mongoose.connect(dbconfig.dbs, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongoose 连接成功')
});

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const teacher = require('./routes/teacher')
const classs = require('./routes/classs')
const academy = require('./routes/academy')
const school = require('./routes/school')
const projectt = require('./routes/projectt')
const studentt = require('./routes/studentt')
// routes
app.use(index.routes(), index.allowedMethods())
// app.use(user.routes(), user.allowedMethods())
app.use(student.routes(), student.allowedMethods())
app.use(teacher.routes(), teacher.allowedMethods())
app.use(classs.routes(), classs.allowedMethods())
app.use(academy.routes(), academy.allowedMethods())
app.use(school.routes(), school.allowedMethods())
app.use(projectt.routes(), projectt.allowedMethods())
app.use(studentt.routes(), studentt.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
