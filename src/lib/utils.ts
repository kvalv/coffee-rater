import _ from "underscore";
import { formatDistance, addMinutes } from "date-fns";

export function capitalize(s: string) {
    return _.chain(s.split(" "))
        .map((w) => w[0].toUpperCase() + w.substring(1))
        .join(" ")
        .value();
    // _.chain(s).
}

export function getHashParameters(hash_string: string) {
    let result = hash_string.split("&").reduce(function (result, item) {
        let parts = item.split("=");
        result[parts[0]] = parts[1];
        return result;
    }, {});
    return result;
}

export function formatDistanceNow(r: string | Date) {
    if (!r) {
        return "unknown date...";
    }
    let d = new Date(r);
    let now = new Date();
    // hack to get proper time diff
    let now_timeoffset = addMinutes(now, now.getTimezoneOffset());
    return formatDistance(d, now_timeoffset, {
        addSuffix: true,
    });
}
