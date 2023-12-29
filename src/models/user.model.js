import mongoose, {Schema}  from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        userName : {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        email : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            index: true,
        },
        avatar: {
            type: String,       // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,        // cloudinary url
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        watchHistory: [             // array of objects
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)
// encypt user's password just before saving it in database.
userSchema.pre("save", async function(next){
    if(this.isModified("password")){    // if password field is modified then encrpt
        this.password = bcrypt.hash(this.password, 10)
        next()
    }
    else{   // if password is not modified then return next
        return next()
    }
})

// check password is right or worng
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
    
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema)
