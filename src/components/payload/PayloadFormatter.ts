import ArrayBufferToHex from "./ArrayBufferToHex";
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

    // FIXME: TODO: Integrate with annotation maps

    return JSON.stringify(payload.data, (key, value) => {
        if (value instanceof ArrayBuffer) {
            return ["Hex(", ArrayBufferToHex(value).join(" "), ")"].join("")
        }

        return value
    }, 4)
}