import { AppDataSource } from "../data-source";
import { Customer } from "../entities/Customer";
import { Table } from "../entities/Tables";

const seedCustomers = async () => {
  await AppDataSource.initialize();

  const customerRepo = AppDataSource.getRepository(Customer);
  const tableRepo = AppDataSource.getRepository(Table);
  const tablesArray = await tableRepo.find();
  console.log(tablesArray);

  if (tablesArray.length === 0) {
    console.error("❌ Tables not found. Make sure to insert table first.");
    return;
  }

  console.log(tablesArray[0]?.number);

  const namesArray = ["Harry", "Ross", "Bruce", "Cook", "Carolyn", "Morgan"];

  const names = await Promise.all(
    namesArray.map((name, i) => {
      return customerRepo.create({
        name: name,
        table: tablesArray[i] || undefined,
      });
    })
  );

  console.log(names);

  await customerRepo.save(names);

  console.log("✅ Customer data inserted!");
  await AppDataSource.destroy();
};

seedCustomers().catch(console.error);
