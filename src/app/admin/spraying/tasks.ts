
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
        farm: 'Sunrise Fields',
        area: '3 Acres',
        threat: 'Aphid Infestation',
        status: 'Completed',
        date: '2024-07-15',
        mapImage: 'https://images.unsplash.com/photo-1524553496250-1a722745ae00?q=80&w=2070&auto=format&fit=crop'
    },
    {
        id: 2,
        farm: 'Old Oak Farm',
        area: '5 Acres',
        threat: 'Rust Fungus',
        status: 'Declined',
        date: '2024-07-18',
        mapImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop'
    }
];

    