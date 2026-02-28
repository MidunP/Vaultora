import mongoose, { Document } from "mongoose";

/* ============================= */
/* Report Frequency Enum */
/* ============================= */

export enum ReportFrequencyEnum {
    MONTHLY = "MONTHLY",
}

/* ============================= */
/* Report Setting Interface */
/* ============================= */

export interface ReportSettingDocument extends Document {
    userId: mongoose.Types.ObjectId;
    frequency: keyof typeof ReportFrequencyEnum;
    isEnabled: boolean;
    nextReportDate?: Date;
    lastSentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
}

/* ============================= */
/* Report Setting Schema */
/* ============================= */

const reportSettingSchema = new mongoose.Schema<ReportSettingDocument>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },

        frequency: {
            type: String,
            enum: Object.values(ReportFrequencyEnum),
            default: ReportFrequencyEnum.MONTHLY,
        },

        isEnabled: {
            type: Boolean,
            default: false,
        },

        nextReportDate: {
            type: Date,
        },

        lastSentDate: {
            type: Date,
        },
    },
    {
        timestamps: true, // automatically adds createdAt & updatedAt
    }
);

/* ============================= */
/* Model Export */
/* ============================= */

export const ReportSettingModel = mongoose.model<ReportSettingDocument>(
    "ReportSetting",
    reportSettingSchema
);

export default ReportSettingModel;

