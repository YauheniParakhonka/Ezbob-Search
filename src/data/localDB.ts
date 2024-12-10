export interface SearchItem {
    id: number;
    title: string;
    description: string;
}

export const localDB: SearchItem[] = [
    { id: 1, title: "React Basics", description: "Learn the basics of React." },
    { id: 2, title: "React Hooks", description: "Deep dive into React Hooks." },
    { id: 3, title: "JavaScript Fundamentals", description: "Understand JS core." },
    { id: 4, title: "React Performance", description: "Optimize your React app." },
    { id: 5, title: "Advanced React", description: "Explore advanced React topics." },
    { id: 6, title: "Advanced React 2", description: "Explore advanced React topics." },
    { id: 7, title: "Advanced React 3", description: "Explore advanced React topics." },
    { id: 8, title: "Advanced React 4", description: "Explore advanced React topics." },
    ...Array(50).fill(null).map((_, index) => ({
        id: 9 + index, title: `Advanced React ${5 + index}`, description: `Explore advanced React topics. ${index}`
    }))
];
