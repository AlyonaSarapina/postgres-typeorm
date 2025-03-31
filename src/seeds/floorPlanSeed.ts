import { AppDataSource } from "../data-source";
import { Room } from "../entities/Room";
import { Table } from "../entities/Tables";

const seedFloorPlan = async () => {
  await AppDataSource.initialize();

  const roomRepo = AppDataSource.getRepository(Room);
  const tableRepo = AppDataSource.getRepository(Table);

  const bar = roomRepo.create({ name: "Bar" });
  const restaurant = roomRepo.create({ name: "Restaurant" });
  const privateRoom = roomRepo.create({ name: "Private Room" });

  await roomRepo.save([bar, restaurant, privateRoom]);

  const tables = [
    tableRepo.create({ room: bar, number: 101 }),
    tableRepo.create({ room: bar, number: 102 }),
    tableRepo.create({ room: restaurant, number: 201 }),
    tableRepo.create({ room: restaurant, number: 202 }),
    tableRepo.create({ room: privateRoom, number: 301 }),
    tableRepo.create({ room: privateRoom, number: 302 }),
  ];

  await tableRepo.save(tables);

  console.log("✅ Floor plan data inserted!");
  await AppDataSource.destroy();
};

seedFloorPlan().catch(console.error);
