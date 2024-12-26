import { Schema, model } from "mongoose";
import crypto from "crypto";
import { generateToken } from "../services/authentication.js";
const rolesArray = ["ADMIN", "USER"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    salt: {
      type: String
    },

    profileImageUrl: {
      type: String,
      default: "/images/avatar.png",
    },

    role: {
      type: String,
      enum: rolesArray,
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash password if it's been modified
  if (!user.isModified("password")) return next();

  try {
    // Generate salt using crypto.randomBytes
    const saltKey = crypto.randomBytes(16).toString("hex");
    
    const hash = crypto
      .createHmac("sha256", saltKey) // Use the salt to hash the password
      .update(user.password)
      .digest("hex");

    // Assign the salt and hashed password to the user object
    user.salt = saltKey;
    user.password = hash;

    next();
  } catch (error) {
    console.error("Error in pre-save hook:", error);
    next(error); // Pass the error to the next middleware
  }
});

userSchema.static("matchPasswordAndGenerateToken",async function (email, password) {
  const user =await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const hashedPassword = user.password;
  const saltKey = user.salt;

  const userProvidedHash = crypto
    .createHmac("sha256", saltKey)
    .update(password)
    .digest("hex");
  if (userProvidedHash !== hashedPassword) {
    throw new Error("Incorrect password");
  }
  
  return generateToken(user);
});

const User = model("User", userSchema);
export default User;
