import { BrowserWindow } from "electron";
import Tunnel from "./Services/Tunnel";
import { windows, loadBrowser, registerOnClose } from "./Electron/Setup";
import { GetPullRequestComments } from "./Services/GitHub";

let Windows: { [key: string]: BrowserWindow } = windows;

const playground = async () => {
  let comments = await GetPullRequestComments("acl-services", "paprika", 73);
  Windows["comments"].webContents.send("comments-data", comments);
};

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
  .then(playground)
  .catch(exit);
