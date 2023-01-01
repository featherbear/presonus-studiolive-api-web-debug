import type Payload from "./types/Payload";

export default function (payload: Payload) {
    console.log("Formatting", payload);

    switch (payload.code) {
        case 'PV': {
            delete payload.data.partA
            delete payload.data.partB
            break
        }
    }

    return JSON.stringify(payload.data, null, 4)
    // return payload.data
}