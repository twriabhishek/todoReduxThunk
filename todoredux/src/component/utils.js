export const convertUTCtoIST = (utcDateTime) => {
    const utcDate = new Date(utcDateTime);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata' // IST timezone
    };
    const istDateTime = utcDate.toLocaleString('en-IN', options).replace(',', ''); // Removing comma after the date
    return istDateTime.replace(/\//g, '-').replace(', ', ' ');
};
