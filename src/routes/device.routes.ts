import express from "express";
import { getAllDevices, updateDevicesStatus } from "../controllers/device.controller";
import { validateDeviceStatus } from "../middlwares/validateDeviceStatus.middleware";

const router = express.Router();

router.get("/", getAllDevices);
router.put("/:id/status", validateDeviceStatus, updateDevicesStatus);

export default router;
