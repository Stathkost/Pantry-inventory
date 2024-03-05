//get version from package.json

export default function GetVersion() {
  const version = require("../../package.json").version;
  return version;
}
