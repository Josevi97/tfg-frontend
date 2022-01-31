export interface TableHeader {
	text: string;
	key: string;
}

export interface TableBody {
	body: string[];
}

export interface TableData {
	headers: TableHeader[];
	data: TableBody[];
}
