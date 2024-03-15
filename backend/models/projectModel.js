import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  developer: {
      type: String,
      required: true,
    },

  deadline: {
    type: Date,
    required: true,
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true
  }
},{timestamps:true});

const projectModel=mongoose.model("project",projectSchema);
export default projectModel;
