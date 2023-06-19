const errorMap: { [key: string]: number } = {
	PAGE_NOT_FOUND: 404,
	VALIDATION_ERROR: 400,
};

export const mapError = (type: string | null) => (type ? errorMap[type] : 500);
