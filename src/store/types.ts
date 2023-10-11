type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

type Group = {
  id: number;
  title: string;
  taskIds: Array<number>;
};

export interface BoardInterface {
  groups: Group[];
  tasks: Record<string, Task>;
}
