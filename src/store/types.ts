export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export type Group = {
  id: number;
  title: string;
  taskIds: Array<number>;
};

export type Workspace = {
  id: number;
  title: string;
};

export interface BoardInterface {
  groups: Group[];
  tasks: Record<string, Task>;
  workspaces: Workspace[];
  chosenWorkplace: number;
}
