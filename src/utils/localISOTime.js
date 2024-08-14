export default function LocalISOTime(date = null) {
    const currentDate = date ? new Date(date) : new Date();
    const offset = currentDate.getTimezoneOffset();
    return new Date(currentDate.getTime() - (offset * 60 * 1000)).toISOString().slice(0, -1);
}