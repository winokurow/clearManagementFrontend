/** Task Model */
export interface Task {
    id: number;
    groupname: string;
    description: string;
    name: string;
    shedule: string;
    nextRun: string;
    priority: number;
    complexity: number;
  }
