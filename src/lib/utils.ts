import _ from "underscore";

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
