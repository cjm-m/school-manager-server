const mongoose = require('mongoose')
const feld={
    name: String,
    //人物标签
    major:String,
    renshu: Number

}
//自动添加更新时间创建时间:
let personSchema = new mongoose.Schema(feld, {timestamps: {createdAt: 'created', updatedAt: 'updated'}})
module.exports= mongoose.model('Projectt',personSchema)
