import { BrowserWindow } from "electron";
import Tunnel from "./Services/Tunnel";
import { windows, loadBrowser, registerOnClose } from "./Electron/Setup";

let Windows: { [key: string]: BrowserWindow } = windows;

const main = async (): Promise<void> => {
  let url = await Tunnel("http://us-org.projects.highbond.local:9396");
  await loadBrowser(url);
  console.log(url);
};

const exit = (error: Error) => {
  console.error(error);
  process.exit(1);
};

main()
  .then(() => registerOnClose(process.exit))
  .catch(exit);
