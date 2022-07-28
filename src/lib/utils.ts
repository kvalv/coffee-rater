import _ from "underscore";

export function capitalize(s: string) {
    return _.chain(s.split(" ")).map(w => w[0].toUpperCase() + w.substring(1)).join(" ").value()
    // _.chain(s).
}
