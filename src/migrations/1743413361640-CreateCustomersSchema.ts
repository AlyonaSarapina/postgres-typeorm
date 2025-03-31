import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomersSchema1743413361640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS customers`);
    await queryRunner.query(`
      CREATE TABLE customers.customer (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        tableId INT REFERENCES floor_plan.table(id) ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE customers.customer`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS customers CASCADE`);
  }
}
