import { Icompany } from "./interface";
import { Schema, model, SchemaTypes } from "mongoose";

const companySchema: Schema = new Schema({
    name: String,
})

export const company = model<Icompany>("user", companySchema);