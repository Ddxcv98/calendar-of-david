import { days, holidays, vacations } from '$lib/data.json';

export async function get() {
	const h = holidays.map(m => new Set(m));
	const v = vacations.map(m => new Set(m));
	const year = [];
	let dayOfWeek = 6;

	for (let i = 0; i < 12; i++) {
		const month = [];

		for (let j = 1; j <= days[i]; j++) {
			const day = {
				dayOfMonth: j,
				dayOfWeek,
				isHoliday: h[i].has(j),
				isAnnualLeave: v[i].has(j),

				get isWeekend() {
					return this.dayOfWeek == 0 || this.dayOfWeek == 6;
				},

				get isWorkday() {
					return !this.isWeekend && !this.isHoliday && !this.isAnnualLeave;
				}
			};

			month.push(day);
			dayOfWeek = (dayOfWeek + 1) % 7;
		}

		year.push(month);
	}

	return { body: { year } };
}
