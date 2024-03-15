import brcypt from "bcrypt";

export const generateHashedPassword=async(password)=>{
  try {
    
    const salt=await brcypt.genSalt(10);
    const hashedpassword=await brcypt.hash(password,salt);
    return hashedpassword;

  } catch (error) {
    console.log(error);
  }
}
export const comparehashedPassword=(password,hashedpassword)=>{
    return brcypt.compare(password,hashedpassword);
}