//Author: Torjus A.M
//class where you can change the format of the date displayed. for example hour:12 true = AM
export const formatDateTime = (date: Date): string => {
    return new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    }).format(date);
  };
  