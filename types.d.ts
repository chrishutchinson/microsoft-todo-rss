type MicrosoftTodoList = {
  id: string;
  displayName: string;
  isOwner: boolean;
  isShared: boolean;
};

type MicrosoftTodoTask = {
  id: string;
  createdDateTime: string;
  importance: string;
  isReminderOn: boolean;
  status: string;
  title: string;
  completedDateTime?: {
    dateTime: string;
    timeZone: string;
  };
};
