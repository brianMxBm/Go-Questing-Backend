import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IResetToken extends mongoose.Document {
  owner: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
  compareToken: (token: string) => boolean;
}

const resetTokenSchema = new mongoose.Schema<IResetToken>({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    // @TODO - Change expiration date in production
    expires: 3600,
    default: Date.now(),
  },
});

resetTokenSchema.pre("save", async function (next) {
  // Hash token
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 8);
  }

  next();
});

resetTokenSchema.methods.compareToken = function (token: string) {
  return bcrypt.compareSync(token, this.token);
};

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

export default ResetToken;
