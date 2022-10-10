import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IVerificationToken extends mongoose.Document {
  owner: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
  compareToken: (token: string) => boolean;
}

const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
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

verificationTokenSchema.pre("save", async function (next) {
  // Hash token
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 8);
  }

  next();
});

verificationTokenSchema.methods.compareToken = function (token: string) {
  return bcrypt.compareSync(token, this.token);
};

const VerificationToken = mongoose.model(
  "VerificationToken",
  verificationTokenSchema
);

export default VerificationToken;
