import fs from "fs";

const debugLog = (topic: string, message: string) => {
  fs.appendFileSync("debug.txt", `\n${topic}: ${message}`);
};

export default debugLog;
