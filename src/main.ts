import { BrowserWindow, ipcMain } from "electron";
import Tunnel from "./Services/Tunnel";
import { windows, loadBrowser, registerOnClose } from "./Electron/Setup";
import {
  GetPullRequestComments,
  CommentOnPullRequest
} from "./Services/GitHub";

let Windows: { [key: string]: BrowserWindow } = windows;

const setupGithub = () => {
  let dispatchComments = async () => {
    let comments = await GetPullRequestComments("kizggerg", "hercules", 1);
    Windows["comments"].webContents.send("comments-data", comments);
  };

  ipcMain.on("new-comment", (event: Event, comment: any) =>
    CommentOnPullRequest("kizggerg", "hercules", 1, comment.comment).then(
      dispatchComments
    )
  );

  dispatchComments();
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
  .then(setupGithub)
  .catch(exit);
