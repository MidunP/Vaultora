import mongoose, { Document, Schema } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    profilePicture: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isTwoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
    omitPassword(): Omit<UserDocument, "password">;
}

const userSchema = new Schema<UserDocument>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: true,
        },
        role: {
            type: String,
            required: false,
            default: "user",
        },
        profilePicture: {
            type: String,
            required: false,
            default: "",
        },
        isEmailVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        isPhoneVerified: {
            type: Boolean,
            required: true,
            default: false,
        },
        isTwoFactorEnabled: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await hashValue(this.password);
    next();
});


userSchema.methods.omitPassword = function (): Omit<UserDocument, "password"> {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.methods.comparePassword = async function (password: string) {
    return compareValue(password, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
