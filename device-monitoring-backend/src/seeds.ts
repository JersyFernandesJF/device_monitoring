import "reflect-metadata";
import { AppDataSource } from "./config/database";
import { Device } from "./entities/device.entity";
import { DeviceType, DeviceStatus } from "./enums";
import { faker } from "@faker-js/faker";

export async function seed() {
  console.log("Seeding database...");

  await AppDataSource.initialize();


  await AppDataSource.getRepository(Device).clear();

  const devicesToInsert: Partial<Device>[] = [];

  for (let i = 0; i < 100; i++) {
    devicesToInsert.push({
      ipAddress: faker.internet.ipv4(),
      macAddress: faker.internet.mac(),
      type: faker.helpers.arrayElement([DeviceType.SMART_TV, DeviceType.SMARTPHONE, DeviceType.IOT_DEVICE]),
      status: faker.helpers.arrayElement([DeviceStatus.ONLINE, DeviceStatus.OFFLINE]),
      lastActivity: faker.date.recent({ days: 30 }),
    });
  }
  
  await AppDataSource.getRepository(Device).save(devicesToInsert);

  console.log("Database seeded with devices!");
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error("Error populating the database:", error);
  process.exit(1);
});
