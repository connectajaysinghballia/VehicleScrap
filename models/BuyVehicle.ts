import mongoose, { Schema, model, models } from "mongoose"

const BuyVehicleSchema = new Schema(
    {
        vehicleBrand: { type: String, required: true },
        customBrand: { type: String },
        vehicleModel: { type: String, required: true },
        customModel: { type: String },
        budgetRange: { type: String, required: true },
        fuelType: { type: String, required: true },
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerPhone: { type: String, required: true },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'completed', 'rejected'],
            default: 'pending'
        }
    },
    {
        timestamps: true,
        collection: 'buy_vehicles'
    }
)

const BuyVehicle = models.BuyVehicle || model("BuyVehicle", BuyVehicleSchema)

export default BuyVehicle
