import mongoose, { Document } from "mongoose";

/* ============================= */
/* Report Status Enum */
/* ============================= */

export enum ReportStatusEnum {
  SENT = "SENT",
  PENDING = "PENDING",
  FAILED = "FAILED",
}

/* ============================= */
/* Report Document Interface */
/* ============================= */

export interface ReportDocument extends Document {
  userId: mongoose.Types.ObjectId;
  period: string;
  sentDate: Date;
  status: keyof typeof ReportStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

/* ============================= */
/* Report Schema */
/* ============================= */

const reportSchema = new mongoose.Schema<ReportDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    period: {
      type: String,
      required: true,
    },
    sentDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    status: {
      type: String,
      enum: Object.values(ReportStatusEnum),
      default: ReportStatusEnum.PENDING,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

/* ============================= */
/* Model Export */
/* ============================= */

export const ReportModel = mongoose.model<ReportDocument>(
  "Report",
  reportSchema
);