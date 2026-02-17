import mongoose, { Schema, model, models } from "mongoose"

const ExchangeVehicleSchema = new Schema(
    {
        userId: {
            type: String,
            required: false,
        },
        oldVehicleRegistration: { type: String, required: true },
        oldVehicleBrand: { type: String, required: true },
        oldVehicleModel: { type: String, required: true },
        oldVehicleYear: { type: String, required: true },
        oldVehicleFuelType: { type: String, required: true },
        newVehicleBrand: { type: String, required: true },
        newVehicleModel: { type: String },
        customerName: { type: String, required: true },
        customerPhone: { type: String, required: true },
        state: { type: String },
        city: { type: String },
        customCity: { type: String },
        pincode: { type: String },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'completed', 'rejected', 'approved'],
            default: 'pending'
        }
    },
    {
        timestamps: true,
        collection: 'exchange_vehicles'
    }
)

const ExchangeVehicle = models.ExchangeVehicle || model("ExchangeVehicle", ExchangeVehicleSchema)

export default ExchangeVehicle
