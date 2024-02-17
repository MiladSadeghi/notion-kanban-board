const Cards: IKanbanInfo[] = [
  // BACKLOG
  {
    title: 'Investigate dashboard rendering issue',
    id: '1',
    column: 'backlog',
    bgColor: 'bg-[#DA3A3A]',
  },
  {
    title: 'Compliance checklist for SOX',
    id: '2',
    column: 'backlog',
    bgColor: 'bg-[#C94AA8]',
  },
  {
    title: 'Potential migration to Azure',
    id: '3',
    column: 'backlog',
    bgColor: 'bg-[#7678D1]',
  },
  {
    title: 'Documentation for Notifications service',
    id: '4',
    column: 'backlog',
    bgColor: 'bg-[#7678D1]',
  },
  // TODO
  {
    title: 'Explore database options for new microservice',
    id: '5',
    column: 'todo',
    bgColor: 'bg-[#00B294]',
  },
  {
    title: 'Analyze outage and create postmortem',
    id: '6',
    column: 'todo',
    bgColor: 'bg-[#7678D1]',
  },
  {
    title: 'Schedule meeting with product about Q3 roadmap',
    id: '7',
    column: 'todo',
    bgColor: 'bg-[#00B294]',
  },

  // DOING
  {
    title: 'Update context providers to use Zustand',
    id: '8',
    column: 'doing',
    bgColor: 'bg-[#3F88E4]',
  },
  {
    title: 'Implement logging for daily CRON task',
    id: '9',
    column: 'doing',
    bgColor: 'bg-[#7678D1]',
  },
  // DONE
  {
    title: 'Configure DD dashboards for Lambda listener)',
    id: '10',
    column: 'done',
    bgColor: 'bg-[#DA3A3A]',
  },
];

export default Cards;
