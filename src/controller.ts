import { GotModel, Stats, List, Count, Search } from "./schema";
import { Controller, Route, Get, Tags, Query } from "tsoa";

@Tags("Endpoints")
@Route("/list")
export class ListController extends Controller {
  @Get()
  public async getList(): Promise<List[]> {
    try {
      let list = [];
      let items: any = GotModel.find({});
      items = await items.map(x => {
        for (const item of x) {
          list.push({ location: item.location, region: item.region });
        }
      });
      return list;
    } catch (err) {
      console.error("Caught error: ", err);
    }
  }
}

@Tags("Endpoints")
@Route("/count")
export class CountController extends Controller {
  @Get()
  public async getCount(): Promise<Count> {
    try {
      let items: any = GotModel.find({});
      items = await items.map(item => {
        return { total: item.length };
      });
      return items;
    } catch (err) {
      console.error("Caught error: ", err);
    }
  }
}

@Tags("Endpoints")
@Route("/stats")
export class StatsController extends Controller {
  @Get()
  public async getStats(): Promise<Stats[]> {
    try {
      const attackKing = [];
      const defenseKing = [];
      const battleRegion = [];
      const winLoss = [];
      const battle_type = [];
      const defenderSize = [];
      let items: any = GotModel.find({});
      items = await items.map(x => {
        for (const item of x) {
          attackKing.push(item.attacker_king);
          defenseKing.push(item.defender_king);
          battleRegion.push(item.region);
          winLoss.push(item.attacker_outcome);
          battle_type.push(item.battle_type);
          defenderSize.push(item.defender_size);
        }
      });

      // attacker king
      const count = {};
      let attacker_king = "",
        number = 0;
      for (let king of attackKing) {
        if (count[king]) count[king]++;
        else count[king] = 1;
        if (number < count[king]) {
          attacker_king = king;
          number = count[king];
        }
      }

      // defender king
      const count1 = {};
      let defender_king = "",
        number1 = 0;
      for (let king of defenseKing) {
        if (count1[king]) count1[king]++;
        else count1[king] = 1;
        if (number1 < count1[king]) {
          defender_king = king;
          number1 = count1[king];
        }
      }

      // region
      const count2 = {};
      let region = "",
        number2 = 0;
      for (let x of battleRegion) {
        if (count2[x]) count2[x]++;
        else count2[x] = 1;
        if (number2 < count2[x]) {
          region = x;
          number2 = count2[x];
        }
      }

      // battle type
      let battleTypes = [];
      battleTypes = battle_type.filter((item, pos) => {
        if (item != "") {
          return battle_type.indexOf(item) == pos;
        }
      });

      // average
      const sum = defenderSize.reduce((a, b) => a + b);
      const avg = sum / defenderSize.length;

      // win / loss
      const count3 = {};
      let loss = 0,
        win = 0;
      for (let x of winLoss) {
        if (x === "win") {
          if (count3[x]) count3[x]++;
          else count3[x] = 1;
          if (win < count3[x]) {
            win = count3[x];
          }
        } else {
          if (count3[x]) count3[x]++;
          else count3[x] = 1;
          if (loss < count3[x]) {
            loss = count3[x];
          }
        }
      }

      return [
        {
          most_active: {
            attacker_king: attacker_king,
            defender_king: defender_king,
            region: region
          },
          attacker_outcome: {
            win: win, // total win
            loss: loss // total loss
          },
          battle_type: battleTypes, // unique battle types
          defender_size: {
            average: Number(avg.toFixed(0)),
            min: Math.min(...defenderSize),
            max: Math.max(...defenderSize)
          }
        }
      ];
    } catch (err) {
      console.error("Caught error: ", err);
    }
  }
}

@Tags("Endpoints")
@Route("/search")
export class SearchController extends Controller {
  @Get()
  public async search(
    @Query() king: string,
    @Query("location") location?: string,
    @Query("type") type?: string
  ): Promise<Search[]> {
    try {
      let data = [];
      let items: any = GotModel.find({});
      items = await items.map(item => {
        for (let i = 0; i < item.length; i++) {
          if (!type) {
            if (!location) {
              if (
                item[i].attacker_king === king ||
                item[i].defender_king === king
              ) {
                data.push(item[i].name);
              }
            } else if (location && item[i].location === location) {
              if (
                item[i].attacker_king === king ||
                item[i].defender_king === king
              ) {
                data.push(item[i].name);
              }
            }
          } else if (type && item[i].battle_type === type.toLowerCase()) {
            if (location && item[i].location === location) {
              if (
                item[i].attacker_king === king ||
                item[i].defender_king === king
              ) {
                data.push(item[i].name);
              }
            }
          }
        }
      });
      return data;
    } catch (err) {
      console.error("Caught error: ", err);
    }
  }
}
