import mongoose, { Document, Schema } from "mongoose";
import { convertToCents, convertToDollarUnit } from "../utils/format-currency";

export enum RecurringIntervalEnum {
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

export enum TransactionTypeEnum {
    INCOME = "INCOME",
    EXPENSE = "EXPENSE",
}

export enum TransactionStatusEnum {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
}

export enum PaymentMethodEnum {
    CASH = "CASH",
    CARD = "CARD",
    UPI = "UPI",
    NET_BANKING = "NET_BANKING",
}

export interface TransactionDocument extends Document {
    userId: mongoose.Types.ObjectId;
    type: keyof typeof TransactionTypeEnum;
    title: string;
    amount: number;
    category: string;
    receiptUrl?: string;

    isRecurring: boolean;
    recurringInterval?: keyof typeof RecurringIntervalEnum;
    recurringStartDate?: Date;
    nextRecurringDate?: Date;
    lastProcessed?: Date;

    notes?: string;
    description?: string;
    date: Date;
    status: keyof typeof TransactionStatusEnum;
    paymentMethod?: keyof typeof PaymentMethodEnum;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new Schema<TransactionDocument>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(TransactionTypeEnum),
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            set: (value: number) => convertToCents(value),
            get: (value: number) => convertToDollarUnit(value),
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: "",
        },
        notes: {
            type: String,
            default: "",
        },
        receiptUrl: {
            type: String,
            default: null,
        },
        date: {
            type: Date,
            required: true,
        },
        isRecurring: {
            type: Boolean,
            required: true,
            default: false,
        },
        recurringInterval: {
            type: String,
            enum: Object.values(RecurringIntervalEnum),
            default: null,
        },
        recurringStartDate: {
            type: Date,
            default: null,
        },
        nextRecurringDate: {
            type: Date,
            default: null,
        },
        lastProcessed: {
            type: Date,
            default: null,
        },
        status: {
            type: String,
            enum: Object.values(TransactionStatusEnum),
            default: TransactionStatusEnum.COMPLETED,
        },
        paymentMethod: {
            type: String,
            enum: Object.values(PaymentMethodEnum),
            default: PaymentMethodEnum.CASH,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true },
        toObject: { virtuals: true, getters: true },
    }
);

const TransactionModel = mongoose.model<TransactionDocument>(
    "Transaction",
    transactionSchema
);

export default TransactionModel;