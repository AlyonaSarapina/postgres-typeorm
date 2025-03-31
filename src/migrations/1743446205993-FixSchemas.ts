import { MigrationInterface, QueryRunner } from "typeorm";

export class FixSchemas1743446205993 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE floor_plan.table RENAME TO tables;
    `);

    await queryRunner.query(`
      ALTER TABLE floor_plan.room ADD CONSTRAINT unique_room_name UNIQUE (name);
    `);

    await queryRunner.query(`
      ALTER TABLE floor_plan.tables ADD CONSTRAINT unique_table_number UNIQUE (number);
    `);

    await queryRunner.query(`
      ALTER TABLE customers.customer DROP CONSTRAINT IF EXISTS customer_tableid_fkey;
      ALTER TABLE customers.customer ADD CONSTRAINT customer_tableid_fkey 
      FOREIGN KEY (tableId) REFERENCES floor_plan.tables(id) ON DELETE SET NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE customers.customer DROP CONSTRAINT customer_tableid_fkey;
      ALTER TABLE customers.customer ADD CONSTRAINT customer_tableid_fkey 
      FOREIGN KEY (tableId) REFERENCES floor_plan.table(id) ON DELETE SET NULL;
    `);

    await queryRunner.query(
      `ALTER TABLE floor_plan.tables DROP CONSTRAINT unique_table_number;`
    );
    await queryRunner.query(
      `ALTER TABLE floor_plan.room DROP CONSTRAINT unique_room_name;`
    );

    await queryRunner.query(`ALTER TABLE floor_plan.tables RENAME TO table;`);
  }
}
