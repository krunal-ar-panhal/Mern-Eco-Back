import userModel from "../Models/userModel.js";
import bcrypt from "bcryptjs";

export const signupUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await userModel.findOne({email})

    if(user){
      return res.json({
        success : false,
        message : "User alreadt existed"
      })
    }

    if (!email || !password || !name) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      return res.json({
        success: false,
        message: "something went wrong",
      });
    }

    const userData = new userModel({
      ...req.body,
      password: hashPassword,
    });
    const savedUser = await userData.save();

    return res.json({
      success: true,
      message: "user created successfully",
      user: savedUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};
