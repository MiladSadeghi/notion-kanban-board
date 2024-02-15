const Cards: IKanbanInfo[] = [
  // BACKLOG
  {
    title: 'Look into render bug in dashboard',
    id: '1',
    column: 'backlog',
    bgColor: 'bg-[#DA3A3A]',
  },
  {
    title: 'SOX compliance checklist',
    id: '2',
    column: 'backlog',
    bgColor: 'bg-[#C94AA8]',
  },
  {
    title: '[SPIKE] Migrate to Azure',
    id: '3',
    column: 'backlog',
    bgColor: 'bg-[#7678D1]',
  },
  {
    title: 'Document Notifications service',
    id: '4',
    column: 'backlog',
    bgColor: 'bg-[#7678D1]',
  },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'todo',
    bgColor: 'bg-[#00B294]',
  },
  {
    title: 'Postmortem for outage',
    id: '6',
    column: 'todo',
    bgColor: 'bg-[#7678D1]',
  },
  {
    title: 'Sync with product on Q3 roadmap',
    id: '7',
    column: 'todo',
    bgColor: 'bg-[#00B294]',
  },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'doing',
    bgColor: 'bg-[#3F88E4]',
  },
  {
    title: 'Add logging to daily CRON',
    id: '9',
    column: 'doing',
    bgColor: 'bg-[#7678D1]',
  },
  // DONE
  {
    title: 'Set up DD dashboards for Lambda listener',
    id: '10',
    column: 'done',
    bgColor: 'bg-[#DA3A3A]',
  },
];

export default Cards;
