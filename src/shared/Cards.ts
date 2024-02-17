const Cards: IKanbanInfo[] = [
  // BACKLOG
  {
    title: 'Investigate dashboard rendering issue',
    id: '1',
    column: 'backlog',
    bgColor: '218, 58, 58',
  },
  {
    title: 'Compliance checklist for SOX',
    id: '2',
    column: 'backlog',
    bgColor: '201, 74, 168',
  },
  {
    title: 'Potential migration to Azure',
    id: '3',
    column: 'backlog',
    bgColor: '118, 120, 209',
  },
  {
    title: 'Documentation for Notifications service',
    id: '4',
    column: 'backlog',
    bgColor: '118, 120, 209',
  },
  // TODO
  {
    title: 'Explore database options for new microservice',
    id: '5',
    column: 'todo',
    bgColor: '0, 178, 148',
  },
  {
    title: 'Analyze outage and create postmortem',
    id: '6',
    column: 'todo',
    bgColor: '118, 120, 209',
  },
  {
    title: 'Schedule meeting with product about Q3 roadmap',
    id: '7',
    column: 'todo',
    bgColor: '0, 178, 148',
  },

  // DOING
  {
    title: 'Update context providers to use Zustand',
    id: '8',
    column: 'doing',
    bgColor: '63, 136, 228',
  },
  {
    title: 'Implement logging for daily CRON task',
    id: '9',
    column: 'doing',
    bgColor: '118, 120, 209',
  },
  // DONE
  {
    title: 'Configure DD dashboards for Lambda listener)',
    id: '10',
    column: 'done',
    bgColor: '218, 58, 58',
  },
];

export default Cards;
