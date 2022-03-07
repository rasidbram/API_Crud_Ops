const deleteFromDb = day => {
	// 24(day) *60(min) * 60(sec) * 1000(mlsec)
	return day * 24 * 60 * 60 * 1000;
};

const deletedDayTime = 3;
module.exports = deleteFromDb(deletedDayTime);
