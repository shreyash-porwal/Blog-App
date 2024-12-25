import { Schema, model } from "mongoose";
import crypto from "crypto";

const rolesArray = ['ADMIN', 'USER'];

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
      // required: true,
    },

    profileImageUrl: {
      type: String,
      default: '/images/avatar.png',
    },

    role: {
      type: String,
      enum: rolesArray,
      default: "USER", // Ensure default is in uppercase
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash password if it's been modified
  if (!user.isModified('password')) return next();

  try {
    // Generate salt using crypto.randomBytes
    const saltKey = crypto.randomBytes(16).toString('hex'); // Ensure you generate a valid salt
    const hash = crypto
      .createHmac('sha256', saltKey) // Use the salt to hash the password
      .update(user.password)
      .digest('hex');

    // Assign the salt and hashed password to the user object
    user.salt = saltKey;
    user.password = hash;

    // Log the salt and hashed password for debugging
    console.log('Generated salt:', user.salt);
    console.log('Hashed password:', user.password);

    next();
  } catch (error) {
    console.error('Error in pre-save hook:', error);
    next(error); // Pass the error to the next middleware
  }
});

const User = model("User", userSchema);
export default User;


// import { Schema,model } from "mongoose";
// import crypto from "crypto";
// const rolesArray = ['ADMIN','USER'];
// const userSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       trim: true,
//       unique: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     salt: {
//       type: String,
//       required: true,
//     },

//     profileImageUrl: {
//       type: String,
//       default:'/images/avatar.png'
//     },

//     role: {
//       type: String,
//       enum: rolesArray,
//       default: 'USER',
//     },
//   },
//   { timestamps: true }
// );
// userSchema.pre('save', async function(next) {
//     const user = this;
//     if (!user.isModified('password')) return;
//     const saltKey = crypto.randomBytes(16).toString();
//     console.log(saltKey);
//     const hash = crypto.createHmac('sha256', salt)
//     .update(user.password)
//     .digest('hex');
//     console.log('just before saving...');
//     user.salt = saltKey;
//     user.password = hash;
//     console.log('just before saving...');
    
//     // Log the salt and hashed password for debugging
//     console.log('Generated salt:', user.salt);
//     console.log('Hashed password:', user.password);

//     next();
// });
// const User = model("User", userSchema);
// export default User;
