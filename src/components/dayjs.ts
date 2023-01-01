import dayjs from "dayjs";
import dayjs_relativeTime from "dayjs/plugin/relativeTime";
import dayjs_updateLocale from 'dayjs/plugin/updateLocale'

dayjs.extend(dayjs_relativeTime);
dayjs.extend(dayjs_updateLocale)

dayjs.updateLocale('en', {
    relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: '%d seconds',
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }
})

export default dayjs