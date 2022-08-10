import schedule from 'node-schedule';
import { Redis } from '../../config/cache/redis';
//Model
import { PlayerModel } from '../models/player';
//Errors
import { BadRequestError } from '../../submodules/core/errors/bad-request';
import { NotFoundError } from '../../submodules/core/errors/not-found';
//Function
import { QuickSort } from '../../submodules/functions/sort';


  //En baştaki sayıyı silip yerine * koyun ardından sondaki yıldızı silip yerine 7 yazın, haftalık çalışmaya başlar. Debug için 59sn tercih ettim.
export const top100Player = schedule.scheduleJob('59 * * * * *', async () => {
  const players = await PlayerModel.find();

  if(!players){
    throw new BadRequestError('The game has just started!');
  }
  let playerList: Array<{id: string, rank: number, country: string, nickname: string}> = [];
  players.forEach((player, index)=>{
    if(index < 100){
      playerList[index] = {id: player._id.toString(), rank: player.rank, country: player.country, nickname: player.nickname};
    }
  });

  playerList = QuickSort(playerList);

  const redis = await Redis.connect();
  playerList.forEach(async (listPlayer, index) => {
    const player = await PlayerModel.findOne({nickname: listPlayer.nickname});
    let money: number = 0;
    if(!player){
      throw new NotFoundError();
    }
    if(index == 0){
      let poolMoney: number = Number(redis.get('pool'));
      money = poolMoney * 0.2;
      poolMoney -= money;
      redis.set('pool', poolMoney);
    }
    else if(index == 2){
      let poolMoney: number = Number(redis.get('pool'));
      money = poolMoney * 0.15;
      poolMoney -= money;
      redis.set('pool', poolMoney);
    }
    else if(index == 3){
      let poolMoney: number = Number(redis.get('pool'));
      money = poolMoney * 0.1;
      poolMoney -= money;
      redis.set('pool', poolMoney);
    }
    else{
      let poolMoney: number = Number(redis.get('pool'));
      money = poolMoney / 97;
    }
    await PlayerModel.findByIdAndUpdate({nickname: player.nickname}, {diff: {old: player.diff.now, now: index}, money: money + player.money});
  });

  let top100 = [];
  for(let index: number = 0; index < 100; index ++){
      top100[index] = playerList[index];
  }

  let top100Json = JSON.stringify(top100);
  redis.set('top100', top100Json);
  redis.set('pool', 0);
  redis.quit();

  top100Player;
});

export async function listTop100Player(): Promise<any> {
  const redis = await Redis.connect();
  let list = await redis.get('top100');

  return list;
}