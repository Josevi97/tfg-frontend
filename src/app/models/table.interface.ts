export interface TableHeader {
	text: string;
	key: string;
	sort: boolean;
	relevant: boolean;
}

export interface TableCellData {
	text: string;
	relevant: boolean;
}

export interface TableBody {
	body: TableCellData[];
}

export interface TableData {
	headers: TableHeader[];
	data: TableBody[];
}
