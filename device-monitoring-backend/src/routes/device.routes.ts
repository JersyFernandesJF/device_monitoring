import express from "express";
import {
  createDevice,
  deleteDevice,
  getAllDevices,
  getAllDevicesByStatus,
  toogleDevicesStatus,
  updateDevicesStatus,
} from "../controllers/device.controller";
import { validateDeviceStatus } from "../middlwares";


const router = express.Router();

router.get("/", getAllDevices);
router.put("/:id/status", validateDeviceStatus, updateDevicesStatus);
router.put("/:id/toogle", toogleDevicesStatus);
router.post("/", createDevice);
router.delete("/:id", deleteDevice);
router.get("/status", getAllDevicesByStatus);

export default router;
