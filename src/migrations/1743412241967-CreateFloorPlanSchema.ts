import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFloorPlanSchema1743412241967 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS floor_plan`);
    await queryRunner.query(`
      CREATE TABLE floor_plan.room (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL
      );
    `);
    await queryRunner.query(`
      CREATE TABLE floor_plan.table (
        id SERIAL PRIMARY KEY,
        number INT NOT NULL,
        roomId INT REFERENCES floor_plan.room(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE floor_plan.table`);
    await queryRunner.query(`DROP TABLE floor_plan.room`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS floor_plan CASCADE`);
  }
}
