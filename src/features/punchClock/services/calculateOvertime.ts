// Author: Torjus A.M
import { log, time } from 'console';
import { ClockHistoryData, Interval } from '../../../lib/types';
import { Employee } from '../../../lib/employee';
import moment from 'moment';
import 'moment/locale/nb';

// Moment library: NB = Norwegian Bokmål
moment.locale('nb');

export function calculateOvertime({employee}) {
    // Get worktime data this week, time module should set employee.balance
    console.log(employee.balance);
    // Get total overtim
    console.log(employee.isWorkTimeReached);

}