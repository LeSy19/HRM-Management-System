import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDateTimeVN = (date: string | number | Date | null | undefined, format: string = 'DD/MM/YYYY HH:mm:ss') => {
    if (!date) return '-';
    return dayjs.utc(date).tz('Asia/Ho_Chi_Minh').format(format);
};

export const formatDateVN = (date: string | number | Date | null | undefined) => {
    return formatDateTimeVN(date, 'DD/MM/YYYY');
};

export default dayjs;
