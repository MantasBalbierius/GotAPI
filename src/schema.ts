import * as mongoose from "mongoose";

interface List {
  location: string;
  region: string;
}

interface Count {
  count: number;
}

interface Stats {
  most_active: {
    attacker_king: string;
    defender_king: string;
    region: string;
  };
  attacker_outcome: {
    win: number;
    loss: number;
  };
  battle_type: string[];
  defender_size: {
    average: number;
    min: number;
    max: number;
  };
}

interface Search {
  data: string[];
}

const BattlesSchema = new mongoose.Schema({
  name: String,
  year: Number,
  battle_number: Number,
  attacker_king: String,
  defender_king: String,
  attacker_1: String,
  attacker_2: String,
  attacker_3: String,
  attacker_4: String,
  defender_1: String,
  defender_2: String,
  defender_3: String,
  defender_4: String,
  attacker_outcome: String,
  battle_type: String,
  major_death: Number,
  major_capture: Number,
  attacker_size: Number,
  defender_size: Number,
  attacker_commander: String,
  defender_commander: String,
  summer: Number,
  location: String,
  region: String,
  note: String
});

const GotModel = mongoose.model("battles", BattlesSchema);

export { GotModel, List, Count, Stats, Search };
