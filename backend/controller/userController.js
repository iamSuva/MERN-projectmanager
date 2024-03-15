import {
  comparehashedPassword,
  generateHashedPassword,
} from "../auth/AuthHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name+" "+email);
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "missing field",
      });
    }
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res
        .status(200)
        .send({ success: false, message: "Already resgisted please login " });
    }
    const hashedpassword = await generateHashedPassword(password);
    const userdata = {
      name: name,
      email: email,
      password: hashedpassword,
    };
    const user = await userModel.create(userdata);
    if (user) {
      return res.status(200).send({
        message: "sign up successfull",
        success: true,
        user,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "empty fields",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).status({
        message: "user not found",
        success: false,
      });
    }
    const isValidPassword = comparehashedPassword(password, user.password);

    if (!isValidPassword) {
      return res.status(400).status({
        message: "password invalid",
        success: false,
      });
    }

    const token = jwt.sign({
         _id: user._id,
         name:user.name,
         email:user.email
     }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
   //response to be send
    
    return res
      .status(200)
      .send({ success: true, message: "successful login ",token ,user:{
        name:user.name,
        email:user.email,
        _id:user._id
      }});
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "internal server error",
      
    });
  }
};
