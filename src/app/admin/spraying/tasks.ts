export interface SprayingTask {
    id: number;
    farm: string;
    area: string;
    threat: string;
    status: 'New' | 'Accepted' | 'Declined' | 'Completed';
    date: string;
    mapImage: string;
}

export const initialTasks: SprayingTask[] = [
    {
        id: 1,
        farm: 'Green Valley Farms',
        area: '1.5 Acres',
        threat: 'Powdery Mildew',
        status: 'New',
        date: new Date().toISOString().split('T')[0],
        mapImage: 'https://images.unsplash.com/photo-1599839603058-2d79a29d3c10?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        farm: 'Sunrise Fields',
        area: '3 Acres',
        threat: 'Aphid Infestation',
        status: 'Completed',
        date: '2024-07-15',
        mapImage: 'https://images.unsplash.com/photo-1524553496250-1a722745ae00?q=80&w=2070&auto=format&fit=crop'
    }
];
