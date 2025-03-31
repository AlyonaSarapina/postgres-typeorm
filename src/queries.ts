import { AppDataSource } from "./data-source";
import { Room } from "./entities/Room";
import { Customer } from "./entities/Customer";
import { Tables } from "./entities/Tables";

const getTableRoom = async (tableId: number) => {
  const tableRepo = AppDataSource.getRepository(Tables);
  const table = await tableRepo.findOne({
    where: { id: tableId },
    relations: ["room"],
  });

  console.log(table);

  if (!table || !table.room) {
    console.error("Table or Room not found.");
    return;
  }

  console.log(`Table ${table.number} is in Room: ${table.room.name}`);
};

const getCustomerTable = async (customerId: number) => {
  const customerRepo = AppDataSource.getRepository(Customer);
  const customer = await customerRepo.findOne({
    where: { id: customerId },
    relations: ["table"],
  });

  console.log(customer);

  if (!customer || !customer.table) {
    console.error("Customer or Table not found.");
    return;
  }

  console.log(`${customer.name} is assigned to Table ${customer.table.number}`);
};

const getCustomersInRoom = async (roomId: number) => {
  const roomRepo = AppDataSource.getRepository(Room);
  const room = await roomRepo.findOne({
    where: { id: roomId },
    relations: ["tables", "tables.customers"],
  });

  console.log(room);

  if (!room) {
    console.error("Room not found.");
    return;
  }

  const customersInRoom = room.tables
    .flatMap((table) => table.customers)
    .map((customer) => customer.name);

  console.log(customersInRoom);

  if (customersInRoom.length === 0) {
    console.log("No customers are currently sitting in this room.");
  } else {
    console.log(
      `Customers in Room ${room.name}: ${customersInRoom.join(", ")}`
    );
  }
};

const runQueries = async () => {
  await AppDataSource.initialize();
  await getTableRoom(1);
  await getCustomerTable(3);
  await getCustomersInRoom(2);
};

runQueries();
