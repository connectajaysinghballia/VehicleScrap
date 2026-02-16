import mongoose, { Schema, model, models } from "mongoose"

const SellVehicleSchema = new Schema(
    {
        registrationNumber: { type: String, required: true },
        brand: { type: String, required: true },
        customBrand: { type: String },
        model: { type: String, required: true },
        customModel: { type: String },
        registrationYear: { type: String, required: true },
        fuelType: { type: String, required: true },
        pendingLoan: { type: String, required: true },
        loanAmount: { type: String },
        loanBank: { type: String },
        name: { type: String },
        phone: { type: String },
        pincode: { type: String },
        insuranceName: { type: String },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'completed', 'rejected'],
            default: 'pending'
        }
    },
    {
        timestamps: true,
        collection: 'sell_vehicles'
    }
)

const SellVehicle = models.SellVehicle || model("SellVehicle", SellVehicleSchema)

export default SellVehicle
