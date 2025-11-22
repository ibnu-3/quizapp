import mongoose from "mongoose";

const performanceEnum=['Excellent','Good','Needs work'];

const resultSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Result"},
    title:{type:String, required:true, trim:true},
    technology:{type:String, required:true,enum:['html',"css","js","java","python","bootstrap"], trim:true},
    level:{type:String, required:true, trim:true, enum:['basic','intermediate','advanced']},
    totalQuestions:{type:Number, required:true, min:0},
   correctAnswers:{type:Number, required:true, min:0 , default:0},
   wrongAnswers:{type:Number, required:true, min:0 , default:0},
   score:{type:Number, required:true, min:0, max:100, default:0},
   performance:{type:String, enum:performanceEnum, default:'Needs work'}
},{
    timestamps:true,
})
resultSchema.pre('save', function (next){
    const total = Number(this.totalQuestions) || 0;
    const correctAnswers = Number(this.correctAnswers) || 0;
    this.score= total ? Math.round((correctAnswers/total)*100) :0;
    if(this.score >=85) this.performance='Excellent';
    else if(this.score >=65) this.performance='Excellent';
    else this.performance='Needs work';

    if((this.wrongAnswers === undefined || this.wrongAnswers === null)&& total){
        this.wrongAnswers =Math.max(0,total-correctAnswers)
    }
    next()
})

export default mongoose.models.Result || mongoose.model('Result',resultSchema)