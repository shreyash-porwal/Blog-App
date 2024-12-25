import { Schema } from "mongoose";
import crypto from "crypto";
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
      type: String,
      required: true,
    },

    profileImageUrl: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: rolesArray,
      default: "user",
    },
  },
  { timestamps: true }
);
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) return;
    const saltKey = randomBytes(16).toString();
    const hash = crypto.createHmac('sha256', salt)
    .update(user.password)
    .digest('hex');
    console.log('just before saving...');
    user.salt = saltKey;
    user.password = hash;
    console.log('just before saving...');
    next();
});
const user = mongoose.model("User", userSchema);
export default user;
