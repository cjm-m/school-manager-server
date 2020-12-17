const router = require('koa-router')()
var User = require("../db/models/user");
router.prefix('/student')

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.post('/add', async function (ctx, next) {
    console.log(ctx.request.body)
    var user = new User(ctx.request.body);
    user = await user.save();
    console.log('user',user)
    ctx.body = user
})

router.post('/find', async function (ctx, next) {
    let users = await User.
    find({})
    ctx.body = users
})

router.post('/get', async function (ctx, next) {
    // let users = await User.
    // find({})
    console.log(ctx.request.body)
    let user = await User.find(ctx.request.body)
    console.log(user)
    ctx.body = user
})

router.post('/update', async function (ctx, next) {
    console.log(ctx.request.body)
    let pbj = await User.update({ _id: ctx.request.body._id }, ctx.request.body);
    ctx.body = pbj
})
router.post('/delete', async function (ctx, next) {
    console.log(ctx.request.body)

    await User.remove({ _id: ctx.request.body._id });
    ctx.body = 'shibai '
})
module.exports = router
